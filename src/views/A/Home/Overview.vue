<template>
  <Page class="Overview" noscroll>
    <div class="flexMode" :style="mainStyle">
      <Article v-model="state.selected" />
      <Talk :info="state.selected" />
    </div>
  </Page>
</template>
<script setup>
import Article from './Overview/Article.vue';
import Talk from './Overview/Talk.vue';
defineOptions({
  name: 'Overview',
  components: {
    Article,
    Talk,
  },
});
// 数据
const state = reactive({
  loading: true,
  currency: [],
  selected: {},
});
// 挂载
// 事件
const toChange = (v) => {};
// 计算属性
const mainStyle = computed(() => {
  return {
    height:
      window.global.config.options.pageHeight +
      window.global.config.page.header +
      'px',
  };
});
// 监听

// 卸载

// Map
</script>
<style lang="scss" scoped></style>
