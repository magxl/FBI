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
onMounted(() => {
  initColorIcon();
  initTabPages();
  initLang();
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
