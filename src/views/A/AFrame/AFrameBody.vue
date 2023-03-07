<template>
  <div class="AFrameBody" :class="{ collapseMenu }" :style="style">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <transition>
          <component
            v-if="$route.meta.keepalive"
            :is="Component"
            :key="$route.meta.key"
          />
        </transition>
      </keep-alive>
      <transition>
        <component
          v-if="!$route.meta.keepalive"
          :key="$route.meta.key"
          :is="Component"
        />
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
// 计算属性

const collapseMenu = computed(() => {
  return launch.collapseMenu;
});
const style = computed(() => {
  return {
    width: launch.pageWidth + 'px',
  };
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
