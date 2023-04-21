<template>
  <div class="WidgetLoadingLost">
    <div style="animation-delay: 0.1s; left: 50%; margin-left: -4px"></div>
    <div style="animation-delay: 0.2s; bottom: 0"></div>
    <div style="animation-delay: 0.3s; bottom: 0; right: 0"></div>
  </div>
</template>
<script setup>
// 定义 逐一消失
defineOptions({
  name: 'WidgetLoadingLost',
});
// 数据
const state = reactive({});

// 挂载

// 事件

// 计算属性

// 监听

// 卸载

// Map
</script>
<style lang="scss" scoped>
.WidgetLoadingLost {
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
