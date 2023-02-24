<template>
  <div class="SuperSelectInput">
    <el-select
      ref="selector"
      class="wp100"
      v-model="state.v"
      multiple
      clearable
      filterable
      allow-create
      collapse-tags
      :multiple-limit="prop.limit"
      :placeholder="prop.placeholder"
      @visible-change="visibleChange"
      @change="change"
    >
      <el-option
        v-for="(it, i) in maps"
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
  name: 'SuperSelectInput',
});
// 传参
const prop = defineProps({
  limit: {
    type: Number,
    default: 5,
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  placeholder: {
    tyoe: String,
    default: ' ',
  },
});
// 数据
const state = reactive({ v: [] });
const { proxy } = getCurrentInstance();
// 挂载

// 事件
const emit = defineEmits();
const visibleChange = (v) => {
  if (proxy.$refs.selector) {
    if (!v) {
      nextTick(() => {
        proxy.$refs.selector.blur();
        proxy.$refs.selector.input.blur();
      });
    }
  }
};
const change = (v) => {
  if (window.$getType(prop.modelValue) === 'String') {
    emit('update:modelValue', v.join(','));
  } else {
    emit('update:modelValue', v);
  }
  nextTick(() => {
    proxy.$refs.selector.blur();
  });
};
// 计算属性

// 监听
watch(
  () => prop.modelValue,
  (n, o) => {
    const type = window.$getType(n);
    if (n !== o) {
      if (type === 'String') {
        if (n) {
          state.v = n.split(',');
        }
      } else {
        state.v = n;
      }
    }
  },
  {
    immediate: true,
  },
);
// 卸载

// map
const maps = [];
</script>
<style lang="scss" scoped></style>
