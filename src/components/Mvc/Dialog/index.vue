<template>
  <div class="MvcDialog">
    <el-dialog
      ref="dialog"
      v-model="state.info.visible"
      v-bind="$attrs"
      :title="state.info.title"
      append-to-body
      :width="state.info.size"
      :destroy-on-close="destroy"
      @closed="closed"
    >
      <component
        v-if="state.info.cpt"
        :is="state.info.cpt"
        v-bind="$attrs"
        :params="state.info.params"
        @close="close"
      />
      <slot v-else />
    </el-dialog>
  </div>
</template>
<script setup>
defineOptions({
  name: 'MvcDialog',
});
const prop = defineProps({
  dialog: {
    type: [Array, Object],
    default: () => [],
  },
  current: {
    type: [Number, String],
    default: '',
  },
});
const state = reactive({
  info: {
    visible: false,
    title: '',
    cpt: '',
    size: 500,
    params: {},
    direction: 'rtl',
    keepalive: false,
  },
});
// 销毁计算
const destroy = computed(() => {
  return !state.info.keepalive;
});
// slot计算

// 显隐
watch(
  () => prop.current,
  (n) => {
    if (prop.dialog.length) {
      if (window.$getType(n) === 'Number') {
        let i = prop.dialog.length - 1;
        let index = n;
        if (i < n) {
          index = i;
        }
        state.info = {
          ...state.info,
          ...prop.dialog[index],
          visible: true,
        };
      } else {
        close();
      }
    }
  },
);

// 关闭
const emit = defineEmits();
const closed = () => {
  if (!state.info.keepalive) {
    state.info = {
      visible: false,
      title: '',
      cpt: '',
      size: 500,
      direction: 'rtl',
    };
  }
  emit('update:current', '');
};
// 主动关闭
const { proxy } = getCurrentInstance();
const close = () => {
  console.info('close');
  proxy.$refs.dialog.visible = false;
};
</script>
<style lang="scss" scoped></style>
