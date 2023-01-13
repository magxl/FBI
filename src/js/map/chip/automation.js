const files = import.meta.glob('./automation/*.js', { eager: true });
const r = {}
Object.keys(files).map((it) => {
  const name = it.match(/automation\/(\S*).js/)[1];
  r[name] = files[it].default;
});
export default r;
