<template>
  <DrawerArea ref="drawerArea" :submiting="state.submiting" @submit="toSubmit">
    <el-form
      ref="form"
      :rules="state.rules"
      :model="state.form"
      label-width="100px"
    >
      <el-form-item label="" prop=""> </el-form-item>
    </el-form>
  </DrawerArea>
</template>
<script setup>
// 定义
defineOptions({
  name: 'CustomReportCreate',
});
// 数据
const state = reactive({
  submiting: false,
  form: {},
  rules: {},
});
const { proxy } = getCurrentInstance();
// 计算属性

// 监听

// 挂载

// 事件
const toSubmit = () => {
  state.submiting = true;
  setTimeout(() => {
    proxy.$refs.drawerArea.toClose();
  }, window.$rn(3000, 200));
};
// 卸载
</script>
<style lang="scss" scoped></style>
