const state = () => {
  return {
    title: 'VITE+VUE3+PINIA',
    login: {},
    lang: 'zh',
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
  saveLang(v) {
    // 存储语言
    if (v) {
      this.lang = v;
    } else {
      this.lang = localStorage.getItem('lang') || 'zh';
    }
  },
};
const getters = {};
export default {
  state,
  actions,
  getters,
};
