const keys = import.meta.glob('./chip/*.js', { eager: true });
let files = {};
Object.keys(keys).map((it) => {
  files = {
    ...files,
    ...keys[it].default,
  };
});
export default files
