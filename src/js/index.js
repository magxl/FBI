import { pinia, store } from '@js/pinia/index.js';
import router from '@js/router/index.js';
import cpt from '@js/cpt/index.js';
import ElementPlus from 'element-plus';
import plugin from './plugin/index.js';
import config from './config/index.js';

// element多语言
const keys = import.meta.glob('/node_modules/element-plus/dist/locale/*.min.mjs', {eager: true});
let lang = {};
Object.keys(keys).forEach(it => {
  const name = it.match(/locale\/(\S*).min.mjs/)[1].replace('-','_');
  lang[name] = keys[it].default;
});
const locale = lang[localStorage.getItem('lang')];

export default async (app) => {
  app
    .use(pinia)
    .provide('store', store)
    .use(ElementPlus,{
      size: 'default',
      locale
    })
    .use(router)
    .use(plugin)
    .use(cpt);
};
