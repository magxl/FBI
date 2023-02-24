<template>
  <div class="RightAreaKeyword p8 pt0">
    <Card noshadow border="border-gray3">
      <template #header>
        <div class="flexMode vr">
          <span>{{ $l('Keyword') }}</span>
          <span class="pl8 fs12 txt-dark3">(UTC)</span>
        </div>
        <div class="flexMode vc">
          <div class="pr8">
            <el-radio-group v-model="state.type">
              <el-radio-button
                v-for="(it, i) in rateMap"
                :key="i"
                :label="it.value"
              >
                <span>{{ it.label }}</span>
              </el-radio-button>
            </el-radio-group>
          </div>
          <el-button plain round type="primary" @click="toViewAll">{{
            $l('View All')
          }}</el-button>
        </div>
      </template>
      <el-scrollbar>
        <div class="flexMode vs p8">
          <div
            v-for="it in state.list"
            :key="it.label"
            class="mr8 hover-box-shadow-dark1 noShrink radius4 border-littleGray"
          >
            <div class="p8 fs12 txt-dark5">{{ it.label }}</div>
            <el-table :data="it.data" height="360">
              <el-table-column
                label="ID"
                prop="id"
                width="100"
              ></el-table-column>
              <el-table-column
                :label="$l('Keyword')"
                prop="keyword"
                width="200"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                :label="$l('Yesterday')"
                prop="yesterday"
                width="100"
              ></el-table-column>
              <el-table-column
                :label="$l('Before Yesterday')"
                prop="beforeYesterday"
                width="120"
              ></el-table-column>
              <el-table-column :label="$l('Rate')" prop="rate" width="100">
                <template #default="{ row }">
                  <span v-if="row.rate > 0" class="txt-green"
                    >{{ row.rate }}%</span
                  >
                  <span v-else-if="row.rate < 0" class="txt-red"
                    >{{ row.rate }}%</span
                  >
                  <span v-else>-</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div>&nbsp;</div>
        </div>
      </el-scrollbar>
    </Card>
  </div>
</template>
<script setup>
// 定义
defineOptions({
  name: 'RightAreaKeyword',
});
// 传参
const prop = defineProps({
  scrollTop: {
    type: Number,
    default: 0,
  },
  pageOffset: {
    type: Number,
    default: 0,
  },
});
// 数据
const state = reactive({ loading: true, type: 0, list: [] });
const { proxy } = getCurrentInstance();
// 挂载
onMounted(() => {
  getData();
});
// 事件
const emit = defineEmits();
const getData = async () => {
  state.loading = true;
  setTimeout(() => {
    state.loading = false;
    const list = [];
    metricMap.value.forEach((it) => {
      const data = window.$fd(15, (i) => {
        const id = window.$rn(88888888, 11111111);
        return {
          id,
          keyword: 'Keyword ' + id,
          yesterday: window.$rn(100),
          beforeYesterday: window.$fa(
            (window.$rn(1000000, 100) / 100).toFixed(2),
            2,
          ),
          rate: (window.$rn(10000, -5000) / 100).toFixed(2),
        };
      });
      list.push({
        label: it[`label_${lang}`],
        data,
      });
    });
    state.list = list;
    loaded();
  }, window.$rn(3000, 200));
};
const loaded = () => {
  nextTick(() => {
    emit('loaded');
  });
};
const getOffsetTop = () => {
  let { top } = el.value.getBoundingClientRect();
  top = top + prop.scrollTop - prop.pageOffset;
  console.info('Keyword offset', top);
  emit('update:modelValue', top);
};
const router = useRouter();
const toViewAll = () => {
  router.push({
    name: 'A_CampaignGroupDetailTab',
    params: {
      orgId: prop.info.id,
    },
    query: {
      tab: 'Keyword',
    },
  });
};
// 计算属性
const metricMap = computed(() => {
  return window.$map.campaign.metric;
});
const el = computed(() => {
  return proxy.$el;
});
// 监听

// 卸载
defineExpose({
  el,
  getOffsetTop,
});
// Map

const lang = window.$getLang();

const rateMap = [
  {
    label: 'Rate By Yesterday',
    value: 0,
  },
  {
    label: 'Rate By Before Yesterday',
    value: 1,
  },
];
</script>
<style lang="scss" scoped></style>
