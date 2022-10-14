<template>
  <div class="ChartZoom wp50 p5">
    <div class="border-littleGray radius8 hover-box-shadow-blue1">
      <div class="p10 border-b-littleGray fs14">{{ $l('带缩放控件型图表') }}</div>
      <div class="h300">
        <Chart :options="state.options" />
      </div>
    </div>
  </div>
</template>
<script setup>
defineOptions({
  name: 'ChartZoom',
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
    grid: {
      bottom: 70,
    },
    dataZoom: [
      {
        type: 'slider',
        start: 80,
        end: 100,
      },
    ],
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
    color: ['RGBA(143, 157, 241, 1)','RGBA(255, 176, 45, 1)'],
    series: [
      {
        name: '区域颜色',
        type: 'line',
        smooth: true,
        symbol: 'none',
        areaStyle: {
          color: window.$linearColor(
            'RGBA(143, 157, 241, 1)',
            'RGBA(143, 157, 241, 0)',
          ),
        },
        lineStyle: {
          width: 0,
        },
        data: window.$fakeData(200, () => window.$randomNumber(10000)),
      },
      {
        name: '无线条无端点',
        type: 'line',
        smooth: true,
        symbol: 'none',
        areaStyle: {
          color: window.$linearColor('RGBA(255, 176, 45, 1)', 'RGBA(255, 176, 45, 0)'),
        },
        lineStyle: {
          width: 0,
        },
        data: window.$fakeData(200, () => window.$randomNumber(10000)),
      },
    ],
  };
};
initOptions();

// 卸载
</script>
<style lang="scss" scoped></style>
