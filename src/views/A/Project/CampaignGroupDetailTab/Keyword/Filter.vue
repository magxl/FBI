<template>
  <div class="DetailTabKeywordFilter flexMode flexWrap w400">
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
      <el-radio-group v-model="state.mode" @change="modeChange">
        <el-radio-button
          v-for="(it, i) in radioOptions"
          :key="i"
          :label="it.value"
        >
          <span>{{ it[`label_${lang}`] }}</span>
        </el-radio-button>
      </el-radio-group>
    </div>
    <div v-if="state.mode === 0" class="w400 pb8">
      <div class="p8 fs12 bg-littleGray border-dark1-dashed">
        <div v-for="it in metricMap" :key="it.label" class="flexMode vc pb8">
          <div class="w100 noShrink">{{ it[`label_${lang}`] }}</div>
          <div class="flexMode vc flexGrow">
            <el-input-number
              v-model="state.condition[`${it.value}_min`]"
              :min="0"
              controls-position="right"
              placeholder="≤"
            />
            <span class="p0-8 txt-dark3">~</span>
            <el-input-number
              v-model="state.condition[`${it.value}_max`]"
              :min="0"
              controls-position="right"
              placeholder="≥"
            />
            <span v-if="it.unit === '%'" class="p0-8 txt-dark3"> % </span>
            <span v-else-if="it.unit === 'currency'" class="p0-8 txt-dark3">
              {{ currency }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="w400 pb8">
      <div class="p8 bg-littleGray border-dark1-dashed">
        <el-input
          ref="keywordInput"
          v-model="state.keyword"
          clearable
          :rows="8"
          resize="none"
          type="textarea"
          placeholder=" "
        />
      </div>
    </div>
    <div class="w400">
      <el-button
        plain
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
  name: 'DetailTabKeywordFilter',
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
// onMounted(() => {
//   state.filter = prop.filter;
// });
// onActivated(() => {
//   state.filter = prop.filter;
//   console.info(prop.filter);
// });
// 事件
const emit = defineEmits();
const toSearch = () => {
  emit('filter', filter.value);
};
const modeChange = (v) => {
  if (v === 1) {
    nextTick(() => {
      proxy.$refs.keywordInput.focus();
    });
  }
};
// 计算属性
const orgId = computed(() => {
  return prop.orginfo?.id || 0;
});
const currency = computed(() => {
  return prop.orginfo?.currency || '';
});
const lang = computed(() => {
  return window.$getLang();
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
const radioOptions = [
  {
    label: 'Condition',
    label_en_us: 'Condition',
    label_zh_cn: '按条件',
    value: 0,
  },
  {
    label: 'Find Keyword',
    label_en_us: 'Find Keyword',
    label_zh_cn: '关键字',
    value: 1,
  },
];
const metricMap = window.$map.campaign.metric.map((it) => {
  it.value = it.label.toLowerCase();
  return it;
});
</script>
<style lang="scss" scoped></style>
