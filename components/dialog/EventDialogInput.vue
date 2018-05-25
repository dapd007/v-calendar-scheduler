<template>
    <div :class="fieldClass">
        <template v-if="field.type === 'textarea'">
            <label :for="field.name" v-if="field.showLabel !== false">{{ fieldLabel }}</label>
            <textarea
                    @input="onInput"
                    :id="field.name"
                    :name="field.name"
                    :value="newValue"
                    :required="field.required"
                    :placeholder="fieldLabel">
            </textarea>
        </template>
        <template v-else>
            <label :for="field.name" v-if="field.showLabel !== false">{{ fieldLabel }}</label>
            <input
                    @input="onInput"
                    :value="newValue"
                    :placeholder="fieldLabel"
                    :type="field.type ? field.type : 'text'"
                    :required="field.required"
                    :id="field.name">
        </template>
    </div>
</template>

<script>
    import moment from 'moment';
    export default {
        name: "EventDialogInput",
        props: {
            value: [ Date, String, Number, Boolean, Array, Object ],
            field: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                newValue: this.value,
            }
        },
        beforeMount() {
            //  Date workaround
            if ( this.field.type === 'date' && this.value ) {
                this.newValue = moment(this.value).format().slice(0, 10);
            }

            //  Time workaround
            if ( this.field.type === 'time' && this.value ) {
                this.newValue = moment(this.value).format().slice(11, 16);
            }
        },
        methods: {
            onInput(event) {
                this.$nextTick(() => {
                    this.newValue = event.target.value
                });
            }
        },
        watch: {
            value(value) {
                this.newValue = value;
            },
            newValue(value) {
                let res = value;

                if ( this.field.type === 'time' ) {
                    res = moment(this.newValue, "HH:mm");
                }

                this.$emit('input', res);
            }
        },
        computed: {
            isCheckOrRadio() {
                return this.field.type === 'radio' || this.field.type === 'checkbox';
            },
            fieldLabel() {
                return this.field.label ? this.field.label : this.field.name;
            },
            fieldClass() {
                if ( this.overrideInputClass )
                    return this.inputClass;

                let classes = [
                    'v-cal-input',
                    this.inputClass
                ];

                if ( this.isCheckOrRadio ) {

                    if ( !this.field.choices ) {
                        classes.push('is-inline');
                        classes.push('is-' + this.field.type);
                    } else {
                        classes.push('v-cal-input-group');
                    }
                }

                return classes.join(' ');
            }
        }
    }
</script>

<style scoped>

</style>