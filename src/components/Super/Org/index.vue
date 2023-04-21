<template>
  <div class="SuperOrg relative">
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
      :loading="state.loading"
    >
      <template v-if="current.icon" #prefix>
        <i :class="current.icon" :title="current.tips"></i>
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
  filterable: {
    type: Boolean,
    default: false,
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
  campaignGroupOptions: [],
});
const { proxy } = getCurrentInstance();
// 挂载

// 事件
const emit = defineEmits();
const initOptions = async () => {
  state.loading = true;
  const list =  await common.getCampaignGroup();
  state.campaignGroupOptions = list;

  state.loading = false;
};
initOptions();
const change = (v) => {
  console.info(v);
  if (multiple.value) {
    if (v[v.length - 1] === 'all') {
      state.v = ['all'];
    } else if (v[0] === 'all') {
      state.v = [v[1]];
    }
  } else {
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
    state.campaignGroupOptions.forEach((it) => {
      obj[it.id] = it.name;
      arr.push(it.name);
    });
  } else {
    v.forEach((it) => {
      const { data } = state.campaignGroupOptions.filter1((ft) => ft.id === it);
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
const campaignGroup = computed(() => {
  const permission = parseInt(prop.permission);
  if (permission > -1) {
    return state.campaignGroupOptions.filter(
      (it) => it.permission > permission,
    );
  } else {
    return state.campaignGroupOptions;
  }
});
const loading = computed(() => {
  return !state.campaignGroup?.length && state.loading;
});
const multiple = computed(() => {
  return window.$getType(prop.modelValue) === 'Array';
});
const placeholder = computed(() => {
  if (proxy.$attrs.placeholder === ' ') {
    return ' ';
  } else if (!proxy.$attrs.placeholder) {
    return window.$l('Campaign Group');
  } else {
    return window.$l(proxy.$attrs.placeholder);
  }
});
const current = computed(() => {
  if (multiple.value) {
    return {};
  } else {
    if (campaignGroup.value.length) {
      const { data } = campaignGroup.value.filter1((ft) => ft.id === state.v);
      return data || {};
    } else {
      return {};
    }
  }
});
// 监听
watch(
  () => prop.modelValue,
  (n, o) => {
    if (n && n !== o) {
      state.v = n;
    } else if (!n && o) {
      toClear();
    }
  },
  {
    immediate: true,
  },
);
// 卸载
defineExpose({
  getName,
});
</script>
<style lang="scss" scoped></style>
