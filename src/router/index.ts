import { createRouter, createWebHistory } from 'vue-router';

// Routes import
import auth from '@/router/routes/auth';
import main from '@/router/routes/main';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [...auth, ...main],
});

export default router;
