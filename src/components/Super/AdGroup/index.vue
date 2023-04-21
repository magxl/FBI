<template>
  <div class="SuperAdGroup relative">
    <div v-if="loading" class="selectLoadingIcon">
      <i class="adicon ad-loading el-icon is-loading"></i>
    </div>
    <el-select
      v-model="state.v"
      @change="change"
      @clear="toClear"
      class="wp100"
      filterable
      v-bind="$attrs"
      :multiple="multiple"
      :placeholder="placeholder"
      :loading="loading"
    >
      <template v-if="current.icon" #prefix>
        <i :class="current.icon" :title="current.status"></i>
      </template>
      <el-option v-if="multiple" label="All" value="all"></el-option>
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
import { watch } from 'vue';

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
const { proxy } = getCurrentInstance();
// 挂载

// 事件
const emit = defineEmits();
const initOptions = async () => {
  state.loading = true;
  state.v = prop.modelValue;
  state.current = {};
  state.adgroupOptions = [];
  state.adgroupOptions = await common.getAdGroup(orgId.value, campaignId.value);
  state.loading = false;
};
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
const toClear = () => {
  const v = multiple.value ? [] : '';
  state.v = v;
  emit('update:modelValue', v);
};
// 计算属性

const loading = computed(() => {
  return Boolean(
    !state.adgroupOptions?.length &&
      state.loading &&
      orgId.value &&
      campaignId.value,
  );
});

const multiple = computed(() => {
  return window.$getType(prop.modelValue) === 'Array';
});
const current = computed(() => {
  if (multiple.value) {
    return {};
  } else {
    const { data } = state.adgroupOptions.filter1((ft) => ft.id === state.v);
    return data || {};
  }
});
const placeholder = computed(() => {
  if (proxy.$attrs.placeholder === ' ') {
    return ' ';
  } else if (!proxy.$attrs.placeholder) {
    return window.$l('Ad Group');
  } else {
    return window.$l(proxy.$attrs.placeholder);
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
const idChange = computed(() => {
  if (orgId.value) {
    return `org${orgId.value}`;
  }
  if (campaignId.value) {
    return `campaign${orgId.value}`;
  }
  return false;
});
// 监听
watch(
  () => campaignId.value,
  (n, o) => {
    if ((n || n.length) && JSON.stringify(n) !== JSON.stringify(o)) {
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
