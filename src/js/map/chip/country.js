const files = import.meta.glob('./country/*.js', { eager: true });
const r = {}
Object.keys(files).map((it) => {
  const name = it.match(/country\/(\S*).js/)[1];
  r[name] = files[it].default;
});
export default r;
