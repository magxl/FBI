
const state = () => {
  return {
    aggregationLoading: false,
  };
};
const actions = {
  saveData(aim, dt) {
    if (window.$getType(dt) === 'Object') {
      this[aim] = Object.assign({}, this[aim], dt);
    } else if (window.$getType(dt) === 'Array') {
      this[aim] = [].concat(dt);
    } else {
      this[aim] = dt;
    }
  },
};
const getters = {};
export default {
  state,
  actions,
  getters,
};
