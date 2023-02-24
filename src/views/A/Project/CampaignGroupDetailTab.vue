<template>
  <Page class="CampaignGroupDetailTab">
    <template #header>
      <div class="flexMode vc">
        <span>Campaign Group Detail Tab</span>
        <div class="flexMode vs h36 p0-16">
          <span class="border-r-gray3"></span>
        </div>
        <div class="pr8">
          <Org v-model="state.search.orgId" />
        </div>
        <div class="pr8">
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
            class="searchBtn"
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
    <div class="p0-16">
      <el-tabs v-model="state.active">
        <el-tab-pane
          v-for="it in tabs"
          :key="it.value"
          :label="it.label"
          :name="it.value"
        ></el-tab-pane>
      </el-tabs>
      <div class="cptArea">
        <keep-alive>
          <component :is="cpt" />
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
import TabAds from './CampaignGroupDetailTab/Ads.vue';
import TabSov from './CampaignGroupDetailTab/Sov.vue';
// 定义
defineOptions({
  name: 'CampaignGroupDetailTab',
  components: {
    TabCampaign,
    TabAdGroup,
    TabKeyword,
    TabSearchTerm,
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
  active: 'Campaign',
  search: {},
});
const store = inject('store');
const launch = store.launch();
const route = useRoute();
// 挂载
onMounted(() => {});
// 事件
const getData = () => {
  console.info(prop.orgId);
};
// 计算属性
const canInit = computed(() => {
  return prop.orgId && route.query.tab ? +new Date() : '';
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
// 监听
watch(
  () => canInit.value,
  (n) => {
    if (n) {
      state.active = route.query.tab;
      state.search.orgId = Number(prop.orgId);
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
