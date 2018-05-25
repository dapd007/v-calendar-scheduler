<template>
    <section class="v-cal-content">
        <div class="v-cal-weekdays">
            <div class="v-cal-weekday-item" v-for="weekday in weekdays">{{ weekday }}</div>
        </div>
        <div class="v-cal-days" v-for="row in calendar">

            <div :ref="'days.day_' + day.d.format('DDD')" class="v-cal-day v-cal-day--month"
                 @click="dayClicked(day)"
                 :class="{
                 'is-today': day.isToday,
                 'is-past': day.isPast,
                 'is-disabled': day.isDisabled,
                 'is-different-month': day.isDifferentMonth }" v-for="day in row">
                <span class="v-cal-day__number">{{ day.d.date() }}</span>
                <div class="v-cal-event-list">
                    <event-item
                            v-for="event, index in day.events"
                            :key="index"
                            :has-dynamic-size="false"
                            :event="event"
                            :use12="use12"
                    >
                    </event-item>
                    <!--@click.stop="eventBus.$emit('event-clicked', event)" -->
                </div>
            </div>

        </div>
    </section>
</template>

<script>
    import moment from 'moment';
    import { EventBus } from '../EventBus';
    import EventItem from '../EventItem';
    import IsView from '../mixins/IsView';

    export default {
        name: "month",
        mixins: [ IsView ],
        components: { EventItem },
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
            dayClicked(day) {
                EventBus.$emit('day-clicked', day.d.toDate())
            },
            buildCalendar() {
                this.calendar = [];

                let temp = moment( this.activeDate ).date( 1 );
                const monthStart = moment(temp);
                let m = temp.month();
                let now = moment();

                this.days = [];

                do {
                    // console.log(temp.toDate());
                    const day = moment(temp);
                    let newDay = {
                        d: day,
                        isPast: temp.isBefore( now, 'day' ),
                        isToday: temp.isSame( now, 'day' ),
                        isDisabled: this.isDayDisabled(temp),
                        events: this.events.filter( e => moment(e.date).isSame(day, 'day') )
                            .sort( (a, b) => {
                                if ( !a.startTime ) return -1;
                                if ( !b.startTime ) return 1;
                                return moment(a.startTime, 'HH:mm').format('HH') - moment(b.startTime, 'HH:mm').format('HH');
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
