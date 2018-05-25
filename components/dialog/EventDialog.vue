<template>
    <transition name="zoom-out">
        <div class="v-cal-dialog" v-if="isActive">
            <div class="v-cal-dialog__bg" @click="cancel"></div>
            <div class="v-cal-dialog-card">
                <form @submit.prevent="saveEvent">
                    <header class="v-cal-dialog-card__header">
                        <h5 class="v-cal-dialog__title">{{ title }}</h5>
                        <button type="button" class="v-cal-dialog__close" @click="cancel"></button>
                    </header>
                    <section class="v-cal-dialog-card__body">
                        <div class="v-cal-fields">
                            <template v-for="field, index in fields">
                                <event-dialog-input v-model="event[field.name]" :key="field.name + '-' + index" :field="field" v-if="!field.fields"/>
                                <div class="v-cal-input-group" v-else>
                                    <label v-if="field.label">{{ field.label }}</label>
                                    <event-dialog-input v-model="event[subfield.name]" :key="subfield.name + '-' + index" :field="subfield" v-for="subfield, index in field.fields"/>
                                </div>
                            </template>
                        </div>
                    </section>
                    <footer class="v-cal-dialog-card__footer">
                        <button type="submit" class="v-cal-button is-rounded is-primary">{{ createButtonLabel }}</button>
                    </footer>
                </form>
            </div>
        </div>
    </transition>
</template>


<script>
    import Event from '../../model/Event';
    import moment from 'moment';
    import EventDialogInput from './EventDialogInput';
    export default {
        components: { EventDialogInput },
        props: {
            title: String,
            inputClass: String,
            overrideInputClass: Boolean,
            fields: Array,
            createButtonLabel: String,
        },
        data() {
            return {
                isActive: false,
                event: {}
            }
        },
        beforeMount() {
            let plainEvent = {};
            this.fields.map( field => {
                if ( !field.fields )
                    plainEvent[field.name] = field.value;
                else {
                    const fields = field.fields;
                    fields.map( field => {
                        if ( field.type === 'time' ) {
                            plainEvent[field.name] = field.value ? moment(field.value, 'HH:mm') : null
                        } else
                            plainEvent[field.name] = field.value;
                    })
                }
            });

            this.event = new Event(plainEvent);
            //  Insert the Dialog component in body tag
            document.body.appendChild(this.$el);
        },
        mounted() {
            this.isActive = true;
        },
        methods: {
            saveEvent() {
                this.$emit('event-created', this.event);
                this.close();
            },
            cancel() {
                this.close();
            },
            close() {
                this.isActive = false;
                // Timeout for the animation complete before destroying
                setTimeout(() => {
                    this.$destroy();
                    this.$el.remove();
                }, 150);
            },
        }
    }
</script>

<style scoped>
    .zoom-out-enter-active,
    .zoom-out-leave-active {
        transition: opacity 150ms ease-out;
    }
    .zoom-out-enter-active .animation-content,
    .zoom-out-enter-active .animation-content,
    .zoom-out-leave-active .animation-content,
    .zoom-out-leave-active .animation-content {
        transition: transform 150ms ease-out;
    }

    .zoom-out-enter,
    .zoom-out-leave-active {
        opacity: 0;
    }
    .zoom-out-enter .animation-content,
    .zoom-out-enter .animation-content,
    .zoom-out-leave-active .animation-content,
    .zoom-out-leave-active .animation-content {
        transform: scale(1.05);
    }
</style>