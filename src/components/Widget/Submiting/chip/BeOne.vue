<template>
  <div class="WidgetSubmitingBeOne">
    <div class="centerArea">
      <div class="one"></div>
      <div class="two"></div>
      <div class="three"></div>
    </div>
  </div>
</template>
<script setup>
// 定义 旋转变成一个
defineOptions({
  name: 'WidgetSubmitingBeOne',
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
.WidgetSubmitingBeOne {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  .centerArea {
    position: relative;
    width: 8px;
    height: 8px;
    div {
      position: absolute;
      width: 8px;
      height: 8px;
      background-color: orange;
      // animation: rotate 2s ease-in-out infinite;
      &.one {
        transform: translateY(-12px);
        animation: rotateOne 2s ease-in-out infinite;
      }
      &.two {
        transform: translate(-12px, 8px);
        animation: rotateTwo 2s ease-in-out infinite;
      }
      &.three {
        transform: translate(12px, 8px);
        animation: rotateThree 2s ease-in-out infinite;
      }
    }
  }
}

@keyframes rotateOne {
  0% {
    transform: rotateZ(0) translateY(-12px);
    opacity: 1;
  }
  35% {
    transform: rotateZ(360deg) translateY(0);
    opacity: 0;
  }
  50% {
  }
  51% {
    transform: rotateZ(360deg) translateY(0);
    opacity: 0;
  }
  70% {
    transform: rotateZ(0) translateY(-12px);
    opacity: 1;
  }
  100% {
  }
}

@keyframes rotateTwo {
  0% {
    transform: rotateZ(0) translate(-12px, 8px);
    opacity: 1;
  }
  35% {
    transform: rotateZ(360deg) translate(0, 0);
    opacity: 0;
  }
  50% {
  }
  51% {
    transform: rotateZ(360deg) translate(0, 0);
    opacity: 0;
  }
  70% {
    transform: rotateZ(0) translate(-12px, 8px);
    opacity: 1;
  }
  100% {
  }
}
@keyframes rotateThree {
  0% {
    transform: rotateZ(0) translate(12px, 8px);
    opacity: 1;
  }
  35% {
    transform: rotateZ(360deg) translate(0, 0);
    opacity: 0;
  }
  50% {
  }
  51% {
    transform: rotateZ(360deg) translate(0, 0);
    opacity: 0;
  }
  70% {
    transform: rotateZ(0) translate(12px, 8px);
    opacity: 1;
  }
  100% {
  }
}
</style>
