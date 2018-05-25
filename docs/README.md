---
home: true
actionText: Get Started →
actionLink: /guide/
footer: MIT Licensed | Copyright © 2018-present David Paternina
---

<style>
    .home {
        max-width: 1200px;
    }
</style>

<vue-scheduler :event-dialog-config="{
        title: 'Custom dialog title',
        createButtonLabel: 'Save event thingy',
        enableTimeInputs: false,
        fields: [
            {
                name: 'name',
                label: 'Event name'
            },
            {
                name: 'email',
                type: 'email',
                required: true,
                label: 'E-mail',
                value: 'email@example.com'
            },
            {
                label: 'Grouped',
                fields: [
                    {
                        name: 'Field 1'
                    },
                    {
                        name: 'Field 2'
                    }
                ]
            },
            {
                name: 'comments',
                type: 'textarea',
                label: 'comments'
            }
        ]
    }"/>

Created by [David Paternina](http://davidpaternina.com/)