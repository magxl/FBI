<template>
  <div class="OverviewTotal">
    <div class="flexMode vs p16 pt0">
      <Card class="cardArea">
        <template #header>
          {{ $l('Spend') }}
        </template>
        <div class="relative">
          <EChart
            :options="state.spendOptions"
            type="pie"
            height="160"
            width="160"
            class="flexMode hc vc"
          />
          <div class="pb8">
            <div class="flexMode vc hb p4-16">
              <div class="dot8 bg-primary"></div>
              <div class="pl4 fs12 txt-dark5">
                <span>{{ state.spendOptions.series?.[0].data[0].symbol }}</span>
                <span>{{ state.spendOptions.series?.[0].data[0].format }}</span>
              </div>
            </div>
            <div class="flexMode vc hb p4-16">
              <div class="dot8 bg-orange"></div>
              <div class="pl4 fs12 txt-dark5">
                <span>{{ state.spendOptions.series?.[0].data[1].symbol }}</span>
                <span>{{ state.spendOptions.series?.[0].data[1].format }}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <!-- Spend -->
      <!-- org spend -->
      <Card class="otherArea ml16">
        <template #header>
          <div class="flexMode vc">
            <span>{{ $l('One Year') }}</span>
            <div class="pl8 w240">
              <DatePicker v-model="state.date" @change="dateChange" />
            </div>
          </div>
          <div class="flexMode vc txt-dark5 fs12">
            <div class="flexMode hc vc w48 p4 mr8 radius4 bg-dark1">
              <span class="txt-dark5">&lt;10K</span>
            </div>
            <div class="flexMode hc vc w48 p4 mr8 radius4 bg-dark5">
              <span class="txt-white">&lt;100K</span>
            </div>
            <div class="flexMode hc vc w48 p4 mr8 radius4 bg-primary">
              <span class="txt-white">&lt;1M</span>
            </div>
            <div class="flexMode hc vc w48 p4 mr8 radius4 bg-orange">
              <span class="txt-white">&lt;10M</span>
            </div>
            <div class="flexMode hc vc w48 p4 mr8 radius4 bg-red">
              <span class="txt-white">&gt;10M</span>
            </div>
          </div>
        </template>
        <EChart
          ref="yearChart"
          :options="state.options"
          height="200"
          width="100%"
          minus-width="216"
        />
      </Card>
      <Card class="w320 ml16 noShrink">
        <template #header>
          <span>{{ $l('Task Queue') }}</span>
          <span class="fs12 txt-dark5">Today</span>
        </template>
        <div class="h200 p8">
          <div
            v-for="it in state.taskList"
            :key="it.id"
            class="flexMode vc hb p8 fs12"
          >
            <span>{{ it.title }}</span>
            <span class="txt-dark5">{{ it.time }}</span>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>
<script setup>
// 定义
defineOptions({
  name: 'OverviewTotal',
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
  date: [],
  spendOptions: {},
  options: {},
  taskList: [],
});
const { proxy } = getCurrentInstance();

// 挂载
onMounted(() => {
  initOptions();
});
// 事件
const initOptions = () => {
  initSpend();
  initYearData();
  initTaskData();
};
const initSpend = () => {
  state.spendOptions = {
    legend: {
      show: false,
    },
    tooltip: {
      show: false,
    },
    series: [
      {
        name: 'Spend',
        type: 'pie',
        radius: ['54%', '64%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 5,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 12,
            fontWeight: 'bold',
            formatter: ({ name, value }) => {
              return `${window.$fa(value,2)}\n${name}`;
            },
          },
        },
        labelLine: {
          show: false,
        },
        data: window.$fd(2, (i) => {
          const value = (window.$rn(9999999999, 100) / 100).toFixed(2);
          return {
            name: prop.currency[i].label,
            symbol: prop.currency[i].value,
            value,
            format: window.$fa(value, 2),
          };
        }),
      },
    ],
  };
};
const initYearData = () => {
  const xdata = [];
  const ydata = [];
  const startValue = window.$moment().add(-30, 'days').format('YYYY-MM-DD');
  const endValue = window.$moment().add(-1, 'days').format('YYYY-MM-DD');
  state.date = [startValue, endValue];
  window.$fd(365, (i) => {
    xdata.push(
      window
        .$moment()
        .add(i - 365, 'days')
        .format('YYYY-MM-DD'),
    );
    ydata.push((window.$rn(999999999, 100) / 100).toFixed(2));
  });
  state.options = {
    grid: {
      left: 20,
      right: 50,
    },
    xAxis: {
      data: xdata,
    },
    yAxis: {
      axisLabel: {
        show: false,
      },
    },
    dataZoom: [
      {
        startValue,
      },
      {
        type: 'slider',
      },
    ],
    visualMap: {
      show: false,
      pieces: [
        {
          gt: 0,
          lte: 10000,
          color: '#999',
        },
        {
          gt: 10000,
          lte: 100000,
          color: '#555',
        },
        {
          gt: 100000,
          lte: 1000000,
          color: '#5f63f2',
        },
        {
          gt: 1000000,
          lte: 5000000,
          color: '#5f63f2',
        },
        {
          gt: 5000000,
          lte: 10000000,
          color: '#fa8b0c',
        },
        {
          gt: 10000000,
          color: '#ff4d4f',
        },
      ],
      outOfRange: {
        color: '#f0f0f0',
      },
    },
    series: {
      name: 'Spends All',
      type: 'line',
      data: ydata,
      markLine: {
        silent: true,
        data: [
          {
            yAxis: 10000000,
          },
          {
            yAxis: 5000000,
          },
          {
            yAxis: 1000000,
          },
          {
            yAxis: 100000,
          },
          {
            yAxis: 10000,
          },
        ],
      },
    },
  };
  const chart = proxy.$refs.yearChart.getChart();
  chart.on('datazoom', (v) => {
    const { start, end } = v;
    const startValue = window
      .$moment()
      .add(parseInt((365 * start) / 100) - 365, 'days')
      .format('YYYY-MM-DD');
    const endValue = window
      .$moment()
      .add(parseInt((365 * end) / 100) - 365 - 1, 'days')
      .format('YYYY-MM-DD');
    state.date = [startValue, endValue];
  });
};
const initTaskData = () => {
  state.taskList = window.$fd(window.$rn(10), (i) => {
    const id = window.$rn(888888, 111111);
    return {
      id,
      title: 'Task ' + id,
      time: window.$moment().add(i, 'h').format('HH:mm'),
    };
  });
};
const dateChange = (v) => {
  state.options.dataZoom = [
    {
      startValue: v[0],
      endValue: v[1],
    },
  ];
  proxy.$refs.yearChart.initChart();
};
// 计算属性

// 监听

// 卸载
</script>
<style lang="scss" scoped>
.cardArea {
  width: 160px;
}
.otherArea {
  width: calc(100% - 512px);
}
</style>
