import router from '@js/router/index.js';

const state = () => {
  return {
    login: {}, // 登录信息
    lang: '',
    currentPage: {}, // 当前页面
    historyPages: [], // 历史访问记录
    tabPages: [], // 选项卡缓存
    contextMenu: {}, // 右键菜单信息
    loading: {
      // 页面加载状态，非请求状态
      visible: false,
    },
    collapseMenu: false, // 折叠菜单栏
    pageWidth: 0
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
  saveCollapse(v){
    this.collapseMenu = v;
    const width = document.body.clientWidth;
    if(this.collapseMenu){
      this.pageWidth = width - 64;
    }else{
      this.pageWidth = width - 200;
    }
  },
  saveLang(v) {
    // 存储语言
    if (v) {
      this.lang = v;
      localStorage.setItem('lang', v);
      location.reload();
    } else {
      this.lang = localStorage.getItem('lang');
    }
  },
  Login(v) {
    // 全局登录
    console.info('Login', v);
  },
  saveTitle() {
    // 存储页面标题
    const langLabel = this.currentPage.meta
      ? this.currentPage.meta.langLabel + '-'
      : '';
    document.title = `${langLabel}${window.global.config.title}`;
  },
  savePage(v) {
    // 存储页面信息
    this.historyPages.unshift(v);
    if (v.meta.multi) {
      // 页面可缓存多个
      this.currentPage = v;
      this.tabPages.push(v);
    } else {
      // 页面唯一存在
      let index = -1;
      for (let i = 0; i < this.tabPages.length; i++) {
        if (this.tabPages[i].name === v.name) {
          index = i;
          break;
        }
      }
      if (index > -1) {
        this.tabPages[index] = v;
      } else {
        this.tabPages.push(v);
      }
    }
    if (this.tabPages.length > 50) {
      this.tabPages.shift();
      console.info('缓存页面超过50，自动删除最早的缓存');
    }
    this.saveTabPages();
  },
  closePage(index, mode = 'close') {
    // 单个关闭
    const close = () => {
      const aimPage = this.tabPages[index];
      this.tabPages.splice(index, 1);
      if (aimPage.key === this.currentPage.key) {
        /*
          关闭的是当前页面
          新的当前位置 页面信息
          不存在页面，即关闭的是最后一个
          最后一个页面设置为当前页面
        */
        let newCurrentPage = this.tabPages[index] || this.tabPages[index - 1];
        router.push({ name: newCurrentPage.name });
      }
    };
    // 关闭其它
    const closeOther = () => {
      const aimPage = this.tabPages[index];
      this.tabPages = [aimPage];
    };
    // 关闭右侧
    const closeRight = () => {
      const total = this.tabPages.length;
      // 不是最后一个才能关闭右侧
      if (total - 1 > index) {
        this.tabPages.splice(index + 1, total - index - 1);
      }
    };
    // 关闭左侧
    const closeLeft = () => {
      const total = this.tabPages.length;
      // 不是第一个才能关闭左侧
      if (index) {
        this.tabPages.splice(0, index);
      }
    };
    const closeType = {
      close,
      closeOther,
      closeRight,
      closeLeft,
    };
    closeType[mode]();
    this.saveTabPages();
  },
  saveTabPages() {
    localStorage.setItem('tabPages', JSON.stringify(this.tabPages));
  },
  saveContextMenu(el) {
    console.info(el);
  },
  registRouter(){

  }
};
const getters = {};
export default {
  state,
  actions,
  getters,
};
