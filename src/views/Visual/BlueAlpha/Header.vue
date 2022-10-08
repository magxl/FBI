<template>
  <div class="BlueAlphaHeader relative">
    <div class="relative z2">
      <div class="titleArea flexMode flexV vc p30">
        <div class="title txt-white7 fs24 backdrop blod">{{ title }}</div>
        <div class="sub txt-white5 fs12 backdrop">{{ sub }}</div>
      </div>
      <div class="titleEffect flexMode hb vc txt-white7">
        <div class="flexMode vc">
          <span class="lk pr30">{</span>
          <span class="fs12">ALLTHEMEINUSE</span>
        </div>
        <div class="flexMode vc">
          <span class="fs12">NOHRTOBB</span>
          <span class="rk pl30">}</span>
        </div>
      </div>
    </div>
    <div class="bgArea">{{ bgtxt }}</div>
  </div>
</template>
<script setup>
defineOptions({
  name: 'BlueAlphaHeader',
});
import { reactive } from 'vue';
const prop = defineProps({
  title: {
    type: String,
    default: '',
  },
  sub: {
    type: String,
    default: '',
  },
  bgtxt: {
    type: String,
    default: '',
  },
});
const state = reactive({});
</script>
<style lang="scss" scoped>
.BlueAlphaHeader {
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
}
.titleArea {
  @include backdrop(100%, 3px, 150%);
}
.titleEffect {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  .lk,
  .rk {
    font-size: 36px;
  }
}
.bgArea {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 24px 0 24px 24px;
  text-align: center;
  color: #3680f9;
  font-size: 64px;
  line-height: 64px;
  letter-spacing: 24px;
  text-shadow: #10418f 0 0 4px, #fff 0 0 1px, #fff 0 0 1px;
  // filter: blur(4px);
  animation: alphaRun 8s ease-in-out infinite;
}

@keyframes alphaRun {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
    padding: 24px 16px 24px 24px;
    letter-spacing: 16px;
  }
  100% {
    opacity: 1;
    padding: 24px 0 24px 24px;
    letter-spacing: 24px;
  }
}
</style>
