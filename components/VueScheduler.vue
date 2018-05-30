<template>
  <div class="v-cal">
    <header class="v-cal-header">
      <div class="v-cal-header__actions">
        <div class="actions-left">
          <button class="v-cal-button" v-if="showTodayButton" @click="goToToday" :class="{ 'v-cal-button--is-active': activeDate && activeDate.isSame( today, 'day' )}">{{ labels.today }}</button>
          <button :disabled="!isPrevAllowed" class="v-cal-button" @click="prev" v-html="labels.back"></button>
          <button :disabled="!isNextAllowed" class="v-cal-button" @click="next" v-html="labels.next"></button>
        </div>
        <div class="actions-right">
          <button class="v-cal-button" v-for="view in availableViews" @click="switchView(view)" :class="{ 'v-cal-button--is-active': activeView === view }" >{{ labels[view] | capitalizeFirstLetter }}</button>
        </div>
      </div>
      <div class="v-cal-header__title-bar">
        <h3 class="v-cal-header__title">{{ calendarTitle }}</h3>
      </div>
    </header>
    <component
            :is="activeView"
            :class="'v-cal-content--' + activeView"
            v-bind="activeViewProps"
    ></component>
    <footer class="v-cal-footer"></footer>
  </div>
</template>

<script>

    import Event from '../model/Event';


    import config from '../utils/config';
    import { defaultLabels, defaultViews } from '../utils/config';

    import { EventBus } from './EventBus';

    import moment from 'moment';
    import Month from './views/Month';
    import Week from './views/Week';
    import Day from './views/Day';

    import EventDialog from './dialog';

    export default {
        name: "VueScheduler",
        components: { Month, Week, Day },
        props: {
            events: {
                type: Array,
                default: () => []
            },
            showTodayButton: {
                type: Boolean,
                default: () => config.showTodayButton
            },
            minDate: {
                type: [Date, Object],
                default: () => config.minDate
            },
            maxDate: {
                type: [Date, Object],
                default: () => config.maxDate
            },
            labels: {
                type: Object,
                default: () => config.labels,
                validator(value) {
                    for (const labelKey in defaultLabels ) {
                        if ( !value.hasOwnProperty(labelKey) ) {
                            console.error('Missing prop label: ' + labelKey);
                            return false;
                        }
                    }
                    return true;
                }
            },
            timeRange: {
                type: Array,
                default: () => config.timeRange,
                validator(value) {
                    if ( value.length !== 2 || value[0] > value[1] || value[0] < 0 || value[1] > 23) {
                        console.error('Invalid time range.');
                        return false;
                    }
                    return true;
                }
            },
            availableViews: {
                type: Array,
                default: () => config.availableViews,
                validator (value) {
                    const possible = defaultViews;
                    let error = false;
                    value.forEach(view => {
                        if ( possible.indexOf(view) === -1 ) {
                            console.error('Invalid view: ' + view);
                            error = true;
                        }
                    });
                    return !error;
                }
            },
            initialDate: {
                type: [Date, Object],
                default: () => config.initialDate
            },
            initialView: {
                type: String,
                default: () => config.initialView
            },
            use12: {
                type: Boolean,
                default: () => config.use12
            },
            showTimeMarker: {
                type: Boolean,
                default: () => config.showTimeMarker
            },
            eventDisplay: {
                type: [String, Function],
                default: () => config.eventDisplay
            },
            disableDialog: {
                type: Boolean,
                default: false
            },
            eventDialogConfig: {
                type: Object,
                default: () => { return {} }
            }
        },
        data() {
            return {
                today: moment(),
                activeView: '',
                activeDate: null
            }
        },
        mounted() {
            //  Initial setup
            this.activeView = this.initialView;
            this.activeDate = moment(this.initialDate);

            console.log('mounted');

            //  Bind events
            this.bindEvents();
        },
        beforeDestroy() {
            EventBus.$off('day-clicked');
            EventBus.$off('time-clicked');
            EventBus.$off('event-clicked');
        },
        methods: {
            openEventDialog(data) {
                if ( !this.disableDialog ) {

                    const { fields, ...config } = this.eventDialogConfig;

                    if ( data instanceof Date ) {
                        config.date = data
                    } else {
                        config.date = data.date;
                        config.startTime = data.time !== null ? moment(data.time, 'HH') : null;
                        config.endTime = data.time !== null ? moment(data.time, 'HH').add(1, 'h') : null;
                    }

                    EventDialog.show(config, fields)
                        .$on('event-created', (event) => {
                            this.events.push(event._e);
                            this.$emit('event-created', event._e);
                        });

                    // EventDialog.show({
                    //     title: 'Custom dialog',
                    //     createButtonLabel: 'Save'
                    // }, [
                    //     // {
                    //     //     name: 'text_field',
                    //     //     label: 'Text field'
                    //     // },
                    //     // {
                    //     //     name: 'email',
                    //     //     type: 'email'
                    //     // },
                    //     // {
                    //     //     name: 'password',
                    //     //     type: 'password'
                    //     // },
                    //     // {
                    //     //     name: 'is_checked',
                    //     //     type: 'checkbox'    //  Unsupported for now
                    //     // },
                    //     // {
                    //     //     name: 'check_choices[]',
                    //     //     type: 'checkbox',           //  Unsupported for now
                    //     //     choices: [
                    //     //         { label: 'Choice 1', value: 'choice1' },
                    //     //         { label: 'Choice 2', value: 'choice2' }
                    //     //     ]
                    //     // },
                    //     // {
                    //     //     name: 'radio_choices',
                    //     //     type: 'radio',                //  Unsupported for now
                    //     //     choices: [
                    //     //         { label: 'Radio 1', value: 'rad1' },
                    //     //         { label: 'Radio 2', value: 'rad2' }
                    //     //     ]
                    //     // },
                    //     // {
                    //     //     name: 'textarea',
                    //     //     type: 'textarea'
                    //     // }
                    //     {
                    //         name: 'single-select',
                    //         type: 'select',                                              //  Unsupported for now
                    //         choices: [
                    //             { value: 'single1', label: 'Single list 1' },
                    //             { value: 'single2', label: 'Single list 2' },
                    //             { value: 'single3', label: 'Single list 3' },
                    //             { value: 'single4', label: 'Single list 4' },
                    //             { value: 'single5', label: 'Single list 5' }
                    //         ]
                    //     },
                    //     {
                    //         name: 'multiple-select',
                    //         type: 'select',                                                  //  Unsupported for now
                    //         choices: [
                    //             { value: 'multiple1', label: 'Multiple list 1' },
                    //             { value: 'multiple2', label: 'Multiple list 2' },
                    //             { value: 'multiple3', label: 'Multiple list 3' },
                    //             { value: 'multiple4', label: 'Multiple list 4' },
                    //             { value: 'multiple5', label: 'Multiple list 5' }
                    //         ],
                    //         multiple: true
                    //     }
                    // ]);
                }
            },
            bindEvents() {
                EventBus.$on('day-clicked', (date) => {
                    this.$emit('day-clicked', date);
                    this.openEventDialog(date);
                });
                EventBus.$on('time-clicked', (data) => {
                    this.$emit('time-clicked', data);
                    this.openEventDialog(data);
                });
                EventBus.$on('event-clicked', (event) => {
                    this.$emit('event-clicked', event._e);
                });
            },
            goToToday() {
                this.activeDate = moment(this.today);
            },
            prev() {
                this.activeDate = moment(this.activeDate.subtract(1, this.activeView + 's'));
            },
            next() {
                this.activeDate = moment(this.activeDate.add(1, this.activeView + 's'));
            },
            switchView(view) {
                this.activeView = view;
            },
        },
        filters: {
            capitalizeFirstLetter(string) {
                return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
            }
        },
        watch: {
            initialDate() {
                this.activeDate = moment(this.initialDate);
            },
            initialView() {
                this.activeView = this.initialView;
            },
            activeDate() {
                this.$emit(this.activeView + '-changed', this.activeDate.toDate() );
            },
            activeView() {
                this.$emit('view-changed', this.activeView);
            }
        },
        computed: {
            newEvents() {
                return this.events.map(e => {
                    return new Event(e).bindGetter('displayText', this.eventDisplay);
                });
            },
            isPrevAllowed() {
                if ( this.minDate ) {
                    const prevRef = moment(this.activeDate).subtract(1, this.activeView + 's');
                    return this.minDate.isSameOrBefore(prevRef, this.activeView);
                }
                return true
            },
            isNextAllowed() {
                if ( this.maxDate ) {
                    const afterRef = moment(this.activeDate).add(1, this.activeView + 's');
                    return this.maxDate.isSameOrAfter(afterRef, this.activeView);
                }
                return true
            },
            activeViewProps() {
                let props = {
                    activeDate: this.activeDate,
                    minDate: this.minDate,
                    maxDate: this.maxDate,
                    use12: this.use12,
                    events: this.newEvents.filter( event => {
                        return event.date.isSame(this.activeDate, this.activeView);
                    })
                };

                if ( this.activeView === 'week' || this.activeView === 'day') {
                    props.allDayLabel = this.labels.all_day;
                    props.timeRange = this.timeRange;
                    props.showTimeMarker = this.showTimeMarker;
                }
                return props;
            },
            calendarTitle() {

                if ( this.activeDate === null )
                    return '';

                if ( this.activeView === 'month') {
                    return this.activeDate.format('MMMM YYYY');
                }

                if ( this.activeView === 'week' ) {
                    const weekStart = moment(this.activeDate).day(0);
                    const weekEnd = moment(this.activeDate).day(6);
                    return weekStart.format('MMM D') + ' - ' + weekEnd.format('MMM D');
                }

                if ( this.activeView === 'day' ) {
                    return this.activeDate.format('dddd MMM D')
                }
            }
        }
    }
</script>

<style scoped>

</style>
