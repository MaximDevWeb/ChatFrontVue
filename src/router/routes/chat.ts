import type { RouteRecordRaw } from 'vue-router';

const auth: Array<RouteRecordRaw> = [
    {
        path: '/chat',
        component: () => import('../../views/layouts/Chat.vue'),
        children: [
            {
                path: '',
                name: 'index',
                component: () => import('../../views/pages/chat/Index.vue'),
                meta: {
                    title: 'Чат',
                },
            },
            {
                path: 'profile',
                name: 'profile',
                component: () => import('../../views/pages/chat/Profile.vue'),
                meta: {
                    title: 'Профиль пользоваьеля',
                },
            },
        ],
    },
];

export default auth;
