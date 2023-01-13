<template>
  <div class="p16">
    <div class="MvcMainPage PageAfter bg-white radius radius8 box-shadow-dark1">
      <div v-if="useHeader" class="flexMode vc hb h56 p0-16 border-b-dark1">
        <bold v-if="prop.title">{{$l(prop.title)}}</bold>
        <slot v-else name="header" />
      </div>
      <slot v-if="prop.noscroll" />
      <el-scrollbar v-else class="hp100">
        <slot />
      </el-scrollbar>
    </div>
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
  title: {
    type: String,
    default: '',
  },
  noscroll: {
    type: Boolean,
    default: false,
  },
});
import { reactive } from 'vue';
// 数据
const { proxy } = getCurrentInstance();
const state = reactive({
  defaultOptions: {
    scroll: false,
  },
});

// 计算属性
const useHeader = computed(() => {
  return prop.title || proxy.$slots.header;
});
// 监听

// 挂载

// 事件

// 卸载
</script>
<style lang="scss" scoped>
.MvcMainPage {
  height: calc(100vh - 56px - 32px);
}
</style>
