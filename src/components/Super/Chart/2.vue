<template>
  <div ref="chart" :id="chartID" class="SuperChart"></div>
</template>
<script setup>
import * as echarts from 'echarts';
defineOptions({
  name: 'SuperChart',
});
console.info('chart');
const prop = defineProps({
  options: {
    type: Object,
    default: () => {},
  },
  type: {
    type: String,
    default: '',
  },
});
import { reactive, getCurrentInstance, onMounted, watch } from 'vue';
const { proxy } = getCurrentInstance();
const state = reactive({
  chartID: '',
  defaultOptions: {
    grid: {
      top: 20,
      left: 50,
      right: 20,
      bottom: 40,
    },
    color: [
      '#5F63F2',
      '#409EFF',
      '#20C997',
      '#6CEC8E',
      '#35D5EB',
      '#39EBCB',
      '#619AEF',
      '#908EFE',
      '#7869D2',
      '#854CFF',
      '#AF73EC',
      '#CF47FF',
      '#6A717D',
    ],
    tooltip: {
      show: true,
      trigger: 'axis',
      className: 'backdrop',
      animation: false,
      backgroundColor: 'rgba(50,50,50,.7)',
      padding: [8, 16],
      borderWidth: 0,
      textStyle: {
        color: 'rgba(255,255,255,.9)',
        fontSize: 12,
      },
      axisPointer: {
        type: 'cross',
        label: {
          padding: [4, 8],
          color: 'rgba(0,0,0,0.5)',
          backgroundColor: 'rgba(240,240,240,0.7)',
        },
        lineStyle: {
          color: 'rgba(0,0,0,0.2)',
        },
        crossStyle: {
          color: 'rgba(0,0,0,0.2)',
        },
      },
    },
  },
});
state.chartID = `chart${+new Date()}${parseInt(Math.random() * 10000)}`;
let chart = null;

onMounted(() => {
  initEcharts();
});
const canInit = computed(() => {
  return state.chartID && Object.keys(prop.options).length;
});

watch(
  () => canInit.value,
  (n) => {
    console.info('watch', n);
    if (n) {
      setOptions(prop.options);
    }
  },
  {immediate: true}
);

const initEcharts = async () => {
  chart = await echarts.init(proxy.$refs.chart);
  // setOptions();
};

const resizeChart = () => {
  const size = {
    width: proxy.$el.clientWidth,
    height: proxy.$el.clientHeight,
  };
  chart.resize(size);
};
const setOptions = (option) => {
  console.info('setOptions', option);
  let options;
  if (prop.type === 'pie') {
    options = { ...option, color: state.defaultOptions.color };
  } else {
    options = combineObject(state.defaultOptions, option);
  }
  chart.setOption(options, true);
};

const combineObject = (aim, source) => {
  // 一级属性合并
  const all = { ...source, ...aim };
  const allKeys = Object.keys(all);
  allKeys.forEach((it) => {
    const type = window.$getType(all[it]);
    if (type === 'Array') {
      const aimIt = aim[it] || [];
      const sourceIt = source[it] || [];
      // 参数没有设定时，沿用默认设定，否则使用传入设定，不合并
      all[it] = aimIt.length && !sourceIt.length ? aimIt : sourceIt;
      // all[it] = combineArray(aimIt,sourceIt);
    } else if (type === 'Object') {
      const aimIt = aim[it] || {};
      const sourceIt = source[it] || {};
      all[it] = { ...aimIt, ...sourceIt };
    }
  });
  return all;
};

// 分类合并数据 为实现
const combineArray = (aim, source) => {
  source.forEach((it) => {
    const type = window.$getType(it);
    if (type === 'Object') {
      return combineObject(aim[it], source[it]);
    } else if (type === 'Array') {
      return combineArray(aim[it], source[it]);
    }
  });
};

// 调用chart实例

const getChart = () => {
  return chart;
};
defineExpose({
  getChart,
});
</script>
<style lang="scss" scoped>
.SuperChart {
  width: 100%;
  height: 100%;
  color: $blue;
}
</style>
