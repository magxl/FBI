<template>
  <div class="SuperNodata">
    <el-empty :image-size="imageSize" :description="description"></el-empty>
  </div>
</template>
<script setup>
// 定义
defineOptions({
  name: 'SuperNodata',
});
// 传参
const prop = defineProps({
  size: {
    type: [String, Number],
    default: '48',
  },
});
const store = inject('store');
const launch = store.launch();
// 数据
const state = reactive({});

// 计算属性
const emptyMap = computed(() => {
  return window.$map.common.emptyMap;
});
const imageSize = computed(() => {
  return Number(prop.size);
});
const description = computed(() => {
  return emptyMap.value[launch.lang];
});
// 监听

// 挂载

// 事件

// 卸载
</script>
<style lang="scss" scoped></style>
