<template>
  <div class="Service">
    <component
      :is="name"
      v-bind="$attrs"
      :info="dt"
      @updateService="updateService"
    />
  </div>
</template>
<script>
// 服务 壳
let serviceArr = import.meta.globEager('./Service/*/*.vue');
let serviceCpt = {};
Object.keys(serviceArr).forEach((it) => {
  const itArr = it.split('/');
  const name = itArr[itArr.length - 1].split('.')[0];
  serviceCpt[name] = serviceArr[it].default;
});
export default {
  name: 'Service',
  components: serviceCpt,
};
</script>

<script setup>
const prop = defineProps({
  dt: {
    type: Object,
    default: () => {},
  },
});
import { reactive } from 'vue';
const name = reactive(prop.dt.name);
const emit = defineEmits();
// console.info('serivce', prop.name);
const updateService = (value) => {
  console.info('updateService', value);
  emit('updateService', {
    name,
    value,
  });
};
</script>
<style lang="scss" scoped>
:deep(.serviceTitle) {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    border-bottom: 1px $dark1 dashed;
    transform: translate(0, -50%);
  }
}
</style>
