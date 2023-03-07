<template>
  <div class="RightAreaSov p8 pt0">
    <Card v-loading="state.loading">
      <template #header>
        <div class="flexMode vc">
          <span>SOV</span>
          <div class="flexMode vs h36 p0-16">
            <span class="border-r-gray3"></span>
          </div>
          <el-button plain type="primary" @click="toCreate">
            <template #icon>
              <i class="adicon ad-upload"></i>
            </template>
          </el-button>
        </div>
        <div class="flexMode vc">
          <div class="w240 pr8">
            <DatePicker
              v-model="state.search.date"
              shortcuts
              notoday
              disabled-date="5"
              placement="bottom"
            />
          </div>
          <div class="pr8">
            <el-select
              v-model="state.search.top"
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
      <div>
        <el-scrollbar>
          <div class="flexMode">
            <div
              class="flexMode flexV flexWrap p8 noShrink flexGrow"
              :style="sovStyle"
            >
              <div
                v-for="(it, i) in state.list"
                :key="it.id"
                class="mr8 mb16 radius4 hover-box-shadow-dark1 noShrink"
                style="width: 308px"
              >
                <div class="h32 p8 fs14 txt-dark7">
                  {{ state.search.top + i + 1 }}
                </div>
                <EChart height="200" width="300" :options="it.options" />
              </div>
            </div>
            <div class="pr8">&nbsp;</div>
          </div>
        </el-scrollbar>
      </div>
    </Card>
  </div>
</template>
<script setup>
// 定义
defineOptions({
  name: 'RightAreaSov',
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
    top: 10,
  },
});
const { proxy } = getCurrentInstance();
// 挂载

onMounted(() => {
  getData();
});
// 事件

const emit = defineEmits();

const toSearch = () => {
  getData();
};
const getData = async () => {
  state.loading = true;
  setTimeout(() => {
    state.loading = false;
    const x = window.$fd(7, (i) => {
      return window
        .$moment()
        .add(i - 7, 'days')
        .format('YYYY-MM-DD');
    });
    state.list = window.$fd(window.$rn(10), (i) => {
      const id = i + 1;
      return {
        id,
        options: {
          xAxis: {
            data: x,
          },
          yAxis: {},
          series: window.$fd(window.$rn(10), (o) => {
            return {
              type: 'line',
              smooth: true,
              data: window.$fd(7, (i) => {
                return window.$rn(10) * 10;
              }),
            };
          }),
        },
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
  console.info('SOV offset', top);
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
      tab: 'Sov',
    },
  });
};
// 计算属性
const sovStyle = computed(() => {
  return {
    height: '512px',
    width: Math.ceil(state.list.length / 2) * 316 + 'px',
  };
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

const rankLimitOptions = [
  {
    label: 'Top 0-10',
    value: 0,
  },
  {
    label: 'Top 10-20',
    value: 10,
  },
  {
    label: 'Top 20-30',
    value: 20,
  },
  {
    label: 'Top 30-40',
    value: 30,
  },
  {
    label: 'Top 40-50',
    value: 40,
  },
];
</script>
<style lang="scss" scoped></style>
