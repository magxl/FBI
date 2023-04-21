<template>
  <div class="AFrameBody" :class="{ collapseMenu }" :style="style">
    <router-view v-slot="{ Component }">
      <transition name="mg">
        <keep-alive>
          <component v-if="keepalive" :is="Component" :key="pageKey" />
        </keep-alive>
      </transition>

      <transition name="mg">
        <component v-if="!keepalive" :key="pageKey" :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
<script setup>
defineOptions({
  name: 'AFrameBody',
});
// 数据
const state = reactive({});
const store = inject('store');
const launch = store.launch();
const route = useRoute();
// 计算属性

const collapseMenu = computed(() => {
  return launch.collapseMenu;
});
const style = computed(() => {
  return {
    width: launch.pageWidth + 'px',
  };
});
const currentPage = computed(() => {
  return launch.currentPage || {}
 });
const keepalive = computed(() => {
  return currentPage.value.meta.keepalive
  // return route.meta.keepalive;
});
const pageKey = computed(() => {
  return currentPage.value.meta.key;
});
// 监听

// 挂载

// 事件

// 卸载
</script>
<style lang="scss" scoped>
.AFrameBody {
  // padding: 16px;
  position: relative;
  height: 100%;
  // width: 100%;
  flex-grow: 1;
  overflow: hidden;
  // &.collapseMenu {
  //   width:
  // }
  .BodyArea {
    height: 100%;
    overflow: hidden;
    // background-color: $white;
    border-radius: 8px;
    box-shadow: 0 5px 20px $dark1;
  }
}
</style>
