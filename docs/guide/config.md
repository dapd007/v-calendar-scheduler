# Config

[[toc]]

::: tip
The calendar uses the great [Moment.js](https://momentjs.com/), so for every prop or config involving a date you can pass either a **Javascript Date Object** or a **Moment** object. 

If you are working with dates or times in your application I highly recommend you use Moment, it will make your life easier. 
:::

## Global configuration

If you want your settings to apply to every instance of the calendar just pass an object with any of the supported settings to the constructor:

```js
Vue.use(VueScheduler, {
  locale: 'es',
  minDate: null,
  maxDate: null,
  labels: {
     today: 'Hoy',
     back: 'Atrás',
     next: 'Siguiente',
     month: 'Mes',
     week: 'Semana',
     day: 'Día',
     all_day: 'Todo el día'
  },
  timeRange: [11,20],
  availableViews: ['month'],
  initialDate: new Date(),
  initialView: 'week',
  use12: true,
  showTimeMarker: true,
  showTodayButton: false
});
```

## Instance configuration

You can also apply settings to individual instances of the calendar using props. Please note that this would override any settings you set globally.

```vue
<vue-scheduler
    locale="es"
    :min-date="null"
    :max-date="null"
    :labels="{
        today: 'Hoy',
        back: 'Atrás',
        next: 'Siguiente',
        month: 'Mes',
        week: 'Semana',
        day: 'Día',
        all_day: 'Todo el día'
    }"
    :time-range="[10,20]"
    :available-views="['month', 'week', 'day']"
    :initial-date="null"
    initial-view="month"
    use12
    :show-time-marker="showMarker"
    :show-today-button="false"
/>
```

## Available settings (props)

::: tip
You can set the calendar locale using any [locale supported by Moment.js](https://momentjs.com/docs/#/i18n/loading-into-nodejs/)
:::

| Setting           | Description                                                                            | Type                    | Default value              |
| ----------------  | -------------------------------------------------------------------------------------- | ----------------------- | -------------------------- |
| locale            | Moment.js supported locale.                                                            | String                  | `'en'`                     |
| min-date          | Minimum date for the calendar on any view.                                             | Date - Moment.js object | `null`                     |
| max-date          | Maximum date for the calendar on any view.                                             | Date - Moment.js object | `null`                     |
| labels            | Texts for the labels that are not dependant on Moment, such as the buttons at the top. | Array[String]           | Check labels table below   |
| time-range        | Sets the time range for the 'week' and 'day' views.                                    | Array[Number]           | `[0, 23]`                  |
| available-views   | Enables/disables views for the calendar.                                               | Array[String]           | `['month', 'week', 'day']` |
| initial-date      | Sets the date the calendar will display on load.                                       | String                  | `new Date()`               |
| initial-view      | Sets the view the calendar will display on load.                                       | String                  | `'month'`                  |
| use12             | Toggles the use of 12-hour time format.                                                | Boolean                 | `false`                    |
| show-time-marker  | Enables/disables the horizontal time marker for the 'week' and 'day' views.            | Boolean                 | `false`                    |
| show-today-button | Toggles the display of the 'Today' button on the top left corner of the calendar.      | Boolean                 | `true`                     |

### Labels

| Label   | Description                                                | Default   |
| ------- | ---------------------------------------------------------- | --------- |
| today   | Label for the 'today' button.                              | `'Today'` |
| back    | Label for the 'back' button.                               | `'Back'`  |
| next    | Label for the 'next' button.                               | `'Next'`  |
| month   | Label for the 'month' button.                              | `'Month'` |
| week    | Label for the 'week' button.                               | `'Week'`  |
| day     | Label for the 'day' button.                                | `'Day'`   |
| all_day | Label for the 'All day' section in 'week' and 'day' views. | `'all day'`   |