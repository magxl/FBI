<template>
  <div class="OnloadContextMenu noselect" :style="position">
    <div
      v-click-outside="toHideMenu"
      class="contextMenuArea bg-white9 radius4 backdrop box-shadow-dark1"
      :class="{ visible }"
    >
      <div
        v-for="(it, i) in list"
        :key="i"
        class="contextItem flexMode vs wp100 p4-0 txt-dark7 hover-a"
        :class="it.divider && 'divider'"
        @click="toClick(it)"
      >
        <div class="flexMode vc hc w24">
          <i
            v-if="it.icon"
            class="adicon fs12 nowrap"
            :class="[`ad-${it.icon}`, it.iconColor && `txt-${it.iconColor}`]"
          ></i>
        </div>
        <span class="contextTxt pl8 fs12">{{ it.label }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ClickOutside as vClickOutside } from 'element-plus';
defineOptions({
  name: 'OnloadContextMenu',
});
// 数据
const state = reactive({});
const store = inject('store');
const launch = store.launch();
// 计算属性
const visible = computed(() => {
  return launch.contextMenu.visible;
});

const list = computed(() => {
  return launch.contextMenu.list;
});
const position = computed(() => {
  const { x = 0, y = 0 } = launch.contextMenu.position;
  return {
    left: x + 'px',
    top: y + 'px',
  };
});

// 监听

// 挂载

// 事件
const toHideMenu = () => {
  launch.saveContextMenu();
};
const toClick = (it) => {
  it.cb();
  toHideMenu();
};
// 卸载
</script>
<style lang="scss" scoped>
.OnloadContextMenu {
  position: fixed;
  z-index: 99;
  .contextMenuArea {
    position: relative;
    width: 0;
    height: 0;
    padding: 4px 24px 4px 0;
    opacity: 0;
    overflow-x: hidden;
    transition: none;
    // transition: $trans3;
    &.visible {
      width: auto;
      height: auto;
      min-width: 140px;
      max-width: 240px;
      min-height: 160px;
      max-height: 360px;
      overflow-y: auto;
      transition: $trans3;
      opacity: 1;
    }
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 24px;
      bottom: 0;
      border-left: 1px $border solid;
    }
    .contextItem {
      position: relative;
      &.divider {
        &::after {
          content: '';
          position: absolute;
          left: 24px;
          right: -24px;
          bottom: 0;
          border-bottom: 1px solid $border;
        }
      }
      .contextTxt {
        word-break: keep-all;
        white-space: nowrap;
      }
    }
  }
}
</style>
