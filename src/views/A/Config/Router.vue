<template>
  <Page class="Router">
    <template #header>
      <div class="flexMode vc">
        <span class="pr16">{{ $l('Router') }}</span>
        <el-button plain circle type="primary" @click="toCreate()">
          <template #icon>
            <i class="adicon ad-plus1"></i>
          </template>
        </el-button>
      </div>
    </template>
    <Expand :list="list" parent="root" @create="toCreate" @permission="toPermission" />
    <Drawer v-model:current="state.currentDrawer" :drawer="state.drawer" />
  </Page>
</template>
<script setup>
import Expand from './Router/Expand.vue';
import Create from './Router/Create.vue';
import Permission from './Router/Permission.vue';
// 定义
defineOptions({
  name: 'Router',
  components: { Expand, Create },
});
// 数据
const state = reactive({
  drawer: [
    {
      title: '',
      size: 600,
      cpt: markRaw(Create),
    },
    {
      title: '',
      size: 600,
      cpt: markRaw(Permission),
    },
  ],
  currentDrawer: '',
});

// 挂载

// 事件
const toCreate = (v) => {
  state.drawer[0].title = window.$l('Create Router');
  state.drawer[0].params = v || {};
  state.currentDrawer = 0;
};
const toPermission = (v) => {
  
  state.drawer[1].title = window.$l('Permission in Router');
  state.drawer[1].params = v || {};
  state.currentDrawer = 1;
};
// 计算属性
const list = computed(() => {
  return window.routes;
});
// 监听

// 卸载
</script>
<style lang="scss" scoped></style>
