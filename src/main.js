import { createApp } from 'vue';
import './assets/css/theme.scss'; // all css entry

import App from './App.vue';
const app = createApp(App);
const loadingMsk = document.getElementsByClassName('loadingMask')[0];
setTimeout(() => {
  loadingMsk.style.display = 'none';
}, 500);
import js from '@js'; // all diy plugin entry
js(app);
app.mount('#app');
