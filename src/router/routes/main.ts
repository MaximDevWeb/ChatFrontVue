const main = [
    {
        path: '/',
        component: () => import('../../views/layouts/Main.vue'),
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('../../views/pages/main/Home.vue'),
            },
        ],
    },
];

export default main;
