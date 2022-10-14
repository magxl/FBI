const keys = import.meta.glob('./chip/*.js', { eager: true });
let files = Object.keys(keys).map((it) => {
  // const name = it.match(/chip\/(\S*).js/)[1];
  return keys[it].default;
});
export default {
  install(app) {
    files.forEach(it=>{
      app.use(it);
    })
  },
};
