<template>
  <div class="SuperInput wp100">
    <el-input
      v-model="state.v"
      clearable
      v-bind="$attrs"
      @change="change"
      @compositionstart="compositionstart"
      @compositionend="compositionend"
      @keydown.enter="pressEnter"
      class="wp100"
    >
      <template v-if="slots.prefix" #prefix> </template>
      <template v-if="slots.append" #append> </template>
      <template v-if="slots.prepend" #prepend> </template>
      <template v-if="slots.suffix" #suffix> </template>
    </el-input>
  </div>
</template>
<script setup>
import { watchEffect } from 'vue';

// 定义
defineOptions({
  name: 'SuperInput',
});
// 传参
const prop = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});
// 数据
const state = reactive({
  composition: false,
});
const {proxy} = getCurrentInstance();
// 挂载

// 事件
const emit = defineEmits();
const compositionstart = () => {
  state.composition = true;
};
const compositionend = () => {
  state.composition = false;
  nextTick(() => {
    pressEnter();
  });
};
const pressEnter = () => {
  if (!state.composition) {
    emit('enter');
  }
};
const change = (v) => {
  emit('update:modelValue', v);
};
// 计算属性
const slots = computed(() => {
  return proxy.$slots
 });
// 监听
let modelValueMounted = false;
watchEffect(() => {
  if (!modelValueMounted) {
    if (prop.modelValue) {
      state.v = prop.modelValue;
      modelValueMounted = true;
    }
  }
});
// 卸载

// Map
</script>
<style lang="scss" scoped></style>
