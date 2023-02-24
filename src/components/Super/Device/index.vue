<template>
  <div class="SuperDevice">
    <el-select
      v-model="state.v"
      v-bind="$attrs"
      clearable
      :placeholder="prop.placeholder"
      @change="change"
    >
      <el-option
        v-for="(it, i) in options"
        :key="i"
        :label="it.label"
        :value="it.value"
      />
    </el-select>
  </div>
</template>
<script setup>
defineOptions({
  name: 'SuperDevice',
});
// 传参
const prop = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: ' ',
  },
  all: {
    type: Boolean,
    default: false,
  },
});
// 数据
const state = reactive({
  v: '',
});

// 计算属性
const options = computed(() => {
  let r = [
    {
      label: 'iPhone',
      value: 'IPHONE',
    },
    {
      label: 'iPad',
      value: 'IPAD',
    },
  ];
  if (prop.all) {
    r.unshift({
      label: 'iPhone and iPad',
      value: 'IPHONE,IPAD',
    });
  }
  return r;
});
// 监听
watch(
  () => prop.modelValue,
  (n, o) => {
    if (n !== o) {
      state.v = prop.modelValue;
    }
  },
  {
    immediate: true,
  },
);
// 挂载

// 事件
const emit = defineEmits();
const change = (v) => {
  emit('update:modelValue', v);
  emit('change', v);
};
const clear = () => {
  emit('update:modelValue', '');
  emit('clear');
};
// 卸载
</script>
<style lang="scss" scoped></style>
