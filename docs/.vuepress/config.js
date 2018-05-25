module.exports = {
    title: 'Vue Calendar',
    description: 'Calendar scheduler component for VueJs',
    ga: "UA-116825927-2",
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