<template>
  <div class="SuperCountry">
    <component :is="cpt" v-bind="$attrs" />
  </div>
</template>
<script setup>
import { reactive } from 'vue';
import CountryAll from './chip/CountryAll.vue';
import CountryAso from './chip/CountryAso.vue';
import CountryAppstore from './chip/CountryAppstore.vue';
import CountryDiy from './chip/CountryDiy.vue';
defineOptions({
  name: 'SuperCountry',
  components: { CountryAll, CountryAso, CountryAppstore, CountryDiy },
});
// 传参
const prop = defineProps({
  type: {
    type: String,
    default: 'all',
  },
});
// 数据
const state = reactive({});

// 计算属性
const cpt = computed(() => {
  return 'Country' + window.$toUpperCamel(prop.type);
});
// 监听

// 挂载

// 事件

// 卸载
</script>
<style lang="scss" scoped></style>
