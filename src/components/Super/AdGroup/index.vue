<template>
  <div class="SuperAdGroup">
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
      :loading="loading"
    >
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
  orgId: {
    type: [Number, String],
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
    const has = state.adgroupOptions.filter((ft) => ft.id === v)[0];

    emit('update:adgroupName', has ? has.name : '');
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
  // emit('update:adgroupName', nameObj);
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
// 计算属性
const loading = computed(() => {
  return state.adgroupOptions.length && state.loading;
});
const placeholder = computed(() => {
  if(prop.placeholder===' '){
    return ' ';
  }else{
    return window.$l(prop.placeholder)
  }
});
// 监听
// watch(
//   () => prop.orgId,
//   (n) => {
//     state.v = prop.multiple ? [] : '';
//     state.loading = true;
//   },
//   {
//     immediate: true,
//   },
// );
watchEffect(async () => {
  if (prop.campaignId) {
    state.adgroupOptions = await common.getAdgroup(prop.orgId, prop.campaignId);
    state.loading = false;
  } else {
    state.loading = true;
    state.adgroupOptions = [];
  }
  if (prop.modelValue) {
    state.v = prop.modelValue;
  }
});
defineExpose({
  getValue,
  getName,
});
// 卸载
</script>
<style lang="scss" scoped></style>
