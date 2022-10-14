<template>
  <div class="SuperHover">
    <slot />
    <div class="hoverBg">
      <slot />
    </div>
  </div>
</template>
<script setup>
defineOptions({
  name: 'SuperHover',
});
import { reactive } from 'vue';
// 数据
const state = reactive({});

// 计算属性

// 监听

// 挂载

// 事件

// 卸载
</script>
<style lang="scss" scoped>
// hover模糊层-需要relative
.SuperHover {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .hoverBg {
    position: absolute;
    z-index: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &:hover {
    .hoverBg {
      filter: blur(16px);
    }
  }
}
</style>
