// const keys = import.meta.glob('./chip/*.js');
// const zh = {};
// Object.keys(keys).map(async (it) => {
//   const name = it.match(/.\/chip\/(\S*).js/)[1];
//   const file = await keys[it]();
//   zh[name] = file.default;
// });
// export default zh;
import navbar from './navbar/index.js';
import format from './format/index.js';
export default {
  navbar,
  format,
};
