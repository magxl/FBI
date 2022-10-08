<template>
  <div class="mouseboardVisiul flexMode vs">
    <div class="p10 bg-blue1 lh12 fs16 hover-bg-blue3" @click="toReduce">-</div>
    <div class="flexMode vc p0-10 bg-white1 fs14 txt-dark7">
      {{ scaleCount }}
    </div>
    <div class="p10 bg-blue1 lh12 fs16 hover-bg-blue3" @click="toPlus">+</div>
  </div>
  <div ref="mouseBoard" class="MouseBoard flexMode hc">
    <div
      class="boardArea wp100 hp100 border-blue3 hover-bg-green1"
      :style="allStyle"
      @contextmenu.prevent="toShowMenu"
    >
      <el-scrollbar class="yscrollbar">
        <div class="flexMode hc vc border-orange3-dashed hover-bg-green1">
          MouseBord
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script setup>
import {
  reactive,
  getCurrentInstance,
  onMounted,
  onBeforeUnmount,
  computed,
} from 'vue';
defineOptions({
  name: 'Mainboard',
});
const prop = defineProps({
  options: {
    type: Object,
    default: () => {},
  },
});
const state = reactive({
  X: 0,
  Y: 0,
  Z: 1,
  origin: [0, 0], // 缩放中心
  ref: {}, // 主体dom
});
const { proxy } = getCurrentInstance();
// 监听
onMounted(() => {
  state.ref = proxy.$refs.mouseBoard;
  wheelListener();
});
const wheelEvent = (e) => {
  e.preventDefault();
  // console.info(e);
  const { deltaX, deltaY, ctrlKey, screenX, screenY } = e;
  if (ctrlKey) {
    let Z = state.Z - deltaY / 100;
    Z = Z < 0.1 ? 0.1 : Z;
    Z = Z > 10 ? 10 : Z;
    state.Z = Z;
  } else {
    state.X -= deltaX;
    state.Y -= deltaY;
  }
  // state.origin = [screenX, screenY];
};
const wheelListener = () => {
  console.info('wheel listening');
  state.ref.addEventListener('wheel', wheelEvent);
};
onBeforeUnmount(() => {
  console.info('wheel unmounting');
  state.ref.removeEventListener('wheel', wheelEvent);
});

// 缩放数值
const scaleCount = computed(() => {
  return parseInt(state.Z * 100) + '%';
});
// 壳区域大小
const allStyle = computed(() => {
  return {
    transform: `translate(${state.X}px,${state.Y}px) scale(${state.Z})`,
    ...areaStyle.value,
  };
});
const areaStyle = computed(() => {
  const { type, width = 200, height = 400 } = prop.options;
  let w, h;
  if (type === 'pc' || !type) {
    w = state.ref.clientWidth || 0;
    h = state.ref.clientHeight || 0;
  } else if (type === 'h5') {
    w = 750;
    h = 1334;
  } else if (type === 'diy') {
    w = width;
    h = height;
  } else {
    console.error(
      '需传入options=',
      { type: 'pc||h5||diy' },
      'type=diy时，使用',
      { width: 100, height: 200 },
      '来设置区域大小',
    );
  }
  return {
    width: w + 'px',
    height: h + 'px',
  };
});

// 控制缩放
const toReduce = () => {
  let Z = state.Z - 0.1;
  Z = Z < 0.1 ? 0.1 : Z;
  state.Z = Z;
};
const toPlus = () => {
  let Z = state.Z + 0.1;
  Z = Z > 10 ? 10 : Z;
  state.Z = Z;
};

// 右键菜单
const toShowMenu = (v) => {
  console.info(v);
  const { screenX, screenY } = v;
};
</script>
<style lang="scss" scoped>
.MouseBoard {
  height: calc(100vh - 30px);
}
.mouseboardVisiul {
  position: fixed;
  top: 40px;
  left: 10px;
  z-index: 2;
}
</style>
