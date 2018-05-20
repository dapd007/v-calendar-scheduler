module.exports = {
    base: '/v-calendar-scheduler/',
    title: 'Vue Calendar',
    description: 'Calendar scheduler component for VueJs',
    themeConfig: {
        repo: 'dapd007/v-calendar-scheduler',
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
                        'customization',
                        'demos'
                    ]
                }
            ]
        },
        lastUpdated: 'Last Updated', // string | boolean
    },
};