<template>
  <div class="SuperNodata">
    <el-empty :image-size="imageSize" :description="description"></el-empty>
  </div>
</template>
<script>
const emptyMap = {
  data: 'No Data',
  selection: 'Unselected',
};
</script>
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
  type: {
    type: String,
    default: 'data',
    validate: (v) => {
      return emptyMap[v];
    },
  },
});
// 数据
const state = reactive({});

// 计算属性

const imageSize = computed(() => {
  return Number(prop.size);
});
const description = computed(() => {
  return window.$l(emptyMap[prop.type]);
});
// 监听

// 挂载

// 事件

// 卸载

// Maps
</script>
<style lang="scss" scoped>
.SuperNodata {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}
</style>
