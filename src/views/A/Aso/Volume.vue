<template>
  <Page title="Volume" class="Volume">
    <div class="flexMode vc h48 p8-16 border-b">
      <div class="pr10">
        <Country v-model="state.search.country" type="ASO" />
      </div>
      <div class="flexMode vc pr10">
        <el-select v-model="state.search.days">
          <el-option
            v-for="(it, i) in daysMap"
            :key="i"
            :label="it[`label_${lang}`]"
            :value="it.value"
          />
        </el-select>
      </div>
      <div class="flexMode vc pr10">
        <SelectInput
          v-model="state.search.keywords"
          :limit="10"
          :placeholder="$l('Keyword: up to 10')"
        />
      </div>
      <div class="pr10">
        <el-button plain @click="toReset">
          <span>{{ $l('Reset') }}</span>
        </el-button>
      </div>
      <div class="pr10">
        <el-button plain type="primary" @click="toSearch">
          <template #icon>
            <i class="adicon ad-search1"></i>
          </template>
          <span>{{ $l('Search') }}</span>
        </el-button>
      </div>
    </div>
    <div v-loading="state.loading" class="chartArea">
      <History
        ref="history"
        :search="state.search"
        @search="(v) => toSearch(v, 'nosave')"
      />
      <div class="h400 border-t">
        <div v-if="state.prevLoad" class="emptyBg">
          <span class="fs64 txt-dark1">Chart Area</span>
        </div>
        <EChart
          v-else="!state.prevLoad"
          :options="state.options"
          height="400"
        />
      </div>
    </div>
  </Page>
</template>
<script setup>
import History from './Volume/History.vue';
defineOptions({
  name: 'Volume',
  components: { History },
});
// 数据
const state = reactive({
  loading: false,
  search: {
    days: 30,
    country: 'US',
    keywords: '',
  },
  osearch: {},
  keywordsMax: 10,
  keywordsCount: 0,
  options: {},
  prevLoad: true, // 图表载入前，有占位栅格
});
const { proxy } = getCurrentInstance();
const store = inject('store');
const launch = store.launch();
// 挂载

onMounted(() => {
  init();
});
// 事件
const init = () => {
  state.osearch = JSON.parse(JSON.stringify(state.search));
};
const toReset = () => {
  state.search = JSON.parse(JSON.stringify(state.osearch));
};
const keywordsInput = (v) => {
  if (v) {
    let arr = v.split(',');
    if (arr.length > state.keywordsMax) {
      arr = arr.slice(0, state.keywordsMax);
      state.search.keywords = arr.join(',');
    }
    state.keywordsCount = arr.length;
  } else {
    state.keywordsCount = 0;
  }
};

const toSearch = (v, type) => {
  if (type === 'nosave') {
    state.search = v;
  }
  fakeChart(type);
};
const fakeChart = (type) => {
  const { keywords, days } = state.search;
  if (!keywords) {
    proxy.$message.warning(window.$l('请输入关键词'));
    return;
  }
  if (type !== 'nosave') {
    saveHistory();
  }
  state.loading = true;
  state.prevLoad = false;
  const legend = keywords.split(',');
  state.options = {
    legend: {
      top: 10,
      left: 16,
      data: legend,
    },
    grid: {
      top: 80,
      bottom: 48,
    },
    xAxis: {
      type: 'category',
      data: window.$fd(days, (i) =>
        window
          .$moment()
          .add(i - days, 'day')
          .format('YYYY-MM-DD'),
      ),
    },
    yAxis: {},
    series: window.$fakeData(legend.length, (i) => {
      return {
        name: legend[i],
        type: 'line',
        smooth: true,
        symbol: 'none',
        data: window.$fakeData(days, (j) => window.$randomNumber(1000)),
      };
    }),
  };
  state.loading = false;
};
const saveHistory = () => {
  proxy.$refs.history.toAdd();
};
// 计算属性

const lang = computed(() => {
  return launch.lang;
});
// 监听

// 卸载

// map
const daysMap = [
  {
    label_en_us: 'Last 30 Days',
    label_zh_cn: '最近30天',
    value: 30,
  },
  {
    label_en_us: 'Last 60 Days',
    label_zh_cn: '最近60天',
    value: 60,
  },
  {
    label_en_us: 'Last 90 Days',
    label_zh_cn: '最近90天',
    value: 90,
  },
];
</script>
<style lang="scss" scoped>
.chartArea {
  height: calc(100vh - 48px - 56px - 56px);
}
</style>
