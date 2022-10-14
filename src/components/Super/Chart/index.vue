<template>
  <div ref="chart" :id="chartID" class="SuperChart"></div>
</template>
<script setup>
import * as echarts from 'echarts';
defineOptions({
  name: 'SuperChart',
});
const prop = defineProps({
  options: {
    type: Object,
    default: () => {},
  },
});
import { reactive, getCurrentInstance, onMounted, watch } from 'vue';
const { proxy } = getCurrentInstance();
const state = reactive({
  chart: null,
  chartID: '',
  defaultOptions: {
    grid: {
      top: 20,
      left: 50,
      right: 20,
      bottom: 40,
    },
    color: [
      'RGBA(86, 162, 253, 1)',
      'RGBA(96, 184, 112, 1)',
      'RGBA(240, 66, 52, 1)',
      'RGBA(255, 176, 45, 1)',
      'RGBA(112, 128, 145, 1)',
      'RGBA(143, 157, 241, 1)',
    ],
    tooltip: {
      show: true,
      trigger: 'axis',
      animation: false,
      backgroundColor: 'rgba(50,50,50,.9)',
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
          backgroundColor: 'rgba(240,240,240,0.9)',
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

onMounted(() => {
  initEcharts();
});

watch(
  () => prop.options,
  (n) => {
    if (n) {
      setOptions();
    }
  },
  {
    deep: true,
  },
);

let chart = null;
const initEcharts = async () => {
  chart = await echarts.init(proxy.$refs.chart);
  setOptions();
};
const setOptions = () => {
  let options = window.$deepClone(prop.options);
  options = combineObject(state.defaultOptions, options);
  chart.setOption(options);
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
