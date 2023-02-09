<template>
  <div class="WidgetSubmiting" :class="prop.type">
    <div class="loadingArea">
      <div style="animation-delay: 0.1s; left: 50%; margin-left: -4px"></div>
      <div style="animation-delay: 0.2s; bottom: 0"></div>
      <div style="animation-delay: 0.3s; bottom: 0; right: 0"></div>
    </div>
    <span class="fs12 txt-dark3">{{ prop.txt }}</span>
  </div>
</template>
<script setup>
import { reactive } from 'vue';
// 定义
defineOptions({
  name: 'WidgetSubmiting',
});
// 传参
const prop = defineProps({
  txt: {
    type: String,
    default: '... SUBMITING ...',
  },
  type: {
    type: String,
    default: '',
  },
});
// 数据
const state = reactive({});

// 计算属性

// 监听

// 挂载

// 事件

// 卸载
</script>
<style lang="scss" scoped>
.WidgetSubmiting {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9;
  background-color: $white7;
  @include backdrop();
  .loadingArea {
    position: relative;
    display: flex;
    width: 32px;
    height: 24px;
    margin-bottom: 8px;
    div {
      position: absolute;
      width: 8px;
      height: 8px;
      margin: 0 2px;
      background-color: orange;
      animation: rotate 2s ease-in-out infinite;
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotateZ(0);
    opacity: 1;
  }
  35% {
    transform: rotateZ(360deg);
    opacity: 0;
  }
  50% {
  }
  51% {
    transform: rotateZ(360deg);
    opacity: 0;
  }
  70% {
    transform: rotateZ(0);
    opacity: 1;
  }
  100% {
  }
}
</style>
