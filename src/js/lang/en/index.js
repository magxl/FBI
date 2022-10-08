// const keys = import.meta.glob('./chip/*.js');
// const en = {};
// Object.keys(keys).map(async (it) => {
//   const name = it.match(/.\/chip\/(\S*).js/)[1];
//   const file = await keys[it]();
//   en[name] = file.default;
// });

// export default en;

import navbar from './navbar/index.js';
import format from './format/index.js';
export default {
  navbar,
  format,
};
