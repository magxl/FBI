<template>
  <div class="SuperCampaign relative">
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
        v-for="(it, i) in state.campaignOptions"
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
  name: 'SuperCampaign',
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
    default: 'Campaign',
  },
});
const store = inject('store');
const common = store.common();
// 数据
const state = reactive({
  v: null,
  loading: true,
  campaignOptions: [],
  orgId: '',
  current: {},
  useModelValue: true,
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
      const has = state.campaignOptions.filter((ft) => ft.id === v)[0];
      if (has) {
        state.current = has;
        emit('update:campaignName', has.name);
      } else {
        emit('update:campaignName', '');
      }
    } else {
      state.current = {};
      emit('update:campaignName', '');
    }
  }
  emit('update:modelValue', state.v);
  emit('change', v);
};
const getName = () => {
  const { v } = state;
  const nameObj = {};
  if (v[0] === 'all') {
    state.campaignOptions.forEach((it) => {
      nameObj[it.id] = it.name;
    });
  } else if (prop.multiple) {
    state.v.forEach((it) => {
      const has = state.campaignOptions.filter((ft) => ft.id === it)[0];
      nameObj[it] = has.name;
    });
  } else {
    const has = state.campaignOptions.filter((ft) => ft.id === v)[0];
    nameObj = has.name;
  }
  emit('update:campaignName', nameObj);
  return nameObj;
};
const getValue = () => {
  if (state.v[0] === 'all') {
    return state.campaignOptions.map((it) => it.id);
  } else {
    return state.v;
  }
};
const clear = () => {
  emit('update:modelValue', prop.multiple ? [] : '');
  emit('clear');
};
const clearValue = () => {
  if (state.useModelValue) {
    state.v = prop.modelValue;
    state.useModelValue = false;
  } else {
    state.v = prop.multiple ? [] : '';
    state.current = {};
    state.campaignOptions = [];
    emit('update:modelValue', state.v);
  }
};

// 计算属性
const loading = computed(() => {
  return !state.campaignOptions?.length && state.loading && Boolean(prop.orgId);
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
// 监听
watchEffect(async () => {
  const checkOrg = orgId.value && orgId.value !== state.orgId;
  state.orgId = orgId.value;
  if (checkOrg) {
    // Org改变
    state.loading = true;
    // 置空
    clearValue();
    state.campaignOptions = await common.getCampaign(orgId.value);
    state.loading = false;
  } else {
    if (!orgId.value) {
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
