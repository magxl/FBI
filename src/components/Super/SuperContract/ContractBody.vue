<template>
  <div class="ContractBody p20-0">
    <component :is="name" v-bind="$attrs" :service="service" />
  </div>
</template>
<script setup>
// 合同内容 壳
import None from './ContractBody/None.vue';
import ZhuCeJiZhang from './ContractBody/ZhuCeJiZhang.vue';
defineOptions({
  name: 'ContractBody',
  components: { None, ZhuCeJiZhang },
});
const prop = defineProps({
  dt: {
    type: Object,
    default: () => {},
  },
});
import { reactive } from 'vue';
const name = reactive(prop.dt.name || 'None');
const service = reactive(prop.dt.main.service || {});
// console.info('ContractBody', prop.dt, name, service);
</script>
<style lang="scss" scoped></style>
