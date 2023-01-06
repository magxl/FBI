<template>
  <div class="NonePage hp100">
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
  name: 'NonePage',
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
import { reactive } from 'vue';
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
.NonePage {
  min-height: 100%;
}
</style>
