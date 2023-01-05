<template>
  <Page class="Overview" type="None">
    <Statistics :currency="state.currency" />
    <div class="flexMode">
      <Hourly :currency="state.currency" style="width: calc(100% - 400px)" />
      <Recent :currency="state.currency" class="pl16" style="width: 400px" />
    </div>
  </Page>
</template>
<script setup>
import Statistics from './Overview/Statistics.vue';
import Hourly from './Overview/Hourly.vue';
import Recent from './Overview/Recent.vue';
defineOptions({
  name: 'Overview',
  components: { Statistics, Hourly ,Recent},
});
// 数据
const state = reactive({
  currency: [],
});

// 计算属性

// 监听

// 挂载

// 事件
const initCurrency = () => {
  state.currency = [
    {
      label: 'USD',
      value: '$',
    },
    {
      label: 'RMB',
      value: '￥',
    },
  ];
};
initCurrency();
// 卸载
</script>
<style lang="scss" scoped>
[v-cloak] {
  display: none;
  color: #ce796c;
}
</style>
