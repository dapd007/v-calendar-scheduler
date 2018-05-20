import VueScheduler from '../../index';
import '../../lib/main.css';

export default ({
    Vue, // the version of Vue being used in the VuePress app
    options, // the options for the root Vue instance
    router, // the router instance for the app
    siteData // site metadata
}) => {
    Vue.use(VueScheduler, {
        // locale: 'es',
        // minDate: min,
        // maxDate: max,
        // labels: {
        //   today: 'Hoy',
        //   back: 'Atrás',
        //   next: 'Siguiente',
        //   month: 'Mes',
        //   week: 'Semana',
        //   day: 'Día',
        //   all_day: 'Todo el día'
        // },
        // timeRange: [11,20],
        // availableViews: ['month'],
        // initialDate: date,
        // initialView: 'week',
        // use12: true,
        // showTimeMarker: true,
        // showTodayButton: false
    });
}
