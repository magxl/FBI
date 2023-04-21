const keys = import.meta.glob('./chip/*.js', { eager: true });
let files = {};
Object.keys(keys).forEach((it) => {
  const name = it.match(/chip\/(\S*).js/)[1];
  files[name] = keys[it].default;
});
export default {
  install(app) {
    app.config.globalProperties.$api = files;
    window.$api = files;
  },
};
