<template>
  <div class="OverviewStatistics">
    <el-scrollbar class="hp100">
      <div class="flexMode vs p16 pt0">
        <Card
          v-for="(it, i) in state.list"
          :key="i"
          :class="i !== state.list.length - 1 && 'mr16'"
          :style="minWidth"
        >
          <template #header>
            <div class="flexMode vr">
              <span>{{ it.title }}</span>
              <span class="pl8 fs12 txt-dark3">(UTC)</span>
            </div>
          </template>
          <div class="flexMode ha p16">
            <div v-for="(dt, d) in it.data" :key="d" class="p0-8">
              <div class="txt-dark5 fs14">{{ $l(dt.name) }}</div>
              <div
                class="lh48 txt-dark9"
                :class="dt.value.length > 10 ? 'fs18' : 'fs24'"
              >
                {{ it.symbol }}{{ dt.value }}
              </div>
              <div class="compareArea flexMode vc fs14">
                <div
                  class="relative"
                  :class="dt.compare1 > 0 ? 'txt-green' : 'txt-red'"
                >
                  <i class="adicon ad-up"></i>
                  <span>{{ dt.compare1 }}%</span>
                </div>
                <span class="p0-5 txt-dark3">|</span>
                <div
                  class="relative"
                  :class="dt.compare2 > 0 ? 'txt-green' : 'txt-red'"
                >
                  <span>{{ dt.compare2 }}%</span>
                  <i class="adicon ad-up"></i>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </el-scrollbar>
  </div>
</template>
<script setup>
defineOptions({
  name: 'OverviewStatistics',
});
// 传参
const prop = defineProps({
  currency: {
    type: Array,
    default: () => [],
  },
});
const { proxy } = getCurrentInstance();
// 数据
const state = reactive({
  list: [],
});
const store = inject('store');
const launch = store.launch();
// 计算属性
const pageWidth = computed(() => {
  return launch.pageWidth;
});
const minWidth = computed(() => {
  let r = (pageWidth.value - prop.currency.length * 16 - 16) / 2;
  r = r < 512 ? 512 : r;
  return `min-width:${r}px;`;
});
// 监听

// 挂载
// 事件
const fakeData = () => {
  const daysName = ['今日', '本周', '本月'];
  state.list = window.$fakeData(prop.currency.length, (i) => {
    const { label, value } = prop.currency[i];
    return {
      title: label,
      symbol: value,
      data: window.$fakeData(3, (j) => {
        return {
          name: daysName[j],
          value: window.$fa(
            (window.$randomNumber(999999999) / 100).toFixed(2),
            2,
          ),
          compare1: (window.$randomNumber(10000, -5000) / 100).toFixed(2),
          compare2: (window.$randomNumber(10000, -5000) / 100).toFixed(2),
        };
      }),
    };
  });
};
fakeData();
// 卸载
</script>
<style lang="scss" scoped>
.OverviewStatistics {
  height: 178px;
  .compareArea {
    .adicon {
      position: absolute;
      left: 50%;
      font-size: 12px;
      transform: translate(-50%, 0);
    }
    .txt-red {
      .adicon {
        display: inline-block;
        transform: translate(-50%, 10px) rotate(180deg);
      }
    }
    .txt-green {
      .adicon{
        transform: translate(-50%, -6px);
      }
    }
  }
}
</style>
