<template>
  <div class="Contract">
    <SuperContract v-model="contractInfo" />
  </div>
</template>
<script setup>
import fakeData from './fakeData.js';
defineOptions({
  name: 'Contract',
});
import { watch, reactive, inject } from 'vue';
const store = inject('store');
const contract = store.contract();
contract.saveData('info', fakeData);
const contractInfo = reactive({});
watch(contractInfo, (n) => {
  console.info('contractInfo watch', n);
});
</script>
<style lang="scss" scoped>
.Contract {
  height: 100%;
  overflow-y: auto;
  padding-bottom: 20px;
}
</style>
