<template>
  <div class="WaterMark"></div>
</template>
<script setup>
defineOptions({
  name: 'WaterMark',
});
const prop = defineProps({
  watermark: {
    type: String,
    default: 'WATERMARK',
  },
  el: {
    // 传入样式选择器 如: .class | #id
    type: String,
    default: '',
  },
});
import { reactive, onMounted, getCurrentInstance } from 'vue';
const state = reactive({
  ref: {},
  ctx: {},
  w: 0,
  h: 0,
});
const { proxy } = getCurrentInstance();
onMounted(() => {
  state.ref = proxy.$el;
  state.w = document.body.querySelector(prop.el).clientWidth;
  state.h = document.body.querySelector(prop.el).clientHeight;
  initWatermark();
});

const initWatermark = () => {
  const { w, h } = state;
  const { watermark } = prop;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(255,255,255,0)';
  ctx.fillRect(0, 0, w, h);

  // 画布在旋转时不会出现对角空白无水印
  const maxSizeContainer = Math.max(w, h);
  const minSizeCanvas = Math.ceil(Math.SQRT2 * maxSizeContainer);
  const offsetX = Math.ceil(ctx.measureText(watermark).width) + 60;
  const offsetY = 110;

  // 列/行数
  const rowCount = Math.ceil(minSizeCanvas / offsetY);
  const colCount = Math.ceil(minSizeCanvas / offsetX);
  // 旋转
  // ctx.translate(minSizeCanvas / 6, minSizeCanvas / 6);
  ctx.rotate((-45 * Math.PI) / 180);
  ctx.translate(-minSizeCanvas / 2, -minSizeCanvas / 6);
  ctx.font = '16px 微软雅黑';
  ctx.textAlign = 'left';
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.textBaseline = 'middle';
  //行列文字
  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < colCount; j++) {
      ctx.fillText(watermark, offsetX * j, offsetY * i);
    }
  }

  state.ref.appendChild(canvas);
};
</script>
<style lang="scss" scoped>
.WaterMark {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  pointer-events: none;
}
</style>
