<template>
  <div class="DrawerBody" :class="bodyClass" :style="bodyStyle">
    <Submiting
      v-if="prop.loading"
      :type="prop.loadingType"
      :ani="prop.loadingAni"
      :txt="prop.loadingTxt"
    />
    <slot v-if="prop.noscroll" />
    <el-scrollbar v-else class="hp100">
      <slot />
    </el-scrollbar>
  </div>
  <div v-if="!prop.nofooter" class="DrawerFooter">
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
        size="small"
        plain
        type="primary"
        :loading="prop.loading"
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
  name: 'DrawerArea',
});
// 传参
const prop = defineProps({
  noscroll: {
    type: Boolean,
    default: false,
  },
  nofooter: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  loadingTxt: {
    type: String,
    default: undefined,
  },
  loadingAni: {
    type: String,
    default: undefined,
  },
  loadingType: {
    type: String,
    default: undefined,
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
  return [prop.loading && 'noevent'];
});
const bodyStyle = computed(() => {
  if (prop.nofooter) {
    return {
      height: `calc(100vh - 56px)`,
    };
  } else {
    return {
      height: `calc(100vh - 56px - ${window.global.config.drawer.footer})`,
    };
  }
});
// 监听

// 挂载

// 事件
const emit = defineEmits(['close', 'submit']);
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
