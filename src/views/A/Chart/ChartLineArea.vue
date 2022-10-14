<template>
  <div class="ChartLineArea wp50 p5">
    <div class="border-littleGray radius8 hover-box-shadow-blue1">
      <div class="p10 border-b-littleGray fs14">{{ $l('区域型图表') }}</div>
      <div class="h300">
        <Chart :options="state.options" />
      </div>
    </div>
  </div>
</template>
<script setup>
defineOptions({
  name: 'ChartLineArea',
});
import { reactive } from 'vue';
// 数据
const state = reactive({
  options: {}
});

// 计算属性

// 监听

// 挂载

// 事件
const initOptions = () => {
  state.options = {
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: window.$fakeData(20, () => window.$randomNumber(100)),
        axisLine: {
          lineStyle: {
            color: 'rgba(0,0,0,0.5)',
          },
        },
      },
    ],
    yAxis: {},
    series: [
      {
        name: '区域颜色',
        type: 'line',
        smooth: true,
        areaStyle: {
          color: window.$linearColor(),
        },
        data: window.$fakeData(20, () => window.$randomNumber(100)),
      },
      {
        name: '无线条无端点',
        type: 'line',
        smooth: true,
        symbol: 'none',
        areaStyle: {
          color: window.$linearColor('RGBA(96, 184, 112, 1)', 'RGBA(96, 184, 112, 0)'),
        },
        lineStyle: {
          width: 0,
        },
        data: window.$fakeData(20, () => window.$randomNumber(100)),
      },
    ],
  };
};
initOptions();

// 卸载
</script>
<style lang="scss" scoped></style>
