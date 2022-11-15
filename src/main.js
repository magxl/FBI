import { createApp } from 'vue';
import './assets/css/theme.scss'; // all css entry

import App from './App.vue';
const app = createApp(App);

import js from '@js'; // all diy plugin entry
js(app);
app.mount('#app');

