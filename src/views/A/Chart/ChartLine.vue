<template>
  <div class="ChartLine wp50 p5">
    <div class="border-littleGray radius8 hover-box-shadow-blue1">
      <div class="p10 border-b-littleGray fs14">{{ $l('线型图表') }}</div>
      <div class="h300">
        <Chart :options="state.options" />
      </div>
    </div>
  </div>
</template>
<script setup>
defineOptions({
  name: 'ChartLine',
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
        data: window.$fakeData(7, () => window.$randomNumber(100)),
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
        name: '普通',
        type: 'line',
        data: window.$fakeData(7, () => window.$randomNumber(100)),
      },
      {
        name: '无端点标识',
        type: 'line',
        symbol: 'none',
        data: window.$fakeData(7, () => window.$randomNumber(100)),
      },
      {
        name: '平滑',
        type: 'line',
        symbol: 'none',
        smooth: true,
        data: window.$fakeData(7, () => window.$randomNumber(100)),
      },
    ],
  };
};
initOptions();

// 卸载
</script>
<style lang="scss" scoped></style>
