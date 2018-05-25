# Callbacks

Each calendar instance has a few callbacks you can hook onto:

```vue
<template>
    <vue-scheduler
        @month-changed="monthChanged"
        @week-changed="weekChanged"
        @day-changed="dayChanged"
        @view-changed="viewChanged"
        
        @day-clicked="dayClicked"
        @time-clicked="timeClicked"
        
        @event-clicked="eventClicked"
        @event-created="eventCreated"
    >
    </vue-scheduler>
</template>
<script>
    export default {
        methods: {
          monthChanged(newDate) {
            console.log('Month Changed');
            console.log(newDate);
          },
          weekChanged(newDate) {
            console.log('Week Changed');
            console.log(newDate);
          },
          dayChanged(newDate) {
            console.log('Day Changed');
            console.log(newDate);
          },
          viewChanged(newView) {
            console.log('View Changed');
            console.log(newView);
          },
          dayClicked(date) {
            console.log('Day clicked');
            console.log(date.getDate());
          },
          timeClicked(dateWithTime) {
            console.log('Time clicked');
            console.log('Date: ' + dateWithTime.date );
            console.log('Time: ' + dateWithTime.time );
          },
          eventClicked(event) {
            console.log('Event clicked');
            console.log(event);
          },
          eventCreated(event) {
            console.log('Event created');
            console.log(event);
          },
        }
    }
</script>
```

## View callbacks

| Callback      | Description                                                               | Payload                            |
| ------------- | ------------------------------------------------------------------------- | ---------------------------------- |
| month-changed | Emitted when the user goes from one month to another on the `month` view. | `Date` object                      |
| week-changed  | Emitted when the user goes from one week to another on the `week` view.   | `Date` object                      |
| day-changed   | Emitted when the user goes from one day to another on the `day` view.     | `Date` object                      |
| view-changed  | Emitted when the user switches views.                                     | View name (`month`, `week`, `day`) |

## Day/Time callbacks

| Callback      | Description                                                               | Payload                               |
| ------------- | ------------------------------------------------------------------------- | ------------------------------------- |
| day-clicked   | Emitted when the user on a day on the `month` view.                       | `Date` object                         |
| time-clicked  | Emitted when the user on a time on the `week` and `day` views.            | `Object` containing `date` and `time` |

## Event callbacks

| Callback      | Description                                                               | Payload                               |
| ------------- | ------------------------------------------------------------------------- | ------------------------------------- |
| event-clicked | Emitted when the user clicks on an event on **any** view.                 | `Event` object                        |
| event-created | Emitted when a new event is created using the Event dialog.               | `Object` containing `date` and `time` |

::: tip
Remember that any event created using the dialog is **automatically pushed** to the `events` array. You don't need to do this yourself, the callback is there in case you need to perform more logic with new event.
:::