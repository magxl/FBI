<template>
  <svg class="MvcIcon" aria-hidden="true">
    <use :xlink:href="`#vite-${name}`" />
  </svg>
</template>
<script setup>
defineOptions({
  name: 'MvcIcon',
});
const prop = defineProps({
  name: {
    type: String,
    default: 'box2',
  },
});

// 数据

// 计算属性

// 监听

// 挂载

// 事件

// 卸载
</script>
<style lang="scss" scoped>
</style>
