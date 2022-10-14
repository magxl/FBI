<template>
  <div class="CptLottie"></div>
</template>
<script setup>
import lottie from 'lottie-web';
defineOptions({
  name: 'CptLottie',
});
const prop = defineProps({
  options: {
    type: Object,
    default: () => {},
  },
});

// 数据
const state = reactive({
  lottie: {},
  defaultOptions: {
    loop: true,
    autoplay: true,
  },
});

// 挂载
const { proxy } = getCurrentInstance();
onMounted(() => {
  state.lottie = lottie.loadAnimation({
    container: proxy.$el,
    renderer: 'svg',
    ...state.defaultOptions,
    ...prop.options,
  });
  // this.$emit('animCreated', this.anim);
});

// 计算属性

// 监听

// 挂载

// 事件

// 卸载
</script>
<style lang="scss" scoped></style>
