<template>
  <div class="OverviewAdPlacementPie pr16 pb16">
    <Card>
      <template #header>
        <span>{{$l('Ad Placement')}}</span>
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
      <div v-loading="state.loading">
        <EChart v-if="!state.loading" :options="state.options[state.active]" type="pie" width="33%" />
      </div>
    </Card>
  </div>
</template>
<script setup>
defineOptions({
  name: 'OverviewAdPlacementPie',
});
// 传参
const prop = defineProps({
  currency: {
    type: Array,
    default: () => [],
  },
});
// 数据
const state = reactive({
  loading: true,
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
  state.loading = true;

  const names = [
    'Today',
    'Tab',
    'Search Result',
    'Product Page'
  ];
  const len = names.length;
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
        radius: ['30%', '60%'],
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
