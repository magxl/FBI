<template>
  <component :is="cpt" v-bind="$attrs" :dt="dt" />
</template>
<script setup>
defineOptions({
  name: 'SuperArea',
});
// 传参
const prop = defineProps({
  type: {
    type: String,
    default: 'normal',
  },
  options: {
    type: Object,
    default: () => {},
  },
});
import { reactive } from 'vue';
// 数据
const state = reactive({});

// 计算属性
const cpt = computed(() => {
  return (
    'Area' +
    prop.type.substr(0, 1).toUpperCase() +
    prop.type.substr(1, prop.type.length)
  );
});
const area = computed(() => {
  return window.$map.area;
});
const dt = computed(() => {
  if (prop.options) {
    const { list, views } = prop.options;
    // 自定义list时，使用自定义数据
    if (list) {
      return { list };
    }
    // 自定义内置views时
    if (views) {
      return window.$map.area.filter((it) => views.includes(it.name));
    }
  }
  return window.$map.area;
});
// 监听

// 挂载

// 事件

// 卸载
</script>
<style lang="scss" scoped></style>
