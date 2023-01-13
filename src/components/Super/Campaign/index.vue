<template>
  <div class="SuperCampaign">
    <el-select
      v-model="state.v"
      :multiple="multiple"
      clearable
      v-bind="$attrs"
      :filterable="filterable"
      collapse-tags
      collapse-tags-tooltip
      :placeholder="placeholder"
      @change="change"
      @clear="clear"
      class="wp100"
      :loading="state.loading"
    >
      <el-option
        v-for="(it, i) in state.campaignOptions"
        :key="i"
        :label="it.name"
        :value="it.id"
      />
    </el-select>
  </div>
</template>
<script setup>
defineOptions({
  name: 'SuperCampaign',
});
// 传参
const prop = defineProps({
  modelValue: {
    type: [Array, String, Number],
    default: '',
  },
  orgId: {
    type: [Number, String],
    default: '',
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  filterable: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: ' ',
  },
});
import { reactive } from 'vue';
const store = inject('store');
const common = store.common();
// 数据
const state = reactive({
  v: null,
  loading: true,
  campaignOptions: []
});

// 计算属性
// 监听
watch(
  () => prop.orgId,
  async (n) => {
    state.v = prop.multiple ? [] : '';
    if (n) {
      state.campaignOptions = await common.getCampaign(n);
      state.loading = false;
    } else {
      state.loading = true;
      state.campaignOptions = [];
    }
  },
  {
    immediate: true
  }
);
// 挂载
onMounted(() => {
  state.v = prop.modelValue;
});
// 事件
const emit = defineEmits();
const change = (v) => {
  emit('update:modelValue', v);
  emit('change', v);
};
const clear = () => {
  emit('update:modelValue', prop.multiple ? [] : '');
  emit('clear');
};
// 卸载
</script>
<style lang="scss" scoped></style>
