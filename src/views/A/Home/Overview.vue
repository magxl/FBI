<template>
  <Page v-loading="state.loading" class="Overview" type="Static">
    <template v-if="state.currency.length">
      <div class="pt16"></div>
      <div class="wp100">
        <Total :currency="state.currency" />
      </div>
      <div class="wp100">
        <Statistics :currency="state.currency" />
      </div>
      <div class="flexMode wp100">
        <div style="width: calc(100% - 400px)">
          <Hourly :currency="state.currency" />
        </div>
        <div class="w400">
          <Recent :currency="state.currency" class="pr16" />
        </div>
      </div>
      <div class="wp100">
        <CampaignGroups :currency="state.currency" />
      </div>
      <div class="wp100">
        <AdPlacement :currency="state.currency" />
      </div>
      <div class="flexMode">
        <div class="wp33">
          <Countrys :currency="state.currency" />
        </div>
        <div class="wp33">
          <Apps :currency="state.currency" />
        </div>
        <div class="wp33">
          <AdPlacementPie :currency="state.currency" />
        </div>
      </div>
    </template>
    <div v-else-if="state.loading === false" class="absCenter">
      <Nodata />
    </div>
  </Page>
</template>
<script setup>
import Total from './Overview/Total.vue';
import Statistics from './Overview/Statistics.vue';
import Hourly from './Overview/Hourly.vue';
import Recent from './Overview/Recent.vue';
import CampaignGroups from './Overview/CampaignGroups.vue';
import AdPlacement from './Overview/AdPlacement.vue';
import Countrys from './Overview/Countrys.vue';
import Apps from './Overview/Apps.vue';
import AdPlacementPie from './Overview/AdPlacementPie.vue';
defineOptions({
  name: 'Overview',
  components: {
    Total,
    Statistics,
    Hourly,
    Recent,
    CampaignGroups,
    AdPlacement,
    Countrys,
    Apps,
    AdPlacementPie,
  },
});
// 数据
const state = reactive({
  loading: true,
  currency: [],
});
// 挂载
onMounted(() => {
  initCurrency();
});
// 事件
const initCurrency = () => {
  window.$promise(() => {
    state.currency = window.$fd(
      window.$rn(currencyMap.length, 1),
      (i) => currencyMap[i],
    );
    state.loading = false;
    console.info(state.currency);
  });
};

// 计算属性

// 监听

// 卸载

// Map
const currencyMap = [
  {
    label: 'USD',
    value: '$',
  },
  {
    label: 'RMB',
    value: '¥',
  },
];
</script>
<style lang="scss" scoped></style>
