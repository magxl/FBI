<template>
  <div class="App">
    <!-- <ElConfigProvider :size="state.size" :locale="state.locale"> -->
    <Loading />
    <!-- <Navbar v-if="showNavbar" /> -->
    <ContextMenu />
    <div class="MAIN">
      <router-view />
    </div>
    <Help />
    <!-- </ElConfigProvider> -->
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
// import { ElConfigProvider } from 'element-plus';
import Loading from './views/Launch/Loading/index.vue';
// import Navbar from './views/Launch/Navbar.vue';
import ContextMenu from './views/Launch/ContextMenu/index.vue';
import Help from './views/Launch/Help/index.vue';

//
const state = reactive({ v: '', timer: null, size: 'small', locale: '' });
const store = inject('store');
const launch = store.launch();
const route = useRoute();
const { proxy } = getCurrentInstance();

// 计算
const showNavbar = computed(() => {
  return !route.meta.normal;
});
const langModuleLoaded = computed(() => {
  return proxy.$l('loaded') === true;
});

// 监听

// 挂载

launch.getLocalTimezone();
onMounted(async () => {
  initOptions();
  listenerSize(); // 初始化配置项
  await initColorIcon(); // 初始化多色图标
  await initTabPages(); // 初始化缓存Tab
  await initLang(); // 初始化语言
  await initLoaded(); // 初始化载入完成
});

// 事件

// 初始化多色图标
const initColorIcon = () => {
  const iconfont = document.createElement('script');
  iconfont.id = 'iconfont';
  iconfont.type = 'text/javascript';
  iconfont.src = window.global.config.colorIcon;
  const hadIconfont = document.getElementById('iconfont');
  if (hadIconfont) {
    return;
  }
  document.head.appendChild(iconfont);
};
// 初始化菜单
const initTabPages = () => {
  let tabPages = localStorage.getItem('tabPages');
  if (tabPages) {
    // tabPages = JSON.parse(tabPages).map((it) => {
    //   it.meta.langLabel = proxy.$l(it.meta.label);
    //   return it;
    // });
    launch.saveData('tabPages', JSON.parse(tabPages));
  }
};

// 初始化语言
const initLang = () => {
  launch.saveLang();
  // const keys = import.meta.glob(
  //   '/node_modules/element-plus/dist/locale/*.min.mjs',
  //   { eager: true },
  // );
  // let lang = {};
  // Object.keys(keys).forEach((it) => {
  //   const name = it.match(/locale\/(\S*).min.mjs/)[1].replace('-', '_');
  //   lang[name] = keys[it].default;
  // });
  // state.locale = lang[localStorage.getItem('lang')];
};

// 初始化配置项
const initOptions = (e) => {
  // 页面宽高
  nextTick(() => {
    const { page, frame, table, drawer } = window.global.config;
    const { clientWidth, clientHeight } = document.body;
    const tableHeight =
      clientHeight -
      frame.header -
      page.header -
      page.paddingTop -
      page.paddingBottom -
      table.pagination;
    const pageHeight =
      clientHeight - page.paddingTop - page.paddingBottom - page.header - frame.header;

    const drawerHeight = clientHeight - 56 - drawer.footer;
    const collapseMenu = Number(localStorage.getItem('collapseMenu'));
    const pageWidth = clientWidth - (collapseMenu ? 64 : 200);
    // agent
    // console.info(window.navigator);
    let platform = '';
    if (window.navigator.platform) {
      if (window.navigator.platform.toLowerCase().indexOf('mac') > -1) {
        platform = 'macOS';
      }
    } else if (window.navigator.userAgentData) {
      platform = window.navigator.userAgentData.platform;
    }
    // const { platform = '' } = window.navigator?.userAgentData;
    const options = {
      clientWidth,
      clientHeight,
      tableHeight,
      pageHeight,
      pageWidth,
      drawerHeight,
      platform,
    };
    window.global.config.options = options;
    console.table(options);
    launch.saveData('options', options);
  });
};

const initLoaded = () => {
  const loadingMsk = document.getElementsByClassName('loadingMask')[0];
  state.timer = setTimeout(() => {
    loadingMsk.style.display = 'none';
  }, 500);
};

const listenerSize = () => {
  window.addEventListener('resize', initOptions);
};
</script>
<style lang="scss" scoped>
.App {
  height: 100vh;
  overflow: hidden;
}
.MAIN {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 1;
  &.showNavbar {
    padding-top: 30px;
  }
}
</style>
