<template>
  <div class="DetailTabCampaignFilter flexMode flexWrap w400">
    <div class="w400 pb8">
      <Campaign
        v-model="state.filter.campaignId"
        :org-id="orgId"
        placement="bottom-end"
        :placeholder="$l('Campaign')"
      />
    </div>
    <div class="pb8 mr8">
      <el-select
        v-model="state.filter.status"
        clearable
        :placeholder="$l('Status')"
        class="w196"
        @blur="(e) => e.stopPropagation"
      >
        <el-option
          v-for="(it, i) in statusOptions"
          :key="i"
          :label="it.label"
          :value="it.value"
        />
      </el-select>
    </div>
    <div class="w196 pb8">
      <el-select
        v-model="state.filter.adplacement"
        clearable
        :placeholder="$l('Ad Placement')"
        class="w196"
      >
        <el-option
          v-for="(it, i) in adplacementOptions"
          :key="i"
          :label="it.label"
          :value="it.value"
        />
      </el-select>
    </div>
    <div class="pb8 mr8">
      <Country v-model="state.filter.country" type="aso" class="w196" />
    </div>
    <div class="flexMode">
      <el-button
        plain
        circle
        type="primary"
        @click="toSearch"
        class="hoverBtn"
        :txt="$l('Search')"
      >
        <template #icon>
          <i class="adicon ad-search1"></i>
        </template>
      </el-button>
    </div>
  </div>
</template>
<script setup>
// 定义
defineOptions({
  name: 'DetailTabCampaignFilter',
});
// 传参
const prop = defineProps({
  orginfo: {
    type: Object,
    default: Object.create(null),
  },
  orgId: {
    type: Number,
    default: 0,
  },
  close: {
    type: Function,
    default: () => {},
  },
  filter: {
    type: Object,
    default:Object.create(null),
  }
});
// 数据
const state = reactive({
  mounted: false,
  filter: {},
});

// 挂载

// 事件
const emit = defineEmits();
const toSearch = () => {
  emit('filter', state.filter);
};
// 计算属性

const orgId = computed(() => {
  return prop.orginfo?.id || 0;
});
const currency = computed(() => {
  return prop.orginfo?.currency || '';
});

// 监听

watchEffect(()=>{
  if (state.mounted) {
    return;
  }
  state.filter = prop.filter;
  state.mounted = true;
})
// 卸载

// Map
const statusOptions = [
  {
    label: 'All',
    label_en_us: 'All',
    label_zh_cn: '全部',
    value: 0,
  },
  {
    label: 'Running',
    label_en_us: 'Running',
    label_zh_cn: '运行',
    value: 1,
  },
  {
    label: 'On Hold',
    label_en_us: 'On Hold',
    label_zh_cn: '待机',
    value: 2,
  },
  {
    label: 'Paused',
    label_en_us: 'Paused',
    label_zh_cn: '暂停',
    value: 3,
  },
  {
    label: 'Removed',
    label_en_us: 'Removed',
    label_zh_cn: '删除',
    value: 4,
  },
];
const adplacementOptions = window.$map.campaign.adplacement;
</script>
<style lang="scss" scoped></style>
