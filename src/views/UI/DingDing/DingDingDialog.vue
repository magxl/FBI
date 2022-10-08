<template>
  <div class="DingDingDialog border-l-littleBlue bg-littleGray">
    <DialogHeader v-bind="$attrs" />
    <DialogBody ref="dialogBody" :key="state.bodyKey" />
    <DialogInput @toSend="toSend" />
  </div>
</template>
<script setup>
import DialogHeader from './DingDingDialog/DialogHeader.vue';
import DialogBody from './DingDingDialog/DialogBody.vue';
import DialogInput from './DingDingDialog/DialogInput.vue';
defineOptions({
  name: 'DingDingDialog',
  components: { DialogHeader, DialogBody, DialogInput },
});
import { reactive, getCurrentInstance } from 'vue';
const state = reactive({
  bodyKey: 0,
});
const toSend = (v) => {
  proxy.$refs.dialogBody.toSend(v);
};
const { proxy } = getCurrentInstance();
const initData = () => {
  state.bodyKey = +new Date();
};
// 外抛
defineExpose({
  initData,
});
</script>
<style lang="scss" scoped>
.DingDingDialog {
  width: calc(100% - 160px - 240px);
}
</style>
