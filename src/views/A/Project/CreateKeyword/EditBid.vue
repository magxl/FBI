<template>
  <DialogArea @submit="toSubmit">
    <div class="DialogContent CreateKeywordEditBid">
      <el-input-number ref="input" v-model="state.v" :min="0" :precision="2" />
    </div>
  </DialogArea>
</template>
<script setup>
// 定义
defineOptions({
  name: 'CreateKeywordEditBid',
});
// 数据
const state = reactive({});
const { proxy } = getCurrentInstance();
// 挂载
onMounted(() => {
  proxy.$refs.input.focus();
});

// 事件
const emit = defineEmits();
const toSubmit = () => {
  emit('submit', { type: 'editBid', v: state.v });
  emit('close');
};
// 计算属性

// 监听

// 卸载
</script>
<style lang="scss" scoped></style>
