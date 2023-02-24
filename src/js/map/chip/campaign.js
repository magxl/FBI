const files = import.meta.glob('./campaign/*.js', { eager: true });
const r = {}
Object.keys(files).map((it) => {
  const name = it.match(/campaign\/(\S*).js/)[1];
  r[name] = files[it].default;
});
export default r;
