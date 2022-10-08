<template>
  <div class="VisualMain">
    <div class="Body">
      <div
        v-drag="{ cb: moveCallback }"
        v-wheel="{ state }"
        ref="moon"
        class="lightArea"
        :style="style.moon"
      ></div>
    </div>
    <div class="Footer">
      <!-- <div class="txt-white">{{ state.X }}-{{ state.Y }}-{{ state.Z }}</div> -->
    </div>
    <div class="light" :style="style.light"></div>
  </div>
</template>
<script setup>
defineOptions({
  name: 'VisualMain',
});
import {
  reactive,
  onMounted,
  onUnmounted,
  getCurrentInstance,
  watch,
} from 'vue';
const { proxy } = getCurrentInstance();

const state = reactive({
  light: false,
  SW: 0,
  SH: 0,
  X: 0,
  Y: 0.3,
  Z: 1,
});
// node
const ref = reactive({
  moon: {},
});

// style
const style = reactive({
  light: {},
  moon: {},
});
onMounted(() => {
  ref.moon = proxy.$refs.moon;
  state.SW = proxy.$el.clientWidth;
  state.SH = proxy.$el.clientHeight;
});
// 开灯
const toHoldOn = () => {
  const moving = ref.moon.getAttribute('data-moving');
  if (!moving) {
    state.light = !state.light;
  }
};

// 移动
const moveCallback = () => {
  let X = ref.moon.offsetLeft || 0;
  let Y = ref.moon.offsetTop || 0;
  X -= state.SW / 2 - 100 / 2;
  Y -= state.SH / 2 - 100 / 2;
  style.light.transform = `translate(${X}px, ${Y}px) scale(${state.Z})`;
};

// 灯光亮度
watch(
  () => state.Y,
  (n) => {
    style.light.opacity = n;
  },
);
// 灯光大小
watch(
  () => state.Z,
  (n) => {
    style.moon.transform = `scale(${n})`;
  },
);
</script>
<style lang="scss" scoped>
.VisualMain {
  position: relative;
  height: calc(100vh - 30px);
  background-color: #000;
  .Body {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: calc(100% - 200px);
    .lightArea {
      position: absolute;
      top: 0;
      right: 0;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-image: linear-gradient(to top, #bbb, #ccc);
      filter: drop-shadow(0 0 20px #fff);
    }
  }
  .Footer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 200px;
    background-color: #111;
  }
  .light {
    position: absolute;
    top: -100%;
    left: -100%;
    right: -100%;
    bottom: -100%;
    pointer-events: none;
    z-index: 9;
    background-image: radial-gradient(
      circle,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0) 100%
    );
    opacity: 0.3;
    transform: translate(calc(25% - 300px), calc(-25% + 200px));
    mix-blend-mode: screen;
  }
}
</style>
