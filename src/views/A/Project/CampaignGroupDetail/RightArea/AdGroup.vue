<template>
  <div class="RightAreaAdGroup p8 pt0">
    <Card noshadow border="border-gray3">
      <template #header>
        <div class="flexMode vc">
          <span>{{ $l('Ad Group') }}</span>
          <div class="flexMode vs h36 p0-16">
            <span class="border-r-gray3"></span>
          </div>
          <el-button plain type="primary" circle @click="toCreate">
            <template #icon>
              <i class="adicon ad-plus"></i>
            </template>
          </el-button>
        </div>
        <div class="flexMode vc">
          <div class="pr8">
            <el-select
              v-model="state.search.metric"
              :placeholder="$l('Metric')"
              class="w100"
            >
              <el-option
                v-for="(it, i) in metricMap"
                :key="i"
                :label="it[`label_${lang}`]"
                :value="it.label"
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
            <el-button plain circle type="primary" @click="toSearch">
              <template #icon>
                <i class="adicon ad-search1"></i>
              </template>
            </el-button>
            <el-button plain round type="primary" @click="toViewAll">{{
              $l('View All')
            }}</el-button>
          </div>
        </div>
      </template>
      <div class="flexMode vs">
        <div class="statisticsArea flexMode flexWrap hb noShrink p8 pb0">
          <div
            v-for="(it, i) in state.statistics"
            :key="i"
            class="flexMode flexV vc hc w120 h64 mb8 radius4 bg-littleGray border-white7 hover-box-shadow-primary1"
            :class="
              state.color[it.label] && `color ${state.color[it.label]}Item`
            "
            @contextmenu="(e) => toShowMenu(e, it)"
          >
            <div>
              <span v-if="it.unit==='currency'" class="txt-dark5">{{ currency }}</span>
              <span>{{ it.value }}</span>
              <span v-if="it.unit==='%'" class="txt-dark5">%</span>
            </div>
            <div class="pt8 fs12 txt-dark5 txt-c">
              {{ it.label }}
            </div>
          </div>
        </div>
        <!-- statistics -->
        <!-- table top charts -->
        <div class="tableArea border-l">
          <el-table
            v-loading="state.loading"
            :data="state.list"
            height="296"
          >
            <el-table-column
              :label="$l('Ad Group')"
              prop="adgroupName"
              width="200"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column label="-"></el-table-column>
          </el-table>
        </div>
      </div>
    </Card>
  </div>
</template>
<script setup>
// 定义
defineOptions({
  name: 'RightAreaAdGroup',
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
  statistics: [],
  color: {}, // 自定义颜色信息
  list: [],
  search: {
    limit: 10,
    metric: 'Spends',
  },
});
const { proxy } = getCurrentInstance();
const store = inject('store');
const launch = store.launch();
// 挂载
onMounted(() => {
  initColor();
  getStatistics();
  getData();
});
// 事件
const emit = defineEmits();
const initColor = () => {
  const color = JSON.parse(localStorage.getItem('projectAdGroupColor')) || {};
  state.color = color;
};
const getStatistics = () => {
  state.statistics = window.$fd(metricMap.value.length, (i) => {
    const { unit } = metricMap.value[i];
    let value;
    if (unit === '%') {
      value = window.$fa((window.$rn(10000, 100) / 100).toFixed(2), 2);
    } else if (unit === 'currency') {
      value = window.$fa((window.$rn(99999999, 100) / 100).toFixed(2), 2);
    } else {
      value = window.$fa(window.$rn(99999999));
    }
    return {
      label: metricMap.value[i][`label_${lang.value}`],
      value,
      unit,
    };
  });
};
const toShowMenu = (el, it) => {
  el.preventDefault();
  const colors = ['primary', 'red', 'green', 'orange', 'purple', 'pink'];
  const list = colors.map((c) => {
    return {
      label: window.$l('Set Color -> ' + c),
      icon: 'dot',
      iconColor: c,
      value: c,
      cb: () => {
        setColor(it, c);
      },
    };
  });
  list.push({
    label: window.$l('Set Color -> default'),
    icon: 'dot',
    iconColor: 'dark3',
    value: 'dark3',
    cb: () => {
      clearColor(it);
    },
  });
  launch.saveContextMenu({
    el,
    visible: true,
    list,
  });
};
const setColor = (it, v) => {
  const { color } = state;
  color[it.label] = v;
  localStorage.setItem('projectAdGroupColor', JSON.stringify(color));
};
const clearColor = (it) => {
  const { color } = state;
  delete color[it.label];
  localStorage.setItem('projectAdGroupColor', JSON.stringify(color));
};
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
        adgroupName: 'Name ' + id,
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
  console.info('AdGroup offset', top);
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
      tab: 'AdGroup',
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

</script>
<style lang="scss" scoped>
.statisticsArea {
  width: 264px;
  .color {
    color: $white9 !important;
    .txt-dark5 {
      color: $white5;
    }
  }
  .primaryItem {
    background-color: $primary !important;
  }
  .redItem {
    background-color: $red !important;
  }
  .greenItem {
    background-color: $green !important;
  }
  .orangeItem {
    background-color: $orange !important;
  }
  .purpleItem {
    background-color: $purple !important;
  }
  .pinkItem {
    background-color: $pink !important;
  }
}
.tableArea {
  width: calc(100% - 264px);
}
</style>
