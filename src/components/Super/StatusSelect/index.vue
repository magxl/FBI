<template>
  <div class="SuperStatusSelect">
    <el-select
      v-model="state.v"
      collapse-tags
      collapse-tags-tooltip
      v-bind="$attrs"
      :placeholder="placeholder"
      :multiple="multiple"
      @change="change"
    >
      <template v-if="state.v && !multiple" #prefix>
        <StatusItem :status="state.v" :label="false" :lang="lang" />
      </template>
      <el-option v-if="multiple" label="All" value="all"></el-option>
      <el-option v-for="it in options" :key="it" :label="statusMap[it][`label_${lang}`]" :value="it">
        <StatusItem :status="it" :lang="lang" />
      </el-option>
    </el-select>
  </div>
</template>
<script setup>
import { watchEffect } from 'vue';

// 定义
defineOptions({
  name: 'SuperStatusSelect',
});
// 传参
const prop = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: '',
  },
});
// 数据
const state = reactive({
  v: '',
});

// 挂载

// 事件
const emit = defineEmits();
const change = (v) => {
  if(multiple.value && v[v.length-1]==='all'){
    emit('update:modelValue', [...options.value]);
  }
};
// 计算属性
const lang = computed(() => {
  return window.$getLang();
 });
const options = computed(() => {
  return prop.options.length ? prop.options : ['RUNNING', 'PAUSED'];
});
const multiple = computed(() => {
  return window.$getType(prop.modelValue) === 'Array';
});
const placeholder = computed(() => {
  const placeholder = prop.placeholder || 'Status';
  return window.$l(placeholder);
});
// 监听
watchEffect(() => {
  state.v = prop.modelValue;
});
// 卸载

// Map
const statusMap = window.$map.statusMap
</script>
<style lang="scss" scoped></style>
