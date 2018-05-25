import Vue from 'vue'
import EventDialog from './EventDialog.vue';

function open(propsData) {
    const EventDialogComponent = Vue.extend(EventDialog);
    return new EventDialogComponent({
        el: document.createElement('div'),
        propsData
    });
}

export default {
    show(params, extraFields) {
        const defaultParam = {
            title: 'Create event',
            inputClass: null,
            overrideInputClass: false,
            createButtonLabel: 'Create',
            //  -------------------------
            date: null,
            startTime: null,
            endTime: null,
            enableTimeInputs: true,
        };

        const propsData = Object.assign(defaultParam, params);

        const defaultFields = [
            {
                name: 'date',   //  Required
                type: 'date',   //  def: 'text'
                label: 'Date',  //  def: this.name
                // showLabel: false,    //  def: true
                required: true, //  def: false,
                value: propsData.date,   //  def: null
            }
        ];

        if ( propsData.enableTimeInputs )
            defaultFields.splice(1, 0, {
                label: 'Times',
                fields: [
                    {
                        name: 'startTime',
                        type: 'time',
                        label: 'Start Time',
                        required: true,
                        value: propsData.startTime
                    },
                    {
                        name: 'endTime',
                        type: 'time',
                        label: 'End Time',
                        required: true,
                        value: propsData.endTime
                    }
                ]
            });

        propsData.fields = extraFields ? defaultFields.concat(extraFields) : defaultFields;
        return open(propsData);
    }
}