<template>
  <div :style="mainStyle">
    <div
      class="MvcMainPage PageAfter bg-white radius box-shadow-dark1"
      :style="pageStyle"
    >
      <div
        v-if="useHeader"
        class="flexMode vc hb p0-16 border-b-dark1"
        :style="headerStyle"
      >
        <b v-if="prop.title">{{ $l(prop.title) }}</b>
        <slot v-else name="header" />
      </div>
      <slot v-if="prop.noscroll" />
      <el-scrollbar v-else :style="scrollStyle">
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
// 数据
const { proxy } = getCurrentInstance();
const state = reactive({
  defaultOptions: {
    scroll: false,
  },
});
const store = inject('store');
const launch = store.launch();

// 计算属性
const useHeader = computed(() => {
  return prop.title || proxy.$slots.header;
});
const pageConfig = computed(() => {
  return window.global.config.page;
});
const mainStyle = computed(() => {
  return {
    padding: `${pageConfig.value.paddingTop}px ${pageConfig.value.paddingRight}px ${pageConfig.value.paddingBottom}px ${pageConfig.value.paddingLeft}px`,
  };
});
const headerStyle = computed(() => {
  return {
    height: pageConfig.value.header + 'px',
  };
});
const scrollStyle = computed(() => {
  let height = launch.options.pageHeight;
  if (!useHeader.value) {
    height += pageConfig.value.header;
  }
  return {
    height: height + 'px',
  };
});

const pageStyle = computed(() => {
  return {
    borderRadius: pageConfig.value.paddingRight ? '' : '8px 0 0 8px',
  };
});
// 监听

// 挂载

// 事件

// 卸载
</script>
<style lang="scss" scoped>
.MvcMainPage {
  width: 100%;
}
</style>
