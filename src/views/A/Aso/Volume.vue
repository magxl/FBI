<template>
  <Page title="Volume" class="Volume">
    <div class="flexMode vc p16 border-b">
      <div class="pr10">
        <Country v-model="state.search.regions" size="small" type="ASO" />
      </div>
      <div class="flexMode vc pr10">
        <el-select
          v-model="state.search.date"
          size="small"
        >
          <el-option
            v-for="(it, i) in dateMap"
            :key="i"
            :label="it[`label_${lang}`]"
            :value="it.value"
          />
        </el-select>
      </div>
      <div class="flexMode vc pr10">
        <el-input
          v-model="state.search.keywords"
          size="small"
          clearable
          :placeholder="$l('关键词：, 隔开')"
          @input="keywordsInput"
          @clear="keywordsClear"
          @keydown.enter="toSearch"
        >
          <template #suffix>
            <div class="fs12 lh22">
              <span :class="keywordsClass">{{ state.keywordsCount }}</span>
              <span>/{{ state.keywordsMax }}</span>
            </div>
          </template>
        </el-input>
      </div>
      <div class="pr10">
        <el-button plain round type="primary" size="small" @click="toSearch">
          <template #icon>
            <i class="adicon ad-search1"></i>
          </template>
          <span>{{$l('Search')}}</span>
        </el-button>
      </div>
    </div>
    <div v-loading="state.loading" class="chartArea">
      <div v-if="state.prevLoad" class="chartEmpty">
        <span class="fs64 txt-dark1">Chart Area</span>
      </div>
      <EChart v-else="!state.prevLoad" :options="state.options" />
    </div>
  </Page>
</template>
<script setup>
defineOptions({
  name: 'Volume',
});
// 数据
const state = reactive({
  loading: false,
  search: {
    date: 30,
    regions: 'US',
  },
  keywordsMax: 10,
  keywordsCount: 0,
  options: {},
  prevLoad: true, // 图表载入前，有占位栅格
});
const { proxy } = getCurrentInstance();
const store = inject('store');
const launch = store.launch();
// 计算属性

const countryLangMap = computed(() => {
  return window.$map.country.countryLang;
});
const dateMap = computed(() => {
  return [
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
});
const lang = computed(() => {
  return launch.lang
 });
// 监听

// 挂载

// 事件

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

const toSearch = () => {
  state.loading = true;
  state.prevLoad = false;
  console.info(state);
  fakeChart();
};
const fakeChart = () => {
  const { keywords, date } = state.search;
  if (!keywords) {
    proxy.$message.warning(window.$l('请输入关键词'));
    return;
  }
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
      data: window.$fakeData(date, (i) =>
        window
          .$moment()
          .add(i - date, 'day')
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
        data: window.$fakeData(30, (j) => window.$randomNumber(1000)),
      };
    }),
  };
  state.loading = false;
};
// 卸载
</script>
<style lang="scss" scoped>
.chartArea {
  height: calc(100vh - 58px - 56px - 56px - 16px);
}
</style>
