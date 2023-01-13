const files = import.meta.glob('./common/*.js', { eager: true });
const r = {}
Object.keys(files).map((it) => {
  const name = it.match(/common\/(\S*).js/)[1];
  r[name] = files[it].default;
});
export default r;
