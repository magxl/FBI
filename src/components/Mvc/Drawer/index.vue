<template>
  <div class="MvcDrawer">
    <el-drawer
      ref="drawer"
      v-model="state.drawerInfo.visible"
      v-bind="$attrs"
      :title="state.drawerInfo.title"
      :with-header="withHeader"
      append-to-body
      :size="state.drawerInfo.size"
      :direction="state.drawerInfo.direction"
      :destroy-on-close="destroy"
      @closed="closed"
    >
      <component
        v-if="state.drawerInfo.cpt"
        :is="state.drawerInfo.cpt"
        v-bind="$attrs"
        :params="state.drawerInfo.params"
        @close="close"
      />
      <slot v-else />
    </el-drawer>
  </div>
</template>
<script setup>
defineOptions({
  name: 'MvcDrawer',
});
const prop = defineProps({
  drawer: {
    type: [Array, Object],
    default: () => [],
  },
  current: {
    type: [Number, String],
    default: '',
  },
});
const state = reactive({
  drawerInfo: {
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
  return !state.drawerInfo.keepalive;
});
const withHeader = computed(() => {
  return Boolean(state.drawerInfo.title);
});

// 显隐
watch(
  () => prop.current,
  (n) => {
    if (prop.drawer.length) {
      if (window.$getType(n) === 'Number') {
        let i = prop.drawer.length - 1;
        let index = n;
        if (i < n) {
          index = i;
        }
        state.drawerInfo = {
          ...state.drawerInfo,
          ...prop.drawer[index],
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
  if (!state.drawerInfo.keepalive) {
    state.drawerInfo = {
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
  proxy.$refs.drawer.handleClose();
};
</script>
<style lang="scss" scoped></style>
