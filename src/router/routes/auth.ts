import type { RouteRecordRaw } from 'vue-router';

const auth: Array<RouteRecordRaw> = [
    {
        path: '/auth',
        component: () => import('../../views/layouts/Auth.vue'),
        children: [
            {
                path: '',
                name: 'login',
                component: () => import('../../views/pages/auth/Login.vue'),
            },
            {
                path: 'register',
                name: 'register',
                component: () => import('../../views/pages/auth/Register.vue'),
            },
        ],
    },
];

export default auth;
