export default {
  install(app) {
    app.config.globalProperties.$getImg = (url, base = '/src/assets/img/') => {
      return new URL(`${base}${url}`, import.meta.url).href;
    };
  },
};
