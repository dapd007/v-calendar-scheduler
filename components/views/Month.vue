<template>
  <section class="v-cal-content">
      <div class="v-cal-weekdays">
        <div class="v-cal-weekday-item" v-for="weekday in weekdays">{{ weekday }}</div>
      </div>
      <div class="v-cal-days" v-for="row in calendar">

        <div :ref="'days.day_' + day.d.format('DDD')" class="v-cal-day v-cal-day--month"
             @click="eventBus.$emit('day-clicked', day.d.toDate())"
             :class="{
             'is-today': day.isToday,
             'is-past': day.isPast,
             'is-disabled': day.isDisabled,
             'is-different-month': day.isDifferentMonth }" v-for="day in row">
          <span class="v-cal-day__number">{{ day.d.date() }}</span>
          <div class="v-cal-event-list">
            <div class="v-cal-event-item"
                 :style="{ 'backgroundColor': event.color, 'color': event.color }"
                 v-for="event in day.events" :title="event.label"
                 @click.stop="eventBus.$emit('event-clicked', event)">
              <span class="v-cal-event-time">{{ event.time | formatEventTime(use12) }}</span>
              <span class="v-cal-event-name">{{ event.label }}</span>
            </div>
          </div>
        </div>

      </div>
  </section>
</template>

<script>
  import moment from 'moment';
  import IsView from '../mixins/IsView';

  export default {
    name: "month",
    mixins: [ IsView ],
    props: {
      eventBus: {
        required: true
      }
    },
    data() {
      return {
        weekdays: moment.weekdaysShort(),
        calendar: [],
      }
    },
    mounted() {
      this.buildCalendar();
    },
    methods: {
      buildCalendar() {
        this.calendar = [];

        let temp = moment( this.activeDate ).date( 1 );
        const monthStart = moment(temp);
        let m = temp.month();
        let now = moment();

        this.days = [];

        do {
          const day = moment(temp);
          let newDay = {
            d: day,
            isPast: temp.isBefore( now, 'day' ),
            isToday: temp.isSame( now, 'day' ),
            isDisabled: this.isDayDisabled(temp),
            events: this.events.filter( e => moment(e.date).isSame(day, 'day') )
              .sort( (a, b) => {
                if ( !a.time ) return -1;
                if ( !b.time ) return 1;
                return a.time - b.time
            })
          };
          this.days.push(newDay);

          temp.add( 1, 'day' );
        } while ( temp.month() === m );

        let items = [];

        let paddingOffset = 1;
        // Some padding at the beginning
        for ( let p = 0; p < moment( this.activeDate ).date( 1 ).weekday(); p++ )
        {
          items.unshift({
            d: moment(monthStart).subtract(paddingOffset, 'day'),
            isPast: true,
            isToday: false,
            isDifferentMonth: true,
          });

          paddingOffset++;
        }

        // Merge in the array of days
        items.push.apply( items, this.days );

        // Some padding at the end if required
        if ( items.length % 7 ) {
          for ( let p = ( 7 - ( items.length % 7 ) ); p > 0; p-- )
          {
            items.push({
              d : moment(temp),
              isPast: true,
              isToday: false,
              isDifferentMonth: true,
            });
            temp.add( 1, 'day' );
          }
        }

        // Split the array into "chunks" of seven
        this.calendar  = items.map( function( e, i ) {
          return i % 7 === 0 ? items.slice( i, i + 7 ) : null;
        }).filter( function( e ) { return e; } );
      },
    },
  }
</script>

<style scoped>

</style>
