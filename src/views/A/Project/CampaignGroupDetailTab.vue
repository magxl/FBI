<template>
  <Page class="CampaignGroupDetailTab">
    <template #header>
      <div class="flexMode vc">
        <span>Campaign Group Detail Tab</span>
        <div class="flexMode vs h36 p0-16">
          <span class="border-r-gray3"></span>
        </div>
        <div class="pr8">
          <Org v-model="state.search.orgId" :clearable="false" />
        </div>
        <div v-show="showTimezone" class="pr8">
          <el-select v-model="state.search.timezone" placeholder=" ">
            <template v-if="state.search.timezone" #prefix>
              <span v-if="state.search.timezone > 0">+</span>
              <span>{{ state.search.timezone }}</span>
            </template>
            <el-option
              v-for="(it, i) in timezoneMap"
              :key="i"
              :label="it.label"
              :value="it.value"
            >
              <div class="flexMode vc">
                <div class="w24">
                  <span v-if="it.value > 0">+</span>
                  <span>{{ it.value }}</span>
                </div>
                <span class="pl8">{{ it.label }}</span>
              </div>
            </el-option>
          </el-select>
        </div>
        <div class="w240 pr8">
          <DatePicker v-model="state.search.date" shortcuts type="str" />
        </div>
        <div class="pr8">
          <el-button
            class="hoverBtn"
            :txt="$l('Search')"
            plain
            circle
            type="primary"
            @click="toSearch"
          >
            <template #icon>
              <i class="adicon ad-search1"></i>
            </template>
          </el-button>
        </div>
      </div>
    </template>
    <div v-loading="state.loading" :style="loadingStyle">
      <el-tabs v-model="state.active" class="pl16" @tab-change="tabChange">
        <el-tab-pane
          v-for="it in tabs"
          :key="it.value"
          :label="it.label"
          :name="it.value"
        ></el-tab-pane>
      </el-tabs>
      <div v-if="state.orginfo.id" class="cptArea">
        <keep-alive>
          <component
            :is="cpt"
            :search="state.search"
            :orginfo="state.orginfo"
            @set-tab="toSetTab"
          />
        </keep-alive>
      </div>
    </div>
  </Page>
</template>
<script setup>
import TabCampaign from './CampaignGroupDetailTab/Campaign.vue';
import TabAdGroup from './CampaignGroupDetailTab/AdGroup.vue';
import TabKeyword from './CampaignGroupDetailTab/Keyword.vue';
import TabSearchTerm from './CampaignGroupDetailTab/SearchTerm.vue';
import TabNegative from './CampaignGroupDetailTab/Negative.vue';
import TabAds from './CampaignGroupDetailTab/Ads.vue';
import TabSov from './CampaignGroupDetailTab/Sov.vue';
import { watchEffect } from 'vue';
// 定义
defineOptions({
  name: 'CampaignGroupDetailTab',
  components: {
    TabCampaign,
    TabAdGroup,
    TabKeyword,
    TabSearchTerm,
    TabNegative,
    TabAds,
    TabSov,
  },
});
// 传参
const prop = defineProps({
  orgId: {
    type: Number,
    default: 0,
  },
});
// 数据
const state = reactive({
  loading: true,
  active: 'Campaign',
  search: {},
  cptKey: 0,
  orginfo: {},
});
const store = inject('store');
const launch = store.launch();

// 挂载
onMounted(() => {
  getLocalTab();
});
onActivated(() => {
  getLocalTab();
});
// 事件
const getLocalTab = () => {
  // 激活，传参的tab
  const tab = localStorage.getItem('CampaignGroupDetailTab');
  if (tab) {
    state.active = tab;
    // 不保留缓存tab
    // localStorage.removeItem('CampaignGroupDetailTab');
  }
};
// org详情
const getData = async () => {
  state.loading = true;
  window.$promise(() => {
    state.orginfo = {
      id: state.search.orgId,
      name: 'Test Org Detail Tab',
      currency: window.$rn(2) ? '$' : '¥',
    };
    state.loading = false;
    console.info(state.orginfo);
  });
};
const toSearch = () => {
  console.table(state.search);
  state.cptKey++;
};
const tabChange = (v) => {
  console.info(v);
  localStorage.setItem('CampaignGroupDetailTab', v);
};
const toSetTab = (v) => {
  state.active = v;
};
// 计算属性
const loadingStyle = computed(() => {
  return {
    height: launch.options.pageHeight + 'px',
  };
});
const timezoneMap = computed(() => {
  return [{ label: 'UTC', value: 0 }, launch.localTimezone];
});
const timezoneLabel = computed(() => {
  return timezoneMap.value.filter((ft) => state.search.timezone === ft.value)[0]
    .label;
});
const cpt = computed(() => {
  return `Tab${state.active}`;
});
const showTimezone = computed(() => {
  return ['Campaign', 'AdGroup', 'Keyword'].indexOf(state.active) > -1;
});
// 监听
watchEffect(() => {
  state.search.timezone = timezoneMap.value[0].value;
});
watch(
  () => prop.orgId,
  (n) => {
    if (n) {
      state.search.orgId = Number(n);
      getData();
    }
  },
  {
    immediate: true,
  },
);
// 卸载

// Map
const tabs = [
  {
    label: $l('Campaign'),
    value: 'Campaign',
  },
  {
    label: $l('Ad Group'),
    value: 'AdGroup',
  },
  {
    label: $l('Keyword'),
    value: 'Keyword',
  },
  {
    label: $l('Search Term'),
    value: 'SearchTerm',
  },
  {
    label: $l('Negative'),
    value: 'Negative',
  },
  {
    label: $l('Ads'),
    value: 'Ads',
  },
  {
    label: $l('SOV'),
    value: 'Sov',
  },
];
</script>
<style lang="scss" scoped></style>
