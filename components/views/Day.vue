<template>
  <section class="v-cal-content">
    <div class="v-cal-weekdays">
      <div class="v-cal-weekday-item">{{ activeDate.format('ddd DD/MM') }}</div>
    </div>
    <div class="v-cal-days">
      <div class="v-cal-times">
        <div class="v-cal-hour">{{ allDayLabel }}</div>
        <div class="v-cal-hour" :class="{ 'is-now': time.isSame(now, 'hour') }" v-for="time in times">{{ time | formatTime(use12) }}</div>
      </div>
      <div class="v-cal-days__wrapper">
        <div class="v-cal-day v-cal-day--day" :class="{ 'is-today': day.isToday }" v-if="day !== null">
          <div class="v-cal-day__hour-block"
               @click="eventBus.$emit('time-clicked', { date: day.d.toDate(), time: null })">
            <span class="v-cal-day__hour-block-fill">00:00 <template v-if="use12">PM</template></span>
            <div class="v-cal-day__hour-content">
              <div class="v-cal-event-list" :class="{'tiny-events': day.events.filter(e => !e.time).length > 2}">
                <div class="v-cal-event-item"
                     v-for="event in day.events.filter(e => !e.time)" :title="event.label"
                     @click.stop="eventBus.$emit('event-clicked', event)">
                  <span class="v-cal-event-time">{{ event.time | formatEventTime(use12) }}</span>{{ event.label }}</div>
              </div>
            </div>
          </div>
          <div class="v-cal-day__hour-block"
               @click="eventBus.$emit('time-clicked', { date: day.d.toDate(), time: time.hour() })"
               :class="[ time.isSame(now, 'hour') ? 'is-now' : '', hourClass ]" v-for="time in day.availableTimes">
            <span class="v-cal-day__hour-block-fill">{{ time | formatTime(use12) }}</span>
            <div class="v-cal-day__hour-content">
              <div class="v-cal-event-list">
                <div class="v-cal-event-item"
                     v-if="time.hour() === event.time"
                     v-for="event in day.events" :title="event.label"
                     @click.stop="eventBus.$emit('event-clicked', event)">
                  <span class="v-cal-event-time">{{ event.time | formatEventTime(use12) }}</span>{{ event.label }}</div>
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
    name: "day",
    mixins: [ IsView, ShowsTimes ],
    data() {
      return {
        day: null
      }
    },
    mounted() {
      this.buildCalendar();
    },
    methods: {
      buildCalendar() {
        let now = moment();

        const today = moment( this.activeDate );
        this.day = {
          d: today,
          isPast: today.isBefore( now, 'day' ),
          isToday: today.isSame( now, 'day' ),
          availableTimes: this.times,
          events: this.events
        };
      }
    }
  }
</script>

<style scoped>

</style>
