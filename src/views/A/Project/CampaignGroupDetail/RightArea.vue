<template>
  <div class="PageAfter minw640" :style="rightStyle">
    <el-scrollbar @scroll="scrolling">
      <AdPlacementTotal
        ref="StatisticsRef"
        v-model="state.offsetTop.Statistics"
        :scroll-top="state.scrollTop"
        :page-offset="pageOffset"
        v-bind="$attrs"
        @loaded="cptLoaded"
      />
      <Campaign
        ref="CampaignRef"
        v-model="state.offsetTop.Campaign"
        :scroll-top="state.scrollTop"
        :page-offset="pageOffset"
        v-bind="$attrs"
        @loaded="cptLoaded"
      />
      <AdGroup
        ref="AdGroupRef"
        v-model="state.offsetTop.AdGroup"
        :scroll-top="state.scrollTop"
        :page-offset="pageOffset"
        v-bind="$attrs"
        @loaded="cptLoaded"
      />
      <Keyword
        ref="KeywordRef"
        v-model="state.offsetTop.Keyword"
        :scroll-top="state.scrollTop"
        :page-offset="pageOffset"
        v-bind="$attrs"
        @loaded="cptLoaded"
      />
      <SearchTerm
        ref="SearchTermRef"
        v-model="state.offsetTop.SearchTerm"
        :scroll-top="state.scrollTop"
        :page-offset="pageOffset"
        v-bind="$attrs"
        @loaded="cptLoaded"
      />
      <Ads
        ref="AdsRef"
        v-model="state.offsetTop.Ads"
        :scroll-top="state.scrollTop"
        :page-offset="pageOffset"
        v-bind="$attrs"
        @loaded="cptLoaded"
      />
      <Sov
        ref="SovRef"
        v-model="state.offsetTop.Sov"
        :scroll-top="state.scrollTop"
        :page-offset="pageOffset"
        v-bind="$attrs"
        @loaded="cptLoaded"
      />
      <div class="h240"></div>
    </el-scrollbar>
  </div>
</template>
<script setup>
import AdPlacementTotal from './RightArea/AdPlacementTotal.vue';
import Campaign from './RightArea/Campaign.vue';
import AdGroup from './RightArea/AdGroup.vue';
import Keyword from './RightArea/Keyword.vue';
import SearchTerm from './RightArea/SearchTerm.vue';
import Ads from './RightArea/Ads.vue';
import Sov from './RightArea/Sov.vue';
import { nextTick } from 'vue';
// 定义
defineOptions({
  name: 'CampaignGroupDetailRightArea',
  components: {
    AdPlacementTotal,
    Campaign,
    AdGroup,
    Keyword,
    SearchTerm,
    Ads,
    Sov,
  },
});
// 传参
const prop = defineProps({
  activeTab: {
    type: String,
    default: '',
  },
  tabs: {
    type: Array,
    default: () => [],
  },
});

// 数据
const state = reactive({
  loading: true,
  loadedCount: 0, // 子组件载入完成数量
  offsetTop: {
    Statistics: 0,
    Campaign: 0,
    AdGroup: 0,
    Keyword: 0,
    SearchTerm: 0,
    Ads: 0,
    Sov: 0,
  },
  scrollTop: 0,
});
const { proxy } = getCurrentInstance();
const store = inject('store');
const launch = store.launch();
// 挂载

// 事件
const emit = defineEmits();
const scrollIntoView = (it) => {
  proxy.$refs[`${it.value}Ref`].el.scrollIntoView({ behavior: 'smooth' });
};
const scrolling = ({ scrollTop }) => {
  let aim = {};
  state.scrollTop = scrollTop;
  try {
    offsetTopArr.value.forEach((it, i) => {
      if (it.value > scrollTop) {
        aim = offsetTopArr.value[i - 1];
        throw new Error();
      }
    });
  } catch (error) {}
  if (prop.activeTab !== aim.label) {
    emit('change-tab', aim.label);
  }
  // if (!aim.label) {
  //   const { label } = prop.tabs[prop.tabs.length - 1];
  //   if (prop.activeTab !== label) {
  //     emit('change-tab', label);
  //   }
  // }
};
const cptLoaded = () => {
  state.loadedCount++;
  if (state.loadedCount === Object.keys(state.offsetTop).length) {
    initOffsetTop();
  }
};
const initOffsetTop = () => {
  nextTick(() => {
    Object.keys(proxy.$refs).forEach((it) => {
      proxy.$refs[it].getOffsetTop();
    });
  });
};
// 计算属性
const rightStyle = computed(() => {
  return {
    height: launch.options.pageHeight + 'px',
  };
});
const offsetTopArr = computed(() => {
  return Object.keys(state.offsetTop).map((it) => {
    return {
      label: it,
      value: state.offsetTop[it],
    };
  });
});
const pageOffset = computed(() => {
  return (
    window.global.config.page.header +
    window.global.config.frame.header +
    window.global.config.page.paddingTop
  );
});
// 监听

// 卸载

defineExpose({
  scrollIntoView,
});
</script>
<style lang="scss" scoped></style>
