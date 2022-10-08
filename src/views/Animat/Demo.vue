<template>
  <div class="AnimatDemo">
    <div class="oneTxt">AnimatDemo</div>
    <div class="dongcidaci flexMode hc vc">
      <span class="txt-dark3 fs12">dongcidaci</span>
      <!-- <div class="dcEffect"></div> -->
    </div>
  </div>
</template>
<script setup>
import gsap from 'gsap';
defineOptions({
  name: 'AnimatDemo',
});
import { reactive, onMounted } from 'vue';
const state = reactive({});

onMounted(() => {
  dongcidaci();
});

const dongcidaci = () => {
  const tl = gsap.timeline({ repeat: -1 });
  tl.to('.dongcidaci', { duration: 0.1, scale: 1.5 });
  tl.to('.dongcidaci', { duration: 0.12, scale: 1, delay: 0.26 });
};
</script>
<style lang="scss" scoped>
.dongcidaci {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: #fff 0 0 4px, #eee 0 0 10px;
  .dcEffect {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-image: radial-gradient(rgba(255, 255, 255, 0), $blue3);
  }
}
</style>
