module.exports = {
    title: 'Vue Calendar',
    description: 'Calendar scheduler component for VueJs',
    ga: "UA-116825927-2",
    head: [
        ['meta', { property: 'og:url', content: 'https://v-calendar.davidpaternina.com/' }],
        ['meta', { property: 'og:title', content: 'Vue Calendar Scheduler' }],
        ['meta', { property: 'og:description', content: 'Calendar scheduler component for VueJs' }],
        ['meta', { property: 'og:image', content: 'https://v-calendar.davidpaternina.com/assets/fb-jumbo.png' }]
    ],
    themeConfig: {
        repo: 'dapd007/v-calendar-scheduler',
        editLinks: true,
        docsDir: 'docs',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Documentation', link: '/guide/' },
        ],
        sidebar: {
            '/guide/': [
                {
                    title: 'Guide',
                    collapsable: false,
                    children: [
                        '',
                        'overview',
                        'getting-started',
                        'config',
                        'events',
                        'callbacks',
                        'customization',
                        'demos'
                    ]
                }
            ]
        },
        lastUpdated: 'Last Updated', // string | boolean
    },
};