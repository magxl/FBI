<template>
  <div class="SubjectAccount p10">
    <div class="p20-10">
      <div class="txt-blue fs20">账户信息</div>
    </div>
    <div class="p10">
      <p>
        <span class="pr10">公司名称</span>
        <span class="pr10">{{ accountInfo.name }}</span>
        <span
          class="copy txt-blue5 hover-txt-blue"
          @click="toCopy(accountInfo.name)"
          >复制</span
        >
      </p>
      <p>
        <span class="pr10">开户银行</span>
        <span class="pr10">{{ accountInfo.bank }}</span>
        <span
          class="copy txt-blue5 hover-txt-blue"
          @click="toCopy(accountInfo.bank)"
          >复制</span
        >
      </p>
      <p>
        <span class="pr10">账　　户</span>
        <span class="pr10">{{ accountInfo.bank_no }}</span>
        <span
          class="copy txt-blue5 hover-txt-blue"
          @click="toCopy(accountInfo.bank_no)"
          >复制</span
        >
      </p>
      <p>
        <span class="pr10">地　　址</span>
        <span class="pr10">{{ accountInfo.address }}</span>
        <span
          class="copy txt-blue5 hover-txt-blue"
          @click="toCopy(accountInfo.address)"
          >复制</span
        >
      </p>
    </div>
  </div>
</template>
<script setup>
defineOptions({
  name: 'SubjectAccount',
});
const prop = defineProps({
  type: {
    type: String,
    default: '',
  },
});
import { computed, getCurrentInstance } from 'vue';
import subjectAccountData from './subjectAccountData.js';
const accountInfo = computed(() => {
  if (prop.type) {
    return subjectAccountData[prop.type] || subjectAccountData.default;
  } else {
    return {};
  }
});
const { appContext } = getCurrentInstance();
console.info(appContext);
// 复制
const toCopy = (v) => {
  appContext.app.config.globalProperties.$message.success(`COPY: ${v}`);
};
</script>
<style lang="scss" scoped>
.SubjectAccount {
  .copy {
    display: none;
  }
  p:hover {
    .copy {
      display: inline;
    }
  }
}
</style>
