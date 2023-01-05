<template>
  <div class="Hourly p16 pt0">
    <Card>
      <template #header>
        <span>Hourly</span>
        <span class="fs12 txt-dark7">{{ time }} (UTC)</span>
      </template>
      <div class="h300">
        <Chart :options="state.options" />
      </div>
    </Card>
  </div>
</template>
<script setup>
defineOptions({
  name: 'Hourly',
});
// 传参
const prop = defineProps({
  currency: {
    type: Array,
    default: () => [],
  },
});
import { reactive } from 'vue';
// 数据
const state = reactive({
  options: {},
  options1: {},
  stamp: 0,
});

// 计算属性
const time = computed(() => {
  return window.$dayjs(new Date(state.stamp)).format('YYYY-MM-DD HH:mm:ss');
});
// 监听

// 挂载

onMounted(() => {
  initChart();
  timeCount();
});
// 事件
const initChart = () => {
  state.options = {
    grid: {
      top: 30,
      left: 100,
      right: 20,
      bottom: 30,
    },
    yAxis: {},
    xAxis: {
      type: 'category',
      data: window.$fakeData(72, (i) => {
        return i;
      }),
    },
    series: window.$fakeData(prop.currency.length, (i) => {
      const { label, value } = prop.currency[i];
      return {
        name: label,
        type: 'bar',
        stack: 'hourly',
        tooltip: {
          valueFormatter: (v) => value + v,
        },
        data: window.$fakeData(72, (j) =>
          (window.$randomNumber(99999999) / 100).toFixed(2),
        ),
      };
    }),
  };
};
// timer
state.stamp = +new Date();
const timeCount = () => {
  clearTimeout(state.timer);
  state.timer = setTimeout(() => {
    state.stamp += 1000;
    timeCount();
  }, 1000);
};
// 卸载
</script>
<style lang="scss" scoped></style>
