import { createRouter, createWebHashHistory } from 'vue-router';
import { store } from '@js/pinia';
import { $l } from '@js/lang';

const login = {
  path: '/',
  name: 'Login',
  langLabel: $l('登录'),
  meta: {
    label: '登录',
    position: '',
    normal: true,
    sort: 0,
  },
  component: () => import('@views/Launch/Login.vue'),
};
let routes = [];
const files = import.meta.glob('./*/index.js', { eager: true });
Object.keys(files).map((it) => {
  routes.push(files[it].default);
});
routes.sort((a, b) => a.meta.sort - b.meta.sort);

// 初始化语言模版
const initRoutes = (v) => {
  return v.map((it) => {
    it.meta.langLabel = $l(it.meta.label);
    if (it.children) {
      it.children = initRoutes(it.children);
    }
    return it;
  });
};
routes = initRoutes(routes);
window.routes = routes;
// 路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes: [login, ...routes],
});

// 全局字典

// 全局守卫
let timer = null;
let time = 0;
// console.info(store.launch);
// console.info(launch);
router.beforeEach((to, from, next) => {
  // clearTimeout(timer);
  const launch = store.launch();
  launch.saveData('loading', { ...launch.loading, visible: true });
  time = new Date();
  // 普通页面，不需要登录
  const { normal } = to.meta;
  let nextPage = undefined;
  const dev = window.global.config.dev;
  if (!dev) {
    if (!from.name && to.name && from.name === to.name) {
      next();
      return;
    } else if (!from.name && !to.name) {
      return;
    }
    if (from.name || to.name) {
      if (!normal) {
        const { authID } = launch.login;
        if (!authID) {
          nextPage = '/';
        }
      }
    }
  }
  // 404
  const module = to.fullPath.split('/')[1];
  const name404 = module + '404';
  if (
    to.matched.length === 0 ||
    (to.matched.length === 1 && !to.matched.children)
  ) {
    next({ name: name404 });
  } else {
    next(nextPage);
  }
});
router.afterEach((to, from) => {
  const launch = store.launch();
  const now = +new Date();
  console.info(
    `TIME %c┆${now - time}ms┆`,
    'background-color:#f1f7ff; color:#0085FF;',
  );
  const unpage = ['Login']; // 不存储的页面
  if (unpage.indexOf(to.name) === -1) {
    to.key = `page${now}${parseInt(Math.random() * 10000)}`;
    launch.saveData('currentPage', to);
    launch.savePage(to);
  }
  launch.saveTitle();
  launch.saveData('loading', { ...launch.loading, visible: false });
});

export default router;
