<template>
  <Page title="Charts" class="AppStoreCharts" noscroll>
    <div class="flexMode vc p16 border-b">
      <div class="pr8">
        <el-cascader
          v-model="state.search.type"
          :options="typeMap"
          :props="typeProps"
          collapse-tags
          size="small"
          :placeholder="$l('Category')"
        />
      </div>
      <div class="pr8">
        <Country v-model="state.search.country" type="Appstore" />
      </div>
      <div class="pr8">
        <Device v-model="state.search.device" :placeholder="$l('Device')" />
      </div>

      <div class="pr8">
        <el-button plain round @click="toReset">
          <span>{{ $l('Reset') }}</span>
        </el-button>
      </div>
      <div class="pr8">
        <el-button round plain type="primary" @click="toSearch">
          <template #icon>
            <i class="adicon ad-search1"></i>
          </template>
          <span>{{ $l('Search') }}</span>
        </el-button>
      </div>
    </div>
    <!-- ↑ Search ↑ -->
    <!-- ↓ app ↓ -->
    <div class="appArea relative">
      <el-scrollbar class="hp100">
        <div class="flexMode">
          <div v-for="(it, i) in state.types" :key="i" class="wp33 p8">
            <div class="Card">
              <div class="CardHeader sticky bg-white9 backdrop z9">
                <span>{{ columnMap[it][`label_${lang}`] }}</span>
              </div>
              <div class="CardBody">
                <div v-loading="state.apps[it].loading" class="minh320">
                  <div
                    v-for="(dt, d) in state.apps[it].list"
                    :key="d"
                    class="appItem flexMode p8 hover-box-shadow-dark1"
                    @click="toDetail(dt)"
                  >
                    <div class="relative">
                      <div
                        class="relative z2 flexMode hc vc w48 h48 radius4 noShrink"
                        :class="'bg-' + dt.color"
                      >
                        <span class="appIndex">{{ dt.index }}</span>
                        <span class="txt-dark1">IMG</span>
                      </div>
                      <div
                        class="hoverImg abs t l flexMode hc vc w48 h48 radius4 noShrink"
                        :class="'bg-' + dt.color"
                      >
                        <span class="txt-dark1">IMG</span>
                      </div>
                    </div>
                    <div
                      class="flexMode pl8 radius flexGrow"
                      style="width: calc(100% - 64px)"
                    >
                      <div class="flexGrow" style="width: calc(100% - 64px)">
                        <div class="titleArea txt-nowrap fs14 txt-dark7">
                          {{ dt.title }}
                        </div>
                        <div class="fs12 txt-dark3 pt16">
                          <span>{{ dt.category }}</span>
                          <span class="pl16">{{ dt.ranking }}</span>
                        </div>
                      </div>
                      <div class="flexMode hr w64 noShrink">
                        <el-tag v-if="it === 'paid'" type="warning" round>
                          {{ dt.price }}
                        </el-tag>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>
      <Drawer v-model:current="state.currentDrawer" :drawer="state.drawer" />
    </div>
  </Page>
</template>
<script setup>
import Detail from './Charts/Detail.vue';
defineOptions({
  name: 'AppStoreCharts',
});
// 数据
const state = reactive({
  search: {
    type: 36,
    country: 'US',
    device: 'IPHONE',
  },
  osearch: {},
  types: ['free', 'paid', 'grossing'],
  apps: {},
  currentDrawer: '',
  drawer: [
    {
      title: '',
      size: 1000,
      cpt: Detail,
    },
  ],
});
const store = inject('store');
const launch = store.launch();

// 挂载

onMounted(() => {
  state.osearch = JSON.parse(JSON.stringify(state.search));
});
// 事件
const toReset = () => {
  state.search = JSON.parse(JSON.stringify(state.osearch));
};
const getData = async (type) => {
  state.apps[type] = { loading: true };
  setTimeout(() => {
    const list = window.$fakeData(100, (i) => {
      const index = i + 1;
      return {
        type,
        index,
        title: 'Title' + index,
        category: 'Cagegory' + index,
        ranking: 'Ranking' + index,
        price:
          type === 'paid'
            ? (window.$randomNumber(99999, 10) / 100).toFixed(2)
            : 0,
        color: window.$randomColor(),
      };
    });
    state.apps[type] = { type, list };
  }, window.$randomNumber(3000, 200));
};
const toSearch = () => {
  state.types.forEach((it) => {
    state.apps[it] = {};
    getData(it);
  });
};
toSearch();
const toDetail = (info) => {
  state.drawer[0].title = window.$l('App Detail');
  state.drawer[0].params = { info };
  state.currentDrawer = 0;
};
// 计算属性
const typeMap = computed(() => {
  return window.$map.category;
});
const typeProps = computed(() => {
  return {
    label: `label_${launch.lang}`,
    // checkStrictly: true,
    emitPath: false,
    expandTrigger: 'hover',
  };
});
const lang = computed(() => {
  return launch.lang;
});
// 监听

// 卸载

// Map

const columnMap = {
  free: {
    label_en_us: 'Free',
    label_zh_cn: '免费',
  },
  paid: {
    label_en_us: 'Paid',
    label_zh_cn: '付费',
  },
  grossing: {
    label_en_us: 'Grossing',
    label_zh_cn: '总收入',
  },
};
</script>
<style lang="scss" scoped>
.appArea {
  height: calc(100% - 58px - 56px);
  .appItem {
    &:hover {
      .hoverImg {
        filter: blur(16px);
      }
    }
    .appIndex {
      position: absolute;
      top: 0;
      right: 0;
      width: 16px;
      height: 16px;
      text-align: center;
      border-radius: 8px;
      transform: translate(50%, -50%);
      background-color: $white9;
      box-shadow: 0 2px 4px $dark1;
      line-height: 16px;
      font-size: 12px;
      color: $dark7;
    }
  }
}
</style>
