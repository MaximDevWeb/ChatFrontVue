const main = [
    {
        path: '/',
        component: () => import('../../views/layouts/Main.vue'),
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('../../views/pages/main/Home.vue'),
                meta: {
                    title: 'Главная страница',
                },
            },
        ],
    },
];

export default main;
