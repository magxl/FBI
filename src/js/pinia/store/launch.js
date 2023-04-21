import router from '@js/router/index.js';

const state = () => {
  return {
    login: {}, // 登录信息
    lang: '', // 语言
    currentPage: {}, // 当前页面
    historyPages: [], // 历史访问记录
    tabPages: [], // 选项卡缓存
    contextMenu: {
      visible: false,
      list: [],
      position: {}, // 位置信息
    }, // 右键菜单信息
    loading: {
      // 页面加载状态，非请求状态
      visible: false,
    },
    collapseMenu: false, // 折叠菜单栏
    pageWidth: 0,
    options: {}, // 配置项
    localTimezone: {}, // 本地时区
    help: {
      // 帮助模块
      visible: false,
      keyword: '',
      size: false, // 尺寸
    },
    worker: {}, // webworker
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
  saveCollapse(v) {
    this.collapseMenu = v;
    const width = document.body.clientWidth;
    if (this.collapseMenu) {
      this.pageWidth = width - 64;
    } else {
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
    let label = '';
    const { meta, params } = this.currentPage;
    if (meta) {
      // if (meta.multiple) {
      //   label += params.nameLabel + '-';
      // }
      label += meta[`label_${this.lang}`];
      label += '-';
      document.title = `${label}${window.global.config.title}`;
    }
  },
  savePage(v) {
    // 存储页面信息
    let page = {
      ...v,
    };
    delete page.matched;
    this.historyPages.unshift(v);
    if (page.meta.multiple) {
      // 页面可缓存多个
      this.currentPage = page;
      this.tabPages.push(page);
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
        this.tabPages[index] = page;
      } else {
        this.tabPages.push(page);
      }
    }
    if (this.tabPages.length > 50) {
      this.tabPages.shift();
      console.info('缓存页面超过50，自动删除最早的缓存');
    }
    this.saveTabPages();
  },
  gotoPage(newCurrentPage) {
    router.push({
      name: newCurrentPage.name,
      params: newCurrentPage.params,
      query: newCurrentPage.query,
    });
  },
  closePage(index, mode = 'close') {
    // 当前页面索引
    let cindex = null;
    try {
      this.tabPages.forEach((it, i) => {
        if (it.key === this.currentPage.key) {
          cindex = i;
          throw new Error();
        }
      });
    } catch (error) {}
    // 单个关闭
    const close = () => {
      // const aimPage = this.tabPages[index];
      this.tabPages.splice(index, 1);
      // 关闭的是当前页面时
      if (cindex === index) {
        // 判断新回显页面索引
        const newPageIndex = index === 0 ? 0 : index - 1;
        const newCurrentPage = this.tabPages[newPageIndex];
        this.gotoPage(newCurrentPage);
      }
    };
    // 关闭其它
    const closeOther = () => {
      const aimPage = this.tabPages[index];
      // 关闭的页面有当前回显页面时，将目标页面变成当前页面
      if (cindex !== index) {
        this.gotoPage(aimPage);
      }
      this.tabPages = [aimPage];
    };
    // 关闭右侧
    const closeRight = () => {
      const total = this.tabPages.length;
      const aimPage = this.tabPages[index];

      // 不是最后一个才能关闭右侧
      if (total - 1 > index) {
        this.tabPages.splice(index + 1, total - index - 1);
      }
      if (cindex > index) {
        // 当前页面在关闭的页面中时，将目标页面变为当前页面
        this.gotoPage(aimPage);
      }
    };
    // 关闭左侧
    const closeLeft = () => {
      const total = this.tabPages.length;
      const aimPage = this.tabPages[index];

      // 不是第一个才能关闭左侧
      if (index) {
        this.tabPages.splice(0, index);
      }
      if (cindex < index) {
        // 当前页面在关闭的页面中时，将目标页面变为当前页面
        this.gotoPage(aimPage);
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
  refreshPage() {
    const key = `${+new Date()}${parseInt(Math.random() * 10000)}`;
    const { index } = this.tabPages.filter1((ft) => ft.meta.key === this.currentPage.meta.key);
    this.currentPage.meta.key = key;
    this.tabPages[index].meta.key = key;
  },
  saveTabPages() {
    localStorage.setItem('tabPages', JSON.stringify(this.tabPages));
  },
  saveContextMenu(v = {}) {
    const { el = {}, visible = false, list = [] } = v;
    const { x, y } = el;
    this.contextMenu = {
      position: { x, y },
      visible,
      list,
    };
  },
  registRouter() {},
  getLocalTimezone() {
    if (this.localTimezone.label) {
      return this.localTimezone;
    } else {
      this.localTimezone = {
        value: new Date().getTimezoneOffset() / -60,
        label: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
      return this.localTimezone;
    }
  },
};
const getters = {};
export default {
  state,
  actions,
  getters,
};
