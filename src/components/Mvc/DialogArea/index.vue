<template>
  <div class="DialogBody" :class="bodyClass">
    <Submiting v-if="prop.submiting" />
    <slot v-if="prop.noscroll" />
    <el-scrollbar v-else class="hp100">
      <slot />
    </el-scrollbar>
  </div>
  <div v-if="!prop.nofooter" class="DialogFooter radius-b4 bg-white9">
    <template v-if="slots.footer">
      <slot name="footer" />
    </template>
    <template v-else>
      <el-button plain @click="toClose">
        <template #icon>
          <i class="adicon ad-arrow-right fs14 rotate180"></i>
        </template>
        <span class="pl4">
          {{ $l('Cancel') }}
        </span>
      </el-button>
      <el-button
        plain
        type="primary"
        :loading="prop.submiting"
        @click="toSubmit"
      >
        <template #icon>
          <i class="adicon ad-sourceimport fs14"></i>
        </template>
        <span class="pl4">
          {{ $l('Submit') }}
        </span>
      </el-button>
    </template>
  </div>
</template>
<script setup>
// 定义
defineOptions({
  name: 'DialogArea',
});
// 传参
const prop = defineProps({
  noscroll: {
    type: Boolean,
    default: false,
  },
  submiting: {
    type: Boolean,
    default: false,
  },
});
// 数据
const state = reactive({});
const { proxy } = getCurrentInstance();
// 计算属性
const slots = computed(() => {
  return proxy.$slots;
});
const bodyClass = computed(() => {
  return [prop.submiting && 'noevent'];
});
// 监听

// 挂载

// 事件
const emit = defineEmits();
const toClose = () => {
  emit('close');
};
const toSubmit = () => {
  emit('submit');
};
defineExpose({
  toClose,
});
// 卸载
</script>
<style lang="scss" scoped></style>
