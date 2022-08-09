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
                    title: 'Ваши чаты',
                },
            },
            {
                path: 'profile',
                name: 'profile',
                component: () => import('../../views/pages/chat/Profile.vue'),
                meta: {
                    title: 'Профиль пользователя',
                },
            },
            {
                path: 'contacts',
                name: 'contacts',
                component: () => import('../../views/pages/chat/Contacts.vue'),
                meta: {
                    title: 'Ваши контакты',
                },
            },
            {
                path: 'contacts/add',
                name: 'contacts-add',
                component: () =>
                    import('../../views/pages/chat/ContactsAdd.vue'),
                meta: {
                    title: 'Добавить контакт',
                },
            },
            {
                path: 'settings',
                name: 'settings',
                component: () => import('../../views/pages/chat/Settings.vue'),
                meta: {
                    title: 'Настройки',
                },
            },
        ],
    },
];

export default auth;
