<template>
  <div class="SuperSelectInput">
    <el-select
      ref="selector"
      class="wp100"
      v-model="state.v"
      clearable
      filterable
      allow-create
      collapse-tags
      default-first-option
      collapse-tags-tooltip
      :placeholder="prop.placeholder"
      v-bind="$attrs"
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
    type: [String, Number, Array],
    default: '',
  },
  placeholder: {
    tyoe: String,
    default: ' ',
  },
});
// 数据
const state = reactive({ v: '' });
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
  if (window.$getType(v) === 'Array') {
    emit('update:modelValue', v.join(','));
  } else {
    emit('update:modelValue', v);
  }
  // nextTick(() => {
  //   proxy.$refs.selector.blur();
  // });
};
// 计算属性
const multiple = computed(() => {
  return proxy.$attrs.multiple;
});
// 监听
watch(
  () => prop.modelValue,
  (n, o) => {
    if (n && n !== o) {
      const type = window.$getType(n);
      if (type === 'String') {
        state.v = n.split(',');
      } else {
        state.v = n;
      }
    } else {
      if (multiple.value) {
        state.v = [];
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
