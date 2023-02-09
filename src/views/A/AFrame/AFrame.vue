<template>
  <div
    class="Frame AFrame"
    :class="{ collapseMenu }"
    :key="lang"
  >
    <AFrameHeader />
    <div class="AFrameMain flexMode">
      <AFrameMenu :menu="state.menu" />
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
  loading: true,
  mounted: false,
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
onMounted(() => {
  state.loading = false;
});
</script>
<style lang="scss" scoped>
.AFrame {
  border-radius: 12px;
  box-shadow: $dark1 0 40px 20px, $blue1 0 20px 20px;
  .AFrameMain {
    position: relative;
    height: calc(100% - 56px);
    width: 100%;
    overflow: hidden;
  }
  &.collapseMenu {
    .AFrameMenu {
      width: 64px;
      .logoTxt {
        display: none;
      }
    }
  }
}
</style>
