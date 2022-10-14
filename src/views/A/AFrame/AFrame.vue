<template>
  <div class="Frame AFrame flexMode" :class="{ collapseMenu }" :key="lang">
    <AFrameMenu :menu="state.menu" />
    <div class="AFrameRight">
      <AFrameHeader />
      <AFrameBody />
    </div>
  </div>
</template>
<script setup>
import AFrameMenu from './AFrameMenu.vue';
import AFrameHeader from './AFrameHeader.vue';
import AFrameBody from './AFrameBody.vue';
defineOptions({
  name: 'AFrame',
  components: { AFrameMenu, AFrameHeader, AFrameBody },
});
const { proxy } = getCurrentInstance();
const state = reactive({
  // 别名，即模块根路由
  alias: '/A/',
  menu: [],
});
// 取得模块路由
state.menu = window.routes.filter((it) => it.name === 'A')[0].children;

const store = inject('store');
const launch = store.launch();
const currentPage = computed(() => {
  return launch.currentPage;
});
const collapseMenu = computed(() => {
  return launch.collapseMenu;
});
</script>
<style lang="scss" scoped></style>
