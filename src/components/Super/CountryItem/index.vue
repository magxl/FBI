<template>
  <div class="SuperCountryItem flexMode vc">
    <span class="areaicon" :class="icon"></span>
    <span v-if="prop.showLabel" class="pl4">{{ label }}</span>
  </div>
</template>
<script setup>
// 定义
defineOptions({
  name: 'SuperCountryItem',
});
// 传参
const prop = defineProps({
  name: {
    type: String,
    default: '',
  },
  showLabel: {
    type: Boolean,
    default: true,
  },
});
// 数据
const state = reactive({});

// 挂载

// 事件

// 计算属性
const country = computed(() => {
  return countryAllObj[prop.name.toLowerCase()] || {};
});
const icon = computed(() => {
  return 'area-' + country.value.value_lower;
});
const label = computed(() => {
  return country.value['label_' + window.$getLang()];
});
// 监听

// 卸载

// Map
const countryAllObj = window.$map.country.countryAllObj;
</script>
<style lang="scss" scoped></style>
