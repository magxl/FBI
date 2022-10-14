export default {
  install(app) {
    app.config.globalProperties.getImg = (url, base = '@img/') => {
      return new URL(`${base}${url}`, import.meta.url).href;
    };
  },
};
