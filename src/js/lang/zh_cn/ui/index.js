const keys = import.meta.glob('./chip/*.js', {eager: true});
let files = {
  钉钉: '钉钉',
  VP: 'VP',
  图表: '图表',
};
Object.keys(keys).map((it) => {
  // const name = it.match(/.\/chip\/(\S*).js/)[1];
  files = {
    ...files,
    ...keys[it].default
  }
});
export default files;