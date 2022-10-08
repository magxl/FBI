<template>
  <div class="VPLaunch hp100 flexMode hc vc">
    <span class="oneTxt">VPLaunch</span>
  </div>
</template>
<script setup>
import gsap from 'gsap';
defineOptions({
  name: 'VPLaunch',
});
import { reactive, onMounted, getCurrentInstance } from 'vue';
const state = reactive({
  ref: {},
});
const { proxy } = getCurrentInstance();

onMounted(() => {
  state.ref = proxy.$el;
  gsap.fromTo('.oneTxt', { opacity: 0 }, { y: 0, duration: 1, opacity: 1 });
});
</script>
<style lang="scss" scoped></style>
