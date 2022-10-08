<template>
  <div class="ToolHitDot hp100 noselect flexMode hc p20" @click="toHit">
    <div class="relative hp100 wp100">
      <div class="abs r flexMode flexV vr z2">
        <div>
          <el-button @click.stop="toCopyAll">复制JSON</el-button>
        </div>
        <div>
          <el-button @click.stop="toClear">清除数据</el-button>
        </div>
      </div>
      <el-scrollbar ref="scrollbar" class="hp100" @scroll="onScroll">
        <div ref="scrollArea" class="relative scrollArea">
          <div v-for="(it, i) in state.dots" :key="i" class="timeline fs12">
            <div v-show="it.value !== 0" class="timeStep txt-blue3">
              {{ it.stepTxt }}
            </div>
            <div class="txt-dark5">{{ it.txt }}</div>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script setup>
defineOptions({
  name: 'ToolHitDot',
});
import { reactive, onMounted, getCurrentInstance, nextTick } from 'vue';
const state = reactive({
  dots: [],
  scrollbar: {},
  aniKey: null,
  ph: 0,
  h: 0,
  scrollTop: 0,
  aniStep: 0,
});
const { proxy } = getCurrentInstance();
onMounted(() => {
  state.ph = proxy.$el.clientHeight - 40;
  state.scrollbar = proxy.$refs.scrollbar;
});

const toCopyAll = () => {
  window.$copy(
    `/*value:从第一个打点开始计算的秒数, time: 真实时间戳, step: 两个打点之间的跨度*/${JSON.stringify(
      state.dots,
    )}`,
  );
};

const toClear = () => {
  state.dots = [];
};

const toHit = () => {
  const time = +new Date();
  const len = state.dots.length;
  if (len === 0) {
    state.dots.push({
      time, // 真实时间戳
      value: 0, // 从第一个打点开始计算的秒数
      step: 0, // 两个打点之间的跨度
      txt: '00:00', // 格式化时间
      stepTxt: '00:00', // 间隔格式化时间
      id: 1,
    });
  } else {
    const step = time - state.dots[len - 1].time;
    const value = time - state.dots[0].time;
    state.dots.push({
      time,
      step,
      value,
      txt: window.$formatTime(value, true),
      stepTxt: window.$formatTime(step, true),
      id: len + 1,
    });
    scrollToBottom();
  }
};

// 滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    state.h = proxy.$refs.scrollArea.clientHeight;
    state.aniKey = requestAnimationFrame(scrollAni);
  });
};
const scrollAni = () => {
  if (state.scrollTop + state.ph >= state.h) {
    state.aniStep = 0;
    cancelAnimationFrame(state.aniKey);
  } else {
    state.aniStep += 2;
    state.scrollbar.setScrollTop(state.scrollTop + state.aniStep);
    requestAnimationFrame(scrollAni);
  }
};
const onScroll = (v) => {
  state.scrollTop = v.scrollTop;
};
</script>
<style lang="scss" scoped>
.scrollArea {
  padding-left: 100px;
}
.toolBtn {
  position: absolute;
  left: 100%;
}
.timeline {
  position: relative;
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 10px;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 4px;
    height: 4px;
    background-color: $blue5;
    border-radius: 2px;
  }
  .timeStep {
    position: absolute;
    top: -8px;
    right: 100%;
    padding-right: 20px;
    word-break: keep-all;
    white-space: nowrap;
    &::after {
      content: '';
      position: absolute;
      top: -11px;
      right: 0;
      width: 10px;
      height: 36px;
      border: 1px $blue1 solid;
      border-right: none;
    }
  }
}
</style>
