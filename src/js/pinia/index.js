import { createPinia, defineStore } from 'pinia';
const pinia = createPinia();

const store = {};
const files = import.meta.glob('./store/*.js', { eager: true });
Object.keys(files).forEach((it) => {
  const name = it.match(/store\/(\S*).js/)[1];
  store[name] = defineStore(name, files[it].default);
});

export {
  pinia,
  store,
};
