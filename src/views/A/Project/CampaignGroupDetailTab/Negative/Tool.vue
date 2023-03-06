<template>
  <div class="DetailTabNegativeTableTool flexMode vc p0-16">
    <el-button
      plain
      type="primary"
      circle
      @click="toCreate"
      class="hoverBtn"
      :txt="$l('Create')"
    >
      <template #icon>
        <i class="adicon ad-plus"></i>
      </template>
    </el-button>
    <!-- create -->
    <!-- remove -->
    <el-button
      plain
      circle
      type="primary"
      @click="toRemove"
      class="hoverBtn"
      :txt="$l('Remove')"
    >
      <template #icon>
        <i class="adicon ad-remove"></i>
      </template>
    </el-button>
    <!-- remove -->
    <Drawer v-model:current="state.currentDrawer" :drawer="state.drawer" />
  </div>
</template>
<script setup>
import Add from './Add.vue';
// 定义
defineOptions({
  name: 'DetailTabNegativeTableTool',
  components: { Add },
});
// 传参
const prop = defineProps({
  orginfo: {
    type: Object,
    default: Object.create(null),
  },
});
// 数据
const state = reactive({
  currentDrawer: '',
  drawer: [
    {
      title: '',
      size: 1000,
      cpt: Add,
    },
  ],
});

// 挂载

// 事件
const toCreate = () => {
  state.drawer[0].title = window.$l('Create Negative');
  state.drawer[0].params = { orginfo: prop.orginfo };
  state.currentDrawer = 0;
};
const toRemove = () => {};
// 计算属性

// 监听

// 卸载

// Map
</script>
<style lang="scss" scoped></style>
