<template>
  <Page class="Overview" type="Static">
    <!-- <template v-if="state.mounted"> -->
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
    <!-- </template> -->
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
  currency: [],
  mounted: false,
});

// 计算属性

// 监听

// 挂载
onMounted(() => {
  nextTick(() => {
    state.mounted = true;
  });
});
// 事件
const initCurrency = () => {
  state.currency = [
    {
      label: 'USD',
      value: '$',
    },
    {
      label: 'RMB',
      value: '¥',
    },
  ];
};
initCurrency();
// 卸载
</script>
<style lang="scss" scoped></style>
