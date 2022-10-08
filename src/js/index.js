import { pinia, store } from '@js/pinia/index.js';
import router from '@js/router/index.js';
import cpt from '@js/cpt/index.js';
import ElementPlus from 'element-plus';
import plugin from './plugin/index.js';

export default (app) => {
  plugin(app);
  app.use(pinia).provide('store', store).use(router).use(cpt).use(ElementPlus);
};
