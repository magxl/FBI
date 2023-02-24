<template>
  <div class="OverviewStatistics">
    <el-scrollbar class="hp100">
      <div class="flexMode vs p16 pt0">
        <Card
          v-for="(it, i) in state.list"
          :key="i"
          :class="i !== state.list.length - 1 && 'mr16'"
          :style="state.minWidth"
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
              <div class="fs24 lh48 txt-dark9">
                {{ it.symbol }}{{ dt.value }}
              </div>
              <div class="flexMode vc fs14">
                <span :class="dt.compare1 > 0 ? 'txt-green' : 'txt-red'"
                  >{{ dt.compare1 }}%</span
                >
                <span class="p0-5 txt-dark3">|</span>
                <span :class="dt.compare2 > 0 ? 'txt-green' : 'txt-red'"
                  >{{ dt.compare2 }}%</span
                >
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
  minWidth: '',
});
const store = inject('store');
const launch = store.launch();
// 计算属性
const pageWidth = computed(() => {
  return launch.pageWidth;
});
// 监听

// 挂载
onMounted(() => {
  let minWidth = (pageWidth.value - prop.currency.length * 16 - 16) / 2;
  minWidth = minWidth < 512 ? 512 : minWidth;
  state.minWidth = `min-width:${minWidth}px;`;
});
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
}
</style>
