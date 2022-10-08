<template>
  <div class="MouseSwipe flexMode hc vc">
    <div ref="h5Area" class="h5Area flexMode hc vc border-blue3">
      <div class="cardArea flexMode flexV hc vc p10" :style="areaStyle">
        <div
          v-for="(it, i) in state.list"
          :key="i"
          class="card wp100 hp100 backdrop"
        >
          <span class="fs24" :class="it.content">{{ it.content }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineOptions({
  name: 'MouseSwipe',
});
import {
  reactive,
  onMounted,
  onUnmounted,
  getCurrentInstance,
  computed,
} from 'vue';
const state = reactive({
  ref: {},
  X: 0,
  Y: 0,
  list: [],
});
const { proxy } = getCurrentInstance();
onMounted(() => {
  state.ref = proxy.$refs.h5Area;
  state.ref.addEventListener('wheel', wheelEvent);
});
onUnmounted(() => {
  state.ref.removeEventListener('wheel', wheelEvent);
});
const wheelEvent = (e) => {
  const { deltaX, deltaY } = e;
  state.X -= deltaX;
  state.Y -= deltaY;
};
state.list = [...new Array(12).keys()].map((it) => {
  const r = 100;
  const range = (360 / 12) * it;
  const x = Math.tan(range) * r;
  const y = Math.atan(range) * r;
  return {
    x,
    y,
    range,
    transform: `transform: rotateZ(${range}deg) `,
    content: 'txt-' + window.$randomColor(),
  };
});

const areaStyle = computed(() => {
  return {
    transform: `translateY(50px) translateZ(${state.Y}px) rotateX(90deg)`,
  };
});
</script>
<style lang="scss" scoped>
.h5Area {
  width: 375px;
  height: 667px;
  perspective: 200px;
  transform-style: preserve-3d;
  .cardArea {
    transform-style: preserve-3d;
    transform-origin: center center;
    .card {
      transform: rotateX(-90deg);
    }
  }
}
</style>
