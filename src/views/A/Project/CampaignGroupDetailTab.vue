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
          <el-button class="searchBtn" :txt="$l('Search')" plain circle type="primary" @click="toSearch">
            <template #icon>
              <i class="adicon ad-search1"></i>
            </template>
          </el-button>
        </div>
      </div>
    </template>
  </Page>
</template>
<script setup>
// 定义
defineOptions({
  name: 'CampaignGroupDetailTab',
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
</script>
<style lang="scss" scoped></style>
