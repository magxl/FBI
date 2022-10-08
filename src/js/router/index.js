import { createRouter, createWebHashHistory } from 'vue-router';
import algorithm from './algorithm.js';
import mouseboard from './mouseboard.js';
import visual from './visual.js';
import ui from './ui.js';
import animat from './animat.js';
import tool from './tool.js';
import test from './test.js';
const routes = [
  {
    path: '/',
    name: 'Launch',
    meta: {
      label: '我',
      position: 'navbar',
    },
    component: () => import('../../views/Launch/Launch.vue'),
  },
  {
    path: '/Contract',
    name: 'Contract',
    meta: {
      label: '合同',
      position: '',
    },
    component: () => import('../../views/Contract/Contract.vue'),
  },
  {
    path: '/CodeSlice',
    name: 'CodeSlice',
    meta: {
      label: '格式化',
      position: 'navbar',
    },
    component: () => import('../../views/CodeSlice/CodeSlice.vue'),
  },
  { ...test },
  { ...algorithm },
  { ...mouseboard },
  { ...visual },
  { ...ui },
  { ...animat },
  { ...tool },
];
window.routes = routes;
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
