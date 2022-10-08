import { createI18n } from 'vue-i18n';
const lang = (
  navigator.language ? navigator.language : navigator.userLanguage
).toLowerCase();
const locale = lang.split('-')[0] || 'zh';

// 引入语言包
// const langs = import.meta.glob('./*/index.js');
// let messages = {};
// let langsKeys = [];
// Object.keys(langs).forEach(async (it) => {
//   const name = it.match(/.\/(\S*)\//)[1];
//   langsKeys.push({ name, value: name });
//   const file = await langs[it]();
//   messages[name] = file.default;
// });
// window.$langs = langsKeys;

import zh from './zh/index.js';
import en from './en/index.js';
const messages = {
  zh,
  en,
};
window.$langs = ['zh', 'en'];
export default createI18n({
  locale,
  globalInjection: true,
  messages,
});
