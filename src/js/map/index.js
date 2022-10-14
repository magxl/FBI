const files = import.meta.glob('./chip/*.js', { eager: true });
let maps = {};
Object.keys(files).forEach((it) => {
  const name = it.match(/chip\/(\S*).js/)[1];
  maps[name] = files[it].default;
});
export default maps;
