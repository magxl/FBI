<template>
  <div class="DingDing">
    <DingDingHeader />
    <div class="Body flexMode vs">
      <DingDingApp />
      <DingDingUser @changeUser="toChangeUser" />
      <DingDingDialog ref="dialog" />
    </div>
  </div>
</template>
<script setup>
import DingDingHeader from './DingDing/DingDingHeader.vue';
import DingDingApp from './DingDing/DingDingApp.vue';
import DingDingUser from './DingDing/DingDingUser.vue';
import DingDingDialog from './DingDing/DingDingDialog.vue';
defineOptions({
  name: 'DingDing',
  components: { DingDingHeader, DingDingApp, DingDingUser, DingDingDialog },
});
import { reactive, getCurrentInstance } from 'vue';
const state = reactive({
  search: '',
});
const { proxy } = getCurrentInstance();
const toChangeUser = (v) => {
  proxy.$refs.dialog.initData();
};
</script>
<style lang="scss" scoped src="./DingDing/dingding.scss"></style>
