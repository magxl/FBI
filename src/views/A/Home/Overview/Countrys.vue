<template>
  <div class="Countrys pl16 pr8 pb16">
    <Card>
      <template #header>
        <span>Countrys</span>
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
  name: 'OverviewCountrys',
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
  const len = window.$randomNumber(10);
  const names = window.$fakeData(len, (i) => `Country${i}`);
  state.options[state.active] = {
    legend: {
      show: false,
    },
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        type: 'pie',
        top: 0,
        radius: '60%',
        itemStyle: {
          borderRadius: 4,
        },
        data: window.$fakeData(len, (j) => {
          return {
            name: names[j],
            value: (window.$randomNumber(10000) / 100).toFixed(2),
          };
        }),
        tooltip: {
          valueFormatter: (v) => v + '%',
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.2)',
          },
        },
      },
    ],
  };
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
