<template>
  <div class="SuperTextarea relative">
    <el-input
      ref="input"
      v-model="state.v"
      clearable
      :rows="prop.rows"
      resize="none"
      type="textarea"
      placeholder=" "
      @input="toInput"
    />
    <div class="countArea abs fs12">
      <span :class="color">{{ state.total }}</span>
      <span class="txt-dark3">/</span>
      <span class="txt-primary">{{ prop.max }}</span>
    </div>
    <div
      class="clearArea abs txt-dark3 hover-txt-red5"
      :class="state.v && 'content'"
      @click="toClear"
    >
      <i class="adicon ad-close-circle"></i>
    </div>
  </div>
</template>
<script setup>
// 只针对行数统计限制的文本域
import { watchEffect } from 'vue';
// 定义
defineOptions({
  name: 'SuperTextarea',
});
// 传参
const prop = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  rows: {
    type: Number,
    default: 8,
  },
  max: {
    type: [String, Number],
    default: 10,
  },
});
// 数据
const state = reactive({ v: '', total: 0, mounted: false });
const { proxy } = getCurrentInstance();
// 挂载
onMounted(() => {
  toFocus();
});
// 事件
const emit = defineEmits();
const toFocus = () => {
  nextTick(() => {
    proxy.$refs.input.focus();
  });
};
const toInput = (v) => {
  let total = 0;
  let arr = [];
  const tArr = []; // trim后的有效数据
  if (v) {
    arr = v.split('\n');
    arr.forEach((it) => {
      if (it.trim()) {
        total++;
        tArr.push(it);
      }
    });
    if (total > max.value) {
      arr = tArr.slice(0, max.value);
      state.v = arr.join('\n');
      total = max.value;
    }
    emit('update:modelValue', state.v);
  } else {
    emit('update:modelValue', '');
  }
  state.total = total;
};
const toClear = () => {
  state.v = '';
  state.total = 0;
  emit('update:modelValue', '');
  toFocus();
};
// 计算属性
const max = computed(() => {
  return Number(prop.max) || 10;
});
const color = computed(() => {
  return state.total === max.value ? 'txt-red' : 'txt-blue';
});
// 监听
watchEffect(() => {
  // if (state.mounted) {
  //   return;
  // }
  state.v = prop.modelValue;
  // state.mounted = true;
});
// 卸载
defineExpose({
  toFocus,
});
// Map
</script>
<style lang="scss" scoped>
.SuperTextarea {
  .countArea {
    right: 4px;
    bottom: 0px;
  }
  .clearArea {
    display: none;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
  }
  &:hover {
    .clearArea.content {
      display: block;
    }
  }
}
</style>
