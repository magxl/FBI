<template>
  <div class="UpdateKeywordFilters">
    <el-descriptions border :column="1">
      <el-descriptions-item
        v-for="it in items"
        :key="it.value"
        :label="it.label"
        width="88px"
      >
        <div class="flexMode">
          <el-input-number
            v-model="state.filter[it.value + 'Min']"
            :min="0"
            controls-position="right"
            placeholder="Min"
          />
          <div class="p0-8">~</div>
          <el-input-number
            v-model="state.filter[it.value + 'Max']"
            :min="0"
            controls-position="right"
            placeholder="Max"
          />
          <div class="pl8">{{ it.append }}</div>
        </div>
      </el-descriptions-item>
    </el-descriptions>
    <div class="flexMode hr pt16">
      <el-button plain round @click="toReset">{{ $l('Reset') }}</el-button>
      <el-button plain round type="primary" @click="toConfirm">
        {{ $l('Confirm') }}
      </el-button>
    </div>
  </div>
</template>
<script setup>
// 定义
defineOptions({
  name: 'UpdateKeywordFilters',
});
// 传参
const prop = defineProps({
  currency: {
    type: String,
    default: '',
  },
});
// 数据
const state = reactive({
  filter: {},
});

// 挂载

// 事件
const emit = defineEmits();
const toReset = () => {
  state.filter = {};
  emit('reset');
};
const toConfirm = () => {
  emit('confirm', state.filter);
};
// 计算属性
const items = computed(() => {
  const { currency } = prop;
  return [
    {
      label: 'Impression',
      value: 'impression',
    },
    {
      label: 'Tap',
      value: 'tap',
    },
    {
      label: 'TTR',
      value: 'ttr',
      append: '%',
    },
    {
      label: 'CR',
      value: 'cr',
      append: '%',
    },
    {
      label: 'CPA',
      value: 'cpa',
      append: currency,
    },
    {
      label: 'CPT',
      value: 'cpt',
      append: currency,
    },
    {
      label: 'CPT Bid',
      value: 'cptBid',
      append: currency,
    },
  ];
});
// 监听

// 卸载
</script>
<style lang="scss" scoped></style>
