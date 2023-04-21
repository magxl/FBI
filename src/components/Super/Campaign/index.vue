<template>
  <div class="SuperCampaign relative">
    <div v-if="loading" class="selectLoadingIcon">
      <i class="adicon ad-loading el-icon is-loading"></i>
    </div>
    <el-select
      v-model="state.v"
      @change="change"
      @clear="clear"
      class="wp100"
      filterable
      v-bind="$attrs"
      :placeholder="placeholder"
      :multiple="multiple"
      :loading="loading"
    >
      <template v-if="current.icon" #prefix>
        <i :class="current.icon" :title="current.status"></i>
      </template>
      <el-option v-if="multiple" label="All" value="all"></el-option>
      <el-option v-for="(it, i) in state.campaignOptions" :key="i" :label="it.name" :value="it.id">
        <i :class="it.icon" :title="it.status"></i>
        <span class="pl4">{{ it.name }}</span>
      </el-option>
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
  defaultValue: {
    type: [Array, String, Number],
    default: '',
  },
  orgId: {
    type: [Number, String, Array],
    default: '',
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
const { proxy } = getCurrentInstance();
// 挂载

// 事件
const emit = defineEmits();
const initOptions = async () => {
  state.loading = true;
  state.v = prop.modelValue;
  state.current = {};
  state.campaignOptions = [];
  state.campaignOptions = await common.getCampaign(orgId.value);
  state.loading = false;
};
const change = (v) => {
  if (multiple.value) {
    if (v[v.length - 1] === 'all') {
      state.v = ['all'];
    } else if (v[0] === 'all') {
      state.v = [v[1]];
    }
  } else {
    if (v) {
      const { data } = state.campaignOptions.filter1((ft) => ft.id === v);
      if (data) {
        emit('update:campaignName', data.name);
      } else {
        emit('update:campaignName', '');
      }
    }
  }
  emit('update:modelValue', v);
};
const toClear = () => {
  const v = multiple.value ? [] : '';
  state.v = v;
  emit('update:modelValue', v);
};
const getName = () => {
  let v = multiple.value ? state.v : [state.v];
  const obj = {};
  const arr = [];
  if (v[0] === 'all') {
    state.campaignOptions.forEach((it) => {
      obj[it.id] = it.name;
      arr.push(it.name);
    });
  } else {
    v.forEach((it) => {
      const { data } = state.campaignOptions.filter1((ft) => ft.id === it);
      if (data) {
        obj[data.id] = data.name;
        arr.push(data.name);
      } else {
        obj[data.id] = '';
        arr.push('');
      }
    });
  }
  return {
    obj,
    arr,
  };
};
const getValue = () => {
  let v = multiple.value ? state.v : [state.v];
  // 为all时，一定是多选
  if (v[0] !== 'all') {
    return state.v;
  } else {
    return state.campaignOptions.map((it) => it.id);
  }
};
// 计算属性
const loading = computed(() => {
  return !state.campaignOptions?.length && state.loading && Boolean(prop.orgId);
});
const multiple = computed(() => {
  return window.$getType(prop.modelValue) === 'Array';
});
const current = computed(() => {
  if (multiple.value) {
    return {};
  } else {
    const { data } = state.campaignOptions.filter1((ft) => ft.id === state.v);
    return data || {};
  }
});
const placeholder = computed(() => {
  if (proxy.$attrs.placeholder === ' ') {
    return ' ';
  } else if (!proxy.$attrs.placeholder) {
    return window.$l('Campaign');
  } else {
    return window.$l(proxy.$attrs.placeholder);
  }
});
const orgId = computed(() => {
  if (window.$getType(prop.orgId) === 'Array') {
    return prop.orgId.join(',');
  } else {
    return prop.orgId;
  }
});
// 监听
watch(
  () => orgId.value,
  (n, o) => {
    if (n && n !== o) {
      initOptions();
    } else if (!n && o) {
      toClear();
    }
  },
  {
    immediate: true,
  },
);
watch(
  () => prop.modelValue,
  (n, o) => {
    if (!n && o) {
      toClear();
    }
  },
);
defineExpose({
  getValue,
  getName,
});
// 卸载
</script>
<style lang="scss" scoped></style>
