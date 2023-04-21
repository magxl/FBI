<template>
  <div class="SuperOrg relative">
    <div v-if="loading" class="selectLoadingIcon">
      <i class="adicon ad-loading el-icon is-loading"></i>
    </div>
    <el-select
      v-model="state.v"
      :multiple="multiple"
      filterable
      clearable
      :filterable="filterable"
      collapse-tags
      collapse-tags-tooltip
      :placeholder="placeholder"
      @change="change"
      @clear="clear"
      class="wp100"
      v-bind="$attrs"
      :loading="state.loading"
    >
      <template v-if="state.current.icon" #prefix>
        <i :class="state.current.icon" :title="state.current.tips"></i>
      </template>
      <el-option
        v-for="(it, i) in campaignGroup"
        :key="i"
        :label="it.name"
        :value="it.id"
      >
        <i :class="it.icon" :title="it.tips"></i>
        <span class="pl4">{{ it.name }}</span>
      </el-option>
    </el-select>
  </div>
</template>
<script setup>
import { watchEffect } from 'vue';

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
    default: 'Campaign Group',
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
  orgId: '',
  campaignId: '',
  current: {},
});

// 挂载

// 事件
const emit = defineEmits();
const change = (v) => {
  if (!prop.multiple) {
    if (v) {
      const has = campaignGroup.value.filter1((ft) => ft.id === v).data;
      if (has) {
        state.current = has;
        emit('update:currency', has.currency);
        emit('update:orgName', has.name);
      }
    } else {
      state.current = {};
      emit('update:currency', '');
      emit('update:orgName', '');
    }
  }
  emit('update:modelValue', v);
  emit('change', v);
};
const clear = () => {
  emit('clear');
};
const getName = () => {
  const nameObj = {};
  const v = prop.multiple ? state.v : [state.v];
  v.forEach((it) => {
    const has = state.campaignGroup.filter((ft) => ft.id === it)[0];
    nameObj[it] = has.name;
  });
  emit('update:orgName', nameObj);
  return nameObj;
};

// 计算属性
const campaignGroup = computed(() => {
  const permission = parseInt(prop.permission);
  if (permission > -1) {
    return common.campaignGroup.filter((it) => it.permission > permission);
  } else {
    return common.campaignGroup;
  }
});
const loading = computed(() => {
  return !state.campaignGroup?.length && state.loading;
});
const placeholder = computed(() => {
  if (prop.placeholder === ' ') {
    return ' ';
  } else {
    return window.$l(prop.placeholder);
  }
});
// 监听
watch(
  () => prop.modelValue,
  (n, o) => {
    if (n && n !== o) {
      state.v = n;
      change(n);
    }
  },
  {
    immediate: true,
  },
);
watchEffect(async () => {
  state.loading = true;
  await common.getCampaignGroup();
  state.loading = false;
});
// 卸载
defineExpose({
  getName,
});
</script>
<style lang="scss" scoped></style>
