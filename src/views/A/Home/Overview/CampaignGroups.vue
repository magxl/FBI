<template>
  <div class="CampaignGroups p0-16 pb16">
    <Card>
      <template #header>
        <span>CampaignGroups</span>
        <div class="flexMode vc">
          <div
            v-for="(it, i) in currency"
            :key="i"
            class="p0-5 fs12 point"
            :class="state.active === it.label && 'txt-primary'"
            @click="toChange(it.label)"
          >
            {{ it.label }}
          </div>
        </div>
      </template>
      <div class="h300">
        <EChart :options="state.options[state.active]" />
      </div>
    </Card>
  </div>
</template>
<script setup>
defineOptions({
  name: 'OverviewCampaignGroups',
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
  active: 'USD',
  options: {
    USD: {},
    RMB: {},
    JPY: {},
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
  state.active = prop.currency[0].label;
  initChart();
});
// 事件
const initChart = () => {
  const len = window.$randomNumber(20);
  const names = window.$fakeData(len, (i) => `name${i}`);
  state.options[state.active] = {
    legend: {
      data: names,
      top: 8,
      left: 16,
      itemWidth: 18,
      itemHeight: 12,
      padding: [2, 4],
    },
    grid: {
      left: 80,
      top: 60,
      right: 20,
      bottom: 30,
    },
    yAxis: {},
    xAxis: {
      type: 'category',
      data: window.$fakeData(30, (i) => `date${i}`),
    },
    series: window.$fakeData(len, (i) => {
      return {
        name: names[i],
        type: 'bar',
        stack: 'amount',
        data: window.$fakeData(30, (j) =>
          (window.$randomNumber(9999999) / 100).toFixed(2),
        ),
      };
    }),
  };
};
const toChange = (v) => {
  state.active = v;
  if(state.options[v].series){
    return;
  }
  initChart();
};
// 卸载
</script>
<style lang="scss" scoped></style>
