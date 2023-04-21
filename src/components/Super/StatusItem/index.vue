<template>
  <div class="SuperStatusItem flexMode vc">
    <i class="adicon" :class="[status.class, fontClass]"></i>
    <span v-if="label" class="pl4" :class="fontClass">{{ status[`label_${lang}`] }}</span>
  </div>
</template>
<script setup>
// 定义
defineOptions({
  name: 'SuperStatusItem',
});
// 传参
const prop = defineProps({
  status: {
    type: String,
    default: '',
  },
  label: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String,
    default: 'small',
  },
  lang: {
    type: String,
    default: 'en_us',
  },
});
// 数据

// 挂载

// 事件

// 计算属性
const status = computed(() => {
  return (
    maps[prop.status] || {
      class: 'ad-loading txt-dark5 ani-rotate',
      label_en_us: 'Unknown Status',
      label_zh_cn: '未知状态',
    }
  );
});
const lang = computed(() => {
  return prop.lang || window.$getLang();
});
const fontClass = computed(() => {
  return fontMap[prop.size] || 'fs12';
});
// 监听

// maps
const maps = window.$map.statusMap;

const fontMap = {
  small: 'fs12',
  default: 'fs16',
  large: 'fs24',
};

// 卸载
</script>
<style lang="scss" scoped></style>
