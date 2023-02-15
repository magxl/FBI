<template>
  <Page class="CampaignGroupDetail" noscroll>
    <template #header>
      <!-- <Org v-model="state.search.orgId" /> -->
      {{ prop.orgId }}
    </template>
    <div class="flexMode" :style="mainStyle">
      <LeftArea />
      <RightArea />
    </div>
  </Page>
</template>
<script setup>
import LeftArea from './CampaignGroupDetail/LeftArea.vue';
import RightArea from './CampaignGroupDetail/RightArea.vue';
// 定义
defineOptions({
  name: 'CampaignGroupDetail',
  components: { LeftArea, RightArea },
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
  orgName: 0,
  search: {},
  active: null,
});
const { proxy } = getCurrentInstance();
const route = useRoute();
// 挂载
onMounted(() => {
  state.search.orgId = prop.orgId;
});
// 事件
// 计算属性
const mainStyle = computed(() => {
  return {
    height: `calc(100vh - ${
      window.global.config.frame.header +
      window.global.config.page.paddingTop +
      window.global.config.page.paddingBottom +
      window.global.config.page.header +
      36
    }px)`,
  };
});
// 监听

// 卸载
</script>
<style lang="scss" scoped></style>
