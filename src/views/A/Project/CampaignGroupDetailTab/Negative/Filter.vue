<template>
  <div class="DetailTabNegativeFilter flexMode flexWrap w400">
    <div class="w400 pb8">
      <Campaign
        v-model="state.filter.campaignId"
        :org-id="orgId"
        placement="bottom-end"
        :placeholder="$l('Campaign')"
      />
    </div>
    <div class="w400 pb8">
      <AdGroup
        v-model="state.filter.adgroupId"
        :org-id="orgId"
        :campaign-id="state.filter.campaignId"
        placement="bottom-end"
        :placeholder="$l('Ad Group')"
      />
    </div>
    <div class="w400 pb8">
      <el-input
          ref="keywordInput"
          v-model="state.keyword"
          clearable
          :rows="8"
          resize="none"
          type="textarea"
          :placeholder="$l('Negative')"
        />
    </div>
    <div class="w400">
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
import { nextTick } from 'vue';

// 定义
defineOptions({
  name: 'DetailTabNegativeFilter',
});
// 传参
const prop = defineProps({
  orginfo: {
    type: Object,
    default: Object.create(null),
  },
  close: {
    type: Function,
    default: () => {},
  },
  campaignId: {
    type: Number,
    default: 0,
  },
  adgroupId: {
    type: Number,
    default: 0,
  },
});
// 数据
const state = reactive({
  mounted: false,
  mode: 0,
  filter: {},
  condition: {},
  keyword: '',
});
const { proxy } = getCurrentInstance();
// 挂载

// 事件
const emit = defineEmits();
const toSearch = () => {
  emit('filter', filter.value);
};

// 计算属性
const orgId = computed(() => {
  return prop.orginfo?.id || 0;
});

const filter = computed(() => {
  let filter = JSON.parse(JSON.stringify(state.filter));
  if (state.mode === 0) {
    filter = {
      ...filter,
      ...state.condition,
    };
  } else {
    filter.keyword = state.keyword;
  }
  return filter;
});
// 监听
watchEffect(() => {
  if (prop.campaignId) {
    state.filter.campaignId = prop.campaignId;
    state.filter.adgroupId = prop.adgroupId;
    console.info(prop.adgroupId);
  }
});
// 卸载

// Map

</script>
<style lang="scss" scoped></style>
