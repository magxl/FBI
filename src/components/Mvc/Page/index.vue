<template>
  <component :is="cpt" v-bind="$attrs">
    <template v-for="(it, k, i) in $slots" :key="i" v-slot:[k]>
      <slot :name="k" />
    </template>
  </component>
</template>
<script setup>
import MainPage from './chip/MainPage.vue';
defineOptions({
  name: 'PAGE',
  components: { MainPage },
});
const prop = defineProps({
  type: {
    type: String,
    default: 'Main',
  },
});
import { reactive } from 'vue';
// 数据
const state = reactive({});

// 计算属性
const cpt = computed(() => {
  return prop.type + 'Page';
});
// 监听

// 挂载

// 事件

// 卸载
</script>
<style lang="scss" scoped></style>
