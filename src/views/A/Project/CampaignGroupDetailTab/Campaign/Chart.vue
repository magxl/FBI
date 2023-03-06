<template>
  <div class="DetailTabCampaignChart relative">
    <div class="hourlyArea">
      <el-checkbox
        v-model="state.hourly"
        :label="$l('Hourly')"
        class="hover-a"
        :disabled="disabled"
        @change="toChangeHourly"
      />
    </div>
    <EChart :options="state.options" height="360" width="100%" />
  </div>
</template>
<script setup>
import { watchEffect } from 'vue';

// 定义
defineOptions({
  name: 'DetailTabCampaignChart',
});
// 传参
const prop = defineProps({
  search: {
    type: Object,
    default: () => {},
  },
});
// 数据
const state = reactive({
  options: {},
  hourly: false,
  days: 0,
  mounted: false,
});

// 挂载
onMounted(() => {
  state.mounted = true;
});
// 事件
const metricMap = window.$map.campaign.metric;
const toChangeHourly = (v) => {
  initOptions();
};
const initOptions = () => {
  const { days, hourly } = state;
  if (hourly) {
    // 小时数据
    if (days > 7) {
      // 天数太多，还是只展示天数据
      initDayOptions();
    } else {
      initHourlyOptions();
    }
  } else {
    initDayOptions();
  }
};
const initDayOptions = () => {
  const { days } = state;
  const legend = metricMap.map((it) => it[`label_${lang.value}`]);
  state.options = {
    legend: {
      left: 80,
      data: legend,
    },
    grid: {
      top: 60,
      left: 80,
    },
    xAxis: {
      type: 'category',
      data: window.$fd(days, (i) => {
        return window
          .$moment()
          .add(i - days, 'd')
          .format('ddd MM-DD');
      }),
    },
    yAxis: {},
    series: window.$fd(legend.length, (i) => {
      return {
        name: legend[i],
        type: window.$rn(2) ? 'line' : 'bar',
        smooth: true,
        data: window.$fd(days, (i) => window.$rn(9999999, 100).toFixed(2)),
      };
    }),
  };
};
const initHourlyOptions = () => {
  const { days } = state;
  const hours = days * 24;
  const x = window.$fd(hours, (i) => {
    return window.$m().add(i - hours, 'h').format('ddd MM-DD hh:mm');
  });

  const legend = metricMap.map((it) => it[`label_${lang.value}`]);
  state.options = {
    legend: {
      left: 80,
      data: legend,
    },
    grid: {
      top: 60,
      left: 80,
    },
    xAxis: {
      type: 'category',
      data: x,
    },
    yAxis: {},
    series: window.$fd(legend.length, (i) => {
      return {
        name: legend[i],
        type: window.$rn(2) ? 'line' : 'bar',
        smooth: true,
        symbol: 'none',
        data: window.$fd(hours, (i) => window.$rn(9999999, 100).toFixed(2)),
      };
    }),
  };
};
// 计算属性
const lang = computed(() => {
  return window.$getLang();
});
const disabled = computed(() => {
  return state.days > 7;
});

// 监听
watchEffect(() => {
  const { date } = prop.search;
  if (date) {
    const dateArr = date.split('~');
    const startDate = window.$moment(dateArr[0]);
    const endDate = window.$moment(dateArr[1]);
    const days = endDate.diff(startDate) / 86400000 + 1;
    state.days = days;
    if (state.mounted) {
      initOptions();
    }
  }
});
// 卸载

// Map
</script>
<style lang="scss" scoped>
.hourlyArea {
  position: absolute;
  left: 16px;
  z-index: 2;
}
</style>
