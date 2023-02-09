<template>
  <div class="App">
    <Loading />
    <!-- <Navbar v-if="showNavbar" /> -->
    <!-- <ContextMenu /> -->
    <div class="MAIN">
      <router-view />
    </div>
  </div>
</template>
<script setup>
import Loading from '@cpt/Onload/Loading/index.vue';
import Navbar from './views/Launch/Navbar.vue';
import ContextMenu from '@cpt/Onload/ContextMenu/index.vue';

//
import { nextTick, reactive } from 'vue';

const state = reactive({ timer: null });
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
  await initColorIcon(); // 初始化多色图标
  await initTabPages(); // 初始化缓存Tab
  await initLang(); // 初始化语言
  await initOptions(); // 初始化配置项

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
  let tabPages = localStorage.getItem('tabPages') || '[]';
  if (tabPages) {
    tabPages = JSON.parse(tabPages).map((it) => {
      it.meta.langLabel = proxy.$l(it.meta.label);
      return it;
    });
    launch.saveData('tabPages', tabPages);
  }
};

// 初始化语言
const initLang = () => {
  launch.saveLang();
  // window.routes = initRoutes(window.routes);
};

// 初始化配置项
const initOptions = () => {
  // 页面宽高
  nextTick(() => {
    const { clientWidth, clientHeight } = document.body;
    const tableHeight = clientHeight - 56 - 56 - 32;
    console.info('tableHeight', tableHeight);
    launch.saveData('options', { clientWidth, clientHeight, tableHeight });
  });
};
const initLoaded = () => {
  const loadingMsk = document.getElementsByClassName('loadingMask')[0];
  state.timer = setTimeout(() => {
    loadingMsk.style.display = 'none';
  }, 500);
};
</script>
<style lang="scss" scoped>
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
