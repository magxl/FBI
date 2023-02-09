<template>
  <div class="SuperAvatar">
    <component :is="cpt" v-bind="$attrs" />
  </div>
</template>
<script setup>
import SuperAvatarApp from './chip/App.vue';
import SuperAvatarCountry from './chip/Country.vue';
// 定义
defineOptions({
  name: 'SuperAvatar',
  components: { SuperAvatarApp, SuperAvatarCountry },
});
// 传参
const prop = defineProps({
  type: {
    type: String,
    default: 'app',
  },
});
// 数据
const state = reactive({});

// 计算属性

// 监听
const cpt = computed(() => {
  return 'SuperAvatar' + window.$toUpperCamel(prop.type);
});
// 挂载

// 事件

// 卸载
</script>
<style lang="scss" scoped></style>
