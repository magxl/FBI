<template>
  <div class="OverviewCampaignGroups p0-16 pb16">
    <Card>
      <template #header>
        <span>{{$l('Campaign Groups')}}</span>
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
        <EChart v-if="!state.loading" :options="state.options[state.active]" />
      </div>
    </Card>
  </div>
</template>
<script setup>
defineOptions({
  name: 'OverviewCampaignGroups',
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
      data: window.$fakeData(30, (i) => window.$m().add(i-30,'d').format('MM-DD')),
    },
    series: window.$fakeData(len, (i) => {
      return {
        name: names[i],
        type: 'bar',
        barMaxWidth: 24,
        stack: 'amount',
        data: window.$fakeData(30, (j) =>
          (window.$randomNumber(9999999) / 100).toFixed(2),
        ),
      };
    }),
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
