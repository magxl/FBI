<template>
  <div class="EChart">
    <div ref="chart" :style="style" :id="state.chartID"></div>
  </div>
</template>
<script setup>
import { markRaw } from 'vue';

defineOptions({
  name: 'EChart',
});
const prop = defineProps({
  options: {
    type: Object,
    default: () => {},
  },
  type: {
    type: String,
    default: '',
  },
  height: {
    type: String,
    default: '300',
  },
  width: {
    type: String,
    default: '100%',
  },
  minusWidth: {
    type: String,
    default: '',
  },
});
const { proxy } = getCurrentInstance();
const store = inject('store');
const launch = store.launch();
const state = reactive({
  chart: {},
  chartID: '',
  defaultOptions: {
    grid: {
      top: 20,
      left: 50,
      right: 20,
      bottom: 40,
    },
    color: window.global.config.color,
    tooltip: {
      show: true,
      trigger: 'axis',
      animation: false,
      appendToBody: true,
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
    mounted: false,
  },
});

onBeforeMount(() => {
  state.chartID = `chart${+new Date()}${parseInt(Math.random() * 10000)}`;
});
onMounted(() => {
  state.mounted = true;
  state.chart = markRaw(window.$echarts.init(proxy.$refs.chart));
});
const initChart = async () => {
  setOptions();
};
const setOptions = () => {
  nextTick(() => {
    let options = window.$deepClone(prop.options);
    if (prop.type === 'pie') {
      options = { ...options, color: state.defaultOptions.color };
    } else {
      options = combineObject(state.defaultOptions, options);
    }
    state.chart.setOption(options);
  });
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
  return state.chart;
};
// 计算属性
const pageWidth = computed(() => {
  return launch.pageWidth;
});
const style = computed(() => {
  let width = prop.width;
  let minusWidth = parseInt(prop.minusWidth) || 0;
  if (width.indexOf('%') > -1) {
    width =
      parseInt((pageWidth.value * parseInt(width)) / 100) - minusWidth - 32;
  } else {
    width = parseInt(width) - minusWidth;
  }

  return {
    height: parseInt(prop.height) + 'px',
    width: width + 'px',
  };
});
const canInit = computed(() => {
  if (state.mounted && prop.options && Object.keys(prop.options).length) {
    return +new Date();
  } else {
    return false;
  }
});

// watch
watch(
  () => canInit.value,
  (n) => {
    if (n) {
      setOptions();
    }
  },
  {
    immediate: true,
    deep: true,
  },
);

defineExpose({
  getChart,
  initChart,
});
</script>
<style lang="scss" scoped>
.EChart {
  width: 100%;
}
</style>
