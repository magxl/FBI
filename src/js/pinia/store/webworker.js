const state = () => {
  return {
    url: {
      tableList: 'src/js/webworker/tableList.js',
    },
  };
};
const actions = {
  init(v = 'tableList') {
    const url = this.url[v];
    return new Worker(url);
  },
};
const getters = {};
export default {
  state,
  actions,
  getters,
};
