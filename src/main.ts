import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PerfectScrollbar from 'vue3-perfect-scrollbar';

import App from './App.vue';
import router from './router';

import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css';
import './assets/styles/app.scss';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PerfectScrollbar);

app.mount('#app');
