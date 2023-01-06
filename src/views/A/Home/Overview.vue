<template>
  <Page class="Overview" type="None">

    <Statistics :currency="state.currency" />
    <div class="flexMode">
      <Hourly :currency="state.currency" style="width: calc(100% - 400px)" />
      <Recent :currency="state.currency" class="pr16" style="width: 400px" />
    </div>
    <CampaignGroups :currency="state.currency" />
    <div class="flexMode">
      <Countrys :currency="state.currency" class="wp50" />
    </div>
  </Page>
</template>
<script setup>
import Statistics from './Overview/Statistics.vue';
import Hourly from './Overview/Hourly.vue';
import Recent from './Overview/Recent.vue';
import CampaignGroups from './Overview/CampaignGroups.vue';
import Countrys from './Overview/Countrys.vue';
defineOptions({
  name: 'Overview',
  components: { Statistics, Hourly, Recent, CampaignGroups,Countrys },
});
// 数据
const state = reactive({
  currency: [],
});

// 计算属性

// 监听

// 挂载
onMounted(() => {
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
      value: '￥',
    },
  ];
};
initCurrency();
// 卸载
</script>
<style lang="scss" scoped>
</style>
