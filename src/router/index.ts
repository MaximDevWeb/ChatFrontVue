import { createRouter, createWebHistory } from 'vue-router';

// Routes import
import auth from '@/router/routes/auth';
import main from '@/router/routes/main';
import chat from '@/router/routes/chat';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [...auth, ...main, ...chat],
});

router.afterEach((to) => {
    const postfix: string = import.meta.env.VITE_TITLE_PREFIX;
    document.title = to.meta.title + postfix;
});

export default router;
