<template>
  <div class="StaticPage hp100">
    <template v-if="prop.noscroll">
      <slot />
    </template>
    <el-scrollbar v-else class="hp100">
      <slot />
    </el-scrollbar>
  </div>
</template>
<script setup>
defineOptions({
  name: 'StaticPage',
});
const prop = defineProps({
  options: {
    type: Object,
    default: () => {},
  },
  noscroll: {
    type: Boolean,
    default: false,
  },
});
// 数据
const state = reactive({
  defaultOptions: {
    scroll: false,
  },
});

// 计算属性

// 监听

// 挂载

// 事件

// 卸载
</script>
<style lang="scss" scoped>
.StaticPage {
  position: relative;
  min-height: 100%;
  width: 100%;
}
</style>
