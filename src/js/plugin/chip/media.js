export default {
  install(app) {
    app.config.globalProperties.$getImg = (url) => {
      return new URL(`/src/assets/img/${url}`, import.meta.url).href;
    };
  },
};
