<template>
  <div class="Recent">
    <Card>
      <template #header>
        <span>{{$l('Recent')}}</span>
        <div class="flexMode vc">
          <div
            v-for="(it, i) in state.tool"
            :key="i"
            class="p0-5 fs12 point"
            :class="state.active === it.value && 'txt-primary'"
            @click="toChange(it.value)"
          >
            {{ it.label }}
          </div>
        </div>
      </template>
      <div v-loading="state.loading">
        <EChart v-if="!state.loading" :options="state.options[state.active]" height="300" width="384" />
      </div>
    </Card>
  </div>
</template>
<script setup>
defineOptions({
  name: 'OverviewRecent',
});
import { reactive } from 'vue';
// 传参
const prop = defineProps({
  currency: {
    type: Array,
    default: () => [],
  },
});
// 数据
const state = reactive({
  loading: false,
  active: 'day',
  options: {
    day: {},
    week: {},
    month: {},
  },
  tool: [
    {
      label: 'Day',
      value: 'day',
    },
    {
      label: 'Week',
      value: 'week',
    },
    {
      label: 'Month',
      value: 'month',
    },
  ],
});

// 计算属性

// 监听

// 挂载
onMounted(() => {
  initChart();
});
// 事件
const initChart = () => {
  state.loading = true;
  let grid, series;
  switch (state.active) {
    case 'day':
    case 'week':
      grid = {
        top: 30,
        left: 80,
        right: 20,
        bottom: 30,
      };
      series = window.$fakeData(prop.currency.length, (i) => {
        return {
          name: prop.currency[i].label,
          type: 'line',
          smooth: true,
          symbol: 'none',
          areaStyle: {
            color: window.$linearColor(i),
          },
          data: window.$fakeData(7, (j) =>
            (window.$randomNumber(9999999) / 100).toFixed(2),
          ),
        };
      });
      break;
    case 'month':
      grid = {
        top: 30,
        left: 80,
        right: 20,
        bottom: 30,
      };
      series = window.$fakeData(prop.currency.length, (i) => {
        return {
          name: prop.currency[i].label,
          type: 'bar',
          stack: 'month',
          data: window.$fakeData(7, (j) =>
            (window.$randomNumber(9999999) / 100).toFixed(2),
          ),
        };
      });
      break;
  }
  state.options[state.active] = {
    grid,
    yAxis: {},
    xAxis: {
      type: 'category',
      data: window.$fakeData(7, (i) => i),
    },
    series,
  };
  state.loading = false;
};
const toChange = (v) => {
  state.active = v;
  if (state.options[v].series) {
    return;
  }
  initChart();
};
// 卸载
</script>
<style lang="scss" scoped></style>
