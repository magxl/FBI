const keys = import.meta.glob('./*/index.js', { eager: true });
let files = {
  loaded: true,
};
Object.keys(keys).map((it) => {
  const name = it.match(/.\/(\S*)\//)[1];
  files = {
    ...files,
    ...keys[it].default,
  };
});
export default files;
