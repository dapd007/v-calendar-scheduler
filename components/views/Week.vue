<template>
  <section class="v-cal-content">
    <div class="v-cal-weekdays">
      <div class="v-cal-weekdays__padding">
        <div class="v-cal-times">
          <!--Fake, hidden time-->
          <div class="v-cal-hour">00:00 <template v-if="use12">PM</template></div>
        </div>
      </div>
      <div class="v-cal-weekday__wrapper">
        <div class="v-cal-weekday-item" v-for="day in days">{{ day.d.format('ddd DD/MM') }}</div>
      </div>
    </div>
    <div class="v-cal-days">
      <div class="v-cal-times">
        <div class="v-cal-hour">{{ allDayLabel }}</div>
        <div class="v-cal-hour" :class="{ 'is-now': time.isSame(now, 'hour') }" v-for="time in times">{{ time | formatTime(use12) }}</div>
      </div>
      <div class="v-cal-days__wrapper">
        <div class="v-cal-day v-cal-day--week" v-for="day in days" :class="{ 'is-today': day.isToday, 'is-disabled': day.isDisabled }">
          <div class="v-cal-day__hour-block"
               @click="eventBus.$emit('time-clicked', { date: day.d.toDate(), time: null })" >
            <span class="v-cal-day__hour-block-fill">00:00 <template v-if="use12">PM</template></span>
            <div class="v-cal-day__hour-content">
              <div class="v-cal-event-list" :class="{'tiny-events': day.events.filter(e => !e.time).length > 2}">
                <div class="v-cal-event-item"
                     :style="{ 'backgroundColor': event.color, 'color': event.color }"
                     v-for="event in day.events.filter(e => !e.time)" :title="event.label"
                     @click.stop="eventBus.$emit('event-clicked', event)">
                  <span class="v-cal-event-time">{{ event.time | formatEventTime(use12) }}</span>{{ event.label }}</div>
              </div>
            </div>
          </div>

          <div class="v-cal-day__hour-block"
               @click="eventBus.$emit('time-clicked', { date: day.d.toDate(), time: time.hour() })"
               :class="[ time.hour() === now.hour() ? 'is-now' : '', hourClass ]" v-for="time in day.availableTimes">
            <span class="v-cal-day__hour-block-fill">{{ time | formatTime(use12) }}</span>
            <div class="v-cal-day__hour-content">
              <div class="v-cal-event-list">
                <div class="v-cal-event-item"
                     :style="{ 'backgroundColor': event.color, 'color': event.color }"
                     v-if="time.hour() === event.time"
                     v-for="event in day.events" :title="event.label"
                     @click.stop="eventBus.$emit('event-clicked', event)">
                  <span class="v-cal-event-time">{{ event.time | formatEventTime(use12) }}</span>
                  <span class="v-cal-event-name">{{ event.label }}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import moment from 'moment';
  import IsView from '../mixins/IsView';
  import ShowsTimes from '../mixins/ShowsTimes';

  export default {
    name: "week",
    mixins: [ IsView, ShowsTimes ],
    props: {

    },
    data() {
      return {
        days: []
      }
    },
    mounted() {
      this.buildCalendar();
    },
    methods: {
      buildCalendar() {
        this.days = [];

        let now = moment();

        let temp = moment( this.activeDate ).day(0);
        let w = temp.week();

        this.days = [];

        do {
          const day = moment(temp);
          let newDay = {
            d: day,
            isPast: temp.isBefore( now, 'day' ),
            isToday: temp.isSame( now, 'day' ),
            isDisabled: this.isDayDisabled(temp),
            availableTimes: this.times.map( time => moment(time).dayOfYear( day.dayOfYear() ) ),
            events: this.events.filter( e => moment(e.date).isSame(day, 'day') )
              .sort( (a, b) => {
                if ( !a.time ) return -1;
                if ( !b.time ) return 1;
                return a.time - b.time
              })
          };
          this.days.push(newDay);

          temp.add( 1, 'day' );
        } while ( temp.week() === w );

      }
    },
    watch: {
      timeRange() {
        this.buildCalendar();
      }
    }
  }
</script>

<style scoped>

</style>
