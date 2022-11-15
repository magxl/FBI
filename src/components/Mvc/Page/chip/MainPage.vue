<template>
  <div class="MvcMainPage PageAfter bg-white">
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
  name: 'MainPage',
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
.MvcMainPage {
  min-height: 100%;
}
</style>
