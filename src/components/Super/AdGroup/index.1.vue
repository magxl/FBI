<template>
  <div class="SuperAdGroup relative">
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
      :loading="loading"
    >
      <template v-if="state.current.icon" #prefix>
        <i :class="state.current.icon" :title="state.current.status"></i>
      </template>
      <el-option v-if="prop.multiple" label="All" value="all"></el-option>
      <el-option
        v-for="(it, i) in state.adgroupOptions"
        :key="i"
        :label="it.name"
        :value="it.id"
      >
        <i :class="it.icon" :title="it.status"></i>
        <span class="pl4">{{ it.name }}</span>
      </el-option>
    </el-select>
  </div>
</template>
<script setup>
import { watchEffect } from 'vue';

defineOptions({
  name: 'SuperAdGroup',
});
// 传参
const prop = defineProps({
  modelValue: {
    type: [Array, String, Number],
    default: '',
  },
  defaultValue: {
    type: [Array, String, Number],
    default: '',
  },
  orgId: {
    type: [Number, String, Array],
    default: '',
  },
  campaignId: {
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
    default: 'Ad Group',
  },
});
const store = inject('store');
const common = store.common();
// 数据
const state = reactive({
  loading: true,
  v: null,
  adgroupOptions: [],
  current: {},
});

// 挂载

// 事件
const emit = defineEmits();
const change = (v) => {
  if (prop.multiple) {
    if (v[v.length - 1] === 'all') {
      state.v = ['all'];
    } else if (v[0] === 'all') {
      state.v = [v[1]];
    }
  } else {
    if (v) {
      const has = state.adgroupOptions.filter((ft) => ft.id === v)[0];
      if (has) {
        state.current = has;
        emit('update:adgroupName', has);
      } else {
        emit('update:adgroupName', '');
      }
    } else {
      state.current = {};
      emit('update:adgroupName', '');
    }
  }
  emit('update:modelValue', v);
  emit('change', v);
};
const getName = () => {
  const { v } = state;
  const nameObj = {};
  if (v[0] === 'all') {
    state.adgroupOptions.forEach((it) => {
      nameObj[it.id] = it.name;
    });
  } else if (prop.multiple) {
    state.v.forEach((it) => {
      const has = state.adgroupOptions.filter((ft) => ft.id === it)[0];
      nameObj[it] = has.name;
    });
  } else {
    const has = state.adgroupOptions.filter((ft) => ft.id === v)[0];
    nameObj = has ? has.name : '';
  }
  emit('update:adgroupName', nameObj);
  return nameObj;
};
const getValue = () => {
  if (state.v[0] === 'all') {
    return state.adgroupOptions.map((it) => it.id);
  } else {
    return state.v;
  }
};
const clear = () => {
  emit('update:modelValue', prop.multiple ? [] : '');
  emit('clear');
};
const clearValue = () => {
  state.v = prop.multiple ? [] : '';
  state.current = {};
  state.adgroupOptions = [];
  emit('update:modelValue', state.v);
};
// 计算属性
const loading = computed(() => {
  return Boolean(
    !state.adgroupOptions?.length &&
      state.loading &&
      prop.orgId &&
      prop.campaignId,
  );
});
const placeholder = computed(() => {
  if (prop.placeholder === ' ') {
    return ' ';
  } else {
    return window.$l(prop.placeholder);
  }
});
const orgId = computed(() => {
  const type = window.$getType(prop.orgId);
  if (type === 'Array') {
    return prop.orgId.join(',');
  } else {
    return prop.orgId;
  }
});
const campaignId = computed(() => {
  const type = window.$getType(prop.campaignId);
  if (type === 'Array') {
    return prop.campaignId.join(',');
  } else {
    return prop.campaignId;
  }
});
// 监听

watch(
  () => prop.defaultValue,
  (n) => {
    if (n) {
      state.v = n;
      change(n);
    }
  },
  {
    immediate: true,
  },
);
watchEffect(async () => {
  const checkOrg = orgId.value && orgId.value !== state.orgId;
  state.orgId = orgId.value;
  const checkCampaign =
    campaignId.value && campaignId.value !== state.campaignId;
  state.campaignId = campaignId.value;

  if (checkOrg || checkCampaign) {
    state.loading = true;
    clearValue();

    if (campaignId.value) {
      state.adgroupOptions = await common.getAdgroup(
        orgId.value,
        campaignId.value,
      );
    }
    state.loading = false;
  } else {
    if (!orgId.value || !campaignId.value) {
      clearValue();
    }
  }
});
defineExpose({
  getValue,
  getName,
});
// 卸载
</script>
<style lang="scss" scoped></style>
