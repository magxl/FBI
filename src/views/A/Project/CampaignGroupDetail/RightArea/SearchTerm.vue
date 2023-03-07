<template>
  <div class="RightAreaSearchTerm p8 pt0">
    <Card noshadow border="border-gray3">
      <template #header>
        <span>{{ $l('Search Term') }}</span>
        <div class="flexMode vc">
          <div class="pr8">
            <el-select
              v-model="state.search.groupby"
              :placeholder="$l('Group By')"
              class="w200"
            >
              <el-option
                v-for="(it, i) in groupMap"
                :key="i"
                :label="it[`label_${lang}`]"
                :value="it.value"
              />
            </el-select>
          </div>
          <div class="pr8">
            <el-select
              v-model="state.search.limit"
              :placeholder="$l('Rank Limit')"
              class="w100"
            >
              <el-option
                v-for="(it, i) in rankLimitOptions"
                :key="i"
                :label="it.label"
                :value="it.value"
              />
            </el-select>
          </div>
          <div>
            <el-button plain type="primary" @click="toSearch">
              <template #icon>
                <i class="adicon ad-search1"></i>
              </template>
            </el-button>
            <el-button plain type="primary" @click="toViewAll">{{
              $l('View All')
            }}</el-button>
          </div>
        </div>
      </template>
      <div v-loading="state.loading" class="groupArea">
        <el-collapse v-model="state.collapse" @change="collapseChange">
          <el-collapse-item v-for="it in state.list" :name="it.id">
            <template #title>
              <div class="flexMode p0-8">
                <i
                  class="adicon"
                  :class="
                    state.collapse.indexOf(it.id) > -1 ? 'ad-minus' : 'ad-plus'
                  "
                ></i>
                <span class="pl4 fs12 txt-dark7">{{ it.name }}</span>
                <span class="pl8 fs12 txt-blue5">({{ it.data.length }})</span>
              </div>
            </template>
            <div class="p8 border-t">
              <div class="border-gray1 hover-box-shadow-dark1">
                <el-table :data="it.data">
                  <el-table-column
                    :label="$l('Keyword')"
                    prop="keyword"
                    width="200"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    :label="$l('Search Term')"
                    prop="searchTerm"
                    width="200"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column label="-"></el-table-column>
                </el-table>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </Card>
  </div>
</template>
<script setup>
// 定义
defineOptions({
  name: 'RightAreaSearchTerm',
});
// 传参
const prop = defineProps({
  info: {
    type: Object,
    default: () => {},
  },
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
const state = reactive({
  loading: true,
  list: [],
  search: {
    limit: 10,
    groupby: 0,
  },
  collapse: [],
});
const { proxy } = getCurrentInstance();
const store = inject('store');
const launch = store.launch();
// 挂载
onMounted(() => {
  getData();
});
// 事件
const emit = defineEmits();
const collapseChange = () => {};
const toSearch = () => {
  getData();
};
const getData = async () => {
  state.loading = true;
  setTimeout(() => {
    state.loading = false;
    state.list = window.$fd(state.search.limit, (i) => {
      const id = i + 1;
      return {
        id,
        name: 'Name ' + id,
        data: window.$fd(window.$rn(20), (d) => {
          const did = window.$rn(88888888, 11111111);
          return {
            keyword: 'Keyword ' + did,
            searchTerm: 'searchTerm ' + did,
          };
        }),
      };
    });
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
  console.info('SearchTerm offset', top);
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
      tab: 'SearchTerm',
    },
  });
};
// 计算属性
const lang = computed(() => {
  return launch.lang;
});
const currency = computed(() => {
  return prop.info?.currency || '';
});
const el = computed(() => {
  return proxy.$el;
});
const metricMap = computed(() => {
  return window.$map.campaign.metric.map((it) => {
    if (it.unit === 'currency') {
      it.symbol = currency.value;
    }
    return it;
  });
});
// 监听

// 卸载

defineExpose({
  el,
  getOffsetTop,
});
// Map
const rankLimitOptions = [
  {
    label: 'Top 10',
    value: 10,
  },
  {
    label: 'Top 20',
    value: 20,
  },
  {
    label: 'Top 50',
    value: 50,
  },
  {
    label: 'Top 100',
    value: 100,
  },
];
const groupMap = [
  {
    label_en_us: 'Group By Search Term',
    label_zh_cn: '按 Search Term 分组',
    value: 0,
  },
  {
    label_en_us: 'Group By Keyword',
    label_zh_cn: '按 Keyword 分组',
    value: 1,
  },
];
</script>
<style lang="scss" scoped>
.groupArea {
  height: 400px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
