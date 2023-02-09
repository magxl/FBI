<template>
  <div class="SuperOrg">
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
        v-for="(it, i) in campaignGroup"
        :key="i"
        :label="it.name"
        :value="it.id"
      />
    </el-select>
  </div>
</template>
<script setup>
defineOptions({
  name: 'SuperOrg',
});
// 传参
const prop = defineProps({
  modelValue: {
    type: [Array, String, Number],
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
  permission: {
    type: [String, Number],
    default: -1,
  },
});
const store = inject('store');
const common = store.common();
// 数据
const state = reactive({
  v: null,
});

// 计算属性
const campaignGroup = computed(() => {
  const permission = parseInt(prop.permission);
  if (permission > -1) {
    return common.campaignGroup.filter((it) => it.permission > permission);
  } else {
    return common.campaignGroup;
  }
});
// 监听

// 挂载
onMounted(async () => {
  prop.modelValue && (state.v = prop.modelValue);
  await common.getCampaignGroup();
  state.loading = false;
});
// 事件
const emit = defineEmits();
const change = (v) => {
  emit('update:modelValue', v);
  const has = campaignGroup.value.filter((it) => it.id === v)[0];
  emit('update:currency', has ? has.currency : '');
  emit('change', v);
};
const clear = () => {
  // emit('update:modelValue', prop.multiple ? [] : '');
  emit('clear');
};
// 卸载
</script>
<style lang="scss" scoped></style>
