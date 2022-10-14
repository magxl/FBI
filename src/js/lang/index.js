// import { createI18n } from 'vue-i18n';

let locale = (
  navigator.language ? navigator.language : navigator.userLanguage
).toLowerCase();
locale = locale.replace('-', '_') || 'zh_cn';
const oldLocale = localStorage.getItem('lang');
// 使用已缓存语言，无缓存则新缓存
if(oldLocale){
  locale = oldLocale;
} else {
  localStorage.setItem('lang', locale);
}

// 引入语言包
const langs = import.meta.glob('./*/index.js', { eager: true });
let messages = {};
let langsKeys = [];
Object.keys(langs).forEach((it) => {
  const name = it.match(/.\/(\S*)\//)[1];
  langsKeys.push(name);
  messages[name] = langs[it].default;
});
window.$langs = langsKeys;

// 语言格式化
export const $l = (v) => {
  const locale = localStorage.getItem('lang');
  let r = langMap[locale];
  const arr = v.split('.');
  arr.forEach((it) => {
    r = r[it] || v;
  });
  return r;
};

// 字典
export const langMap = messages;
