<template>
  <div class="SuperAdPlacement">
    <el-select v-model="state.v" v-bind="$attrs" :placeholder="placeholder" @change="toChange">
      <el-option
        v-for="(it, i) in adplacementOptions"
        :key="i"
        :label="it.label"
        :value="it.value"
      />
    </el-select>
  </div>
</template>
<script setup>
// 定义
defineOptions({
  name: 'SuperAdPlacement',
});
// 传参
const prop = defineProps({
  modelValue: {
    type: [String, Array],
    default: '',
  },
});
// 数据
const state = reactive({
  v: '',
  emit: false,
});

// 挂载

// 事件
const emit = defineEmits();
const toChange = (v) => {
  state.emit = true;
  emit('update:modelValue', v);
};
// 计算属性
const placeholder = computed(() => {
  if (prop.placeholder === ' ') {
    return ' ';
  } else {
    return prop.placeholder ? window.$l(prop.placeholder) : window.$l('Ad Placement');
  }
});
// 监听
watch(
  () => prop.modelValue,
  (n) => {
    if (n && !state.emit) {
      state.v = prop.modelValue;
    }
  },
  {
    immediate: true,
  },
);
// 卸载

// Map
const adplacementOptions = window.$map.campaign.adplacement;
</script>
<style lang="scss" scoped></style>
