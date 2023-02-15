<template>
  <div class="CampaignGroupDetailRightArea">
    <AdPlacementTotal />
  </div>
</template>
<script setup>
import AdPlacementTotal from './RightArea/AdPlacementTotal.vue';
// 定义
defineOptions({
  name: 'CampaignGroupDetailRightArea',
  components: { AdPlacementTotal },
});
// 数据
const state = reactive({});

// 挂载

// 事件

// 计算属性

// 监听

// 卸载
</script>
<style lang="scss" scoped>
.CampaignGroupDetailRightArea {
  width: calc(100% - 200px);
}
</style>
