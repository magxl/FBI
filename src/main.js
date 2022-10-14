import { createApp } from 'vue';
import App from './App.vue';
import './assets/css/theme.scss'; // all css entry

const app = createApp(App);

import js from '@js'; // all diy plugin entry
js(app);
app.mount('#app');

