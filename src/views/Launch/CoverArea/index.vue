<template>
  <div ref="coverArea" class="CoverArea">
    <div ref="scrollArea" class="scrollArea flexMode ha">
      <div
        v-for="(it, i) in state.list"
        :key="i"
        class="listArea"
        :style="{ transform: `translateY(${it.cy}px)`, width: `${it.w}px` }"
        :class="state.scrollIndex - 1 === i && 'box-shadow-blue3'"
      >
        <div v-for="(sub, j) in it.card" :key="j" class="cardArea">
          <div
            class="card flexMode flexV hc vc"
            :class="[`bg-${sub.bg}`, `hover-box-${sub.bg}`]"
            :style="{ height: `${sub.height}px` }"
          >
            <div class="txt-dark1 fs24">{{ sub.txt }}</div>
            <div class="txt-dark3 fs12">{{ it.cy }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineOptions({
  name: 'CoverArea',
});
import { reactive, getCurrentInstance, onMounted, onBeforeUnmount } from 'vue';
const state = reactive({
  stoped: false,
  aniKey: 0,
  list: [],
  w: 128, // card width
  column: 0, // 列数 计算得出
  row: 5, // 行数
  ph: 0, // parent area height
  pw: 0, // parent area width
  sh: 0, // scroll area height
  scrollTop: 0,
  scrollRound: 0, // 滚动轮次
  scrollIndex: 0, // 滚动指针
  scroll: [], // 所有列单次滚动记录
  scrollLimit: 180, // 单次滚动上限
  cardOffsetTop: 80, // 正弦偏移系数
  interval: 3, // 滚动间隔
});
const { proxy } = getCurrentInstance();
onMounted(() => {
  state.ph = proxy.$refs.coverArea.clientHeight;
  state.pw = proxy.$refs.coverArea.clientWidth;
  state.sh = proxy.$refs.scrollArea.clientHeight;
  initList();
  const scrollRun = () => {
    state.timer = setTimeout(() => {
      // 一轮动画过后，轮次计数
      if (state.scrollIndex === state.column) {
        state.scrollRound++;
        state.scrollIndex = 1;
      } else {
        state.scrollIndex++;
      }
      state.aniKey = requestAnimationFrame(scrollAni);
      scrollRun();
    }, state.interval * 1000);
  };
  scrollRun();
});
onBeforeUnmount(() => {
  clearTimeout(state.timer);
  cancelAnimationFrame(state.aniKey);
});

const initList = () => {
  // 生成卡片
  const column = parseInt(state.pw / state.w);
  state.column = column;
  state.scroll = new Array(column).fill(0);
  let tlist = [];
  const height = parseInt(state.ph / state.row);
  state.scrollLimit = height;
  const num = ['壹', '贰', '叁', '肆', '伍', '陆'];
  for (let i = 0; i < column; i++) {
    const y = parseInt(state.cardOffsetTop * Math.sin(i - 1));
    tlist[i] = tlist[i] || {
      y,
      cy: y,
      card: [],
      w: state.w,
    };
    for (let j = 0; j < 6; j++) {
      const bg = window.$randomColor({ alpha: 1 });
      tlist[i].card[j] = { bg, height, txt: num[j] };
    }
    // 双倍
    tlist[i].card = [...tlist[i].card, ...tlist[i].card];
  }
  state.list = tlist;
};

const scrollAni = (v) => {
  // 单次滚动上限 拦截
  const index = state.scrollIndex - 1;
  console.info('index', index);
  // 期望单次偏移的高度
  const limit = state.scrollLimit * (state.scrollRound + 1);
  // 大于此高度则停止动画
  if (state.scroll[index] > limit) {
    cancelAnimationFrame(state.aniKey);
    return;
  }
  state.list[index].cy -= 2;
  state.scroll[index] += 2;
  if (state.scroll[index] + state.sh / 2 <= 0) {
    console.info('<=0');
    state.list[index].cy = state.list[index].y;
    state.scroll[index] = 0;
  }
  state.aniKey = requestAnimationFrame(scrollAni);
  //  = state.list.map((it) => {
  //   it.cy = it.cy - 2;
  //   state.scroll += 2;
  //   return it;
  // });
  // if (scrollTop.value + scrollAreaHeight / 2 <= 0) {
  //   console.info('<=0');
  //   scrollTop.value = 0;
  //   state.scrollRound = 0;
  //   state.list = state.list.map((it) => {
  //     it.cy = it.y;
  //     return it;
  //   });
  // } else {
  //   console.info('scroll');
  //   scrollTop.value -= 2;
  //   if (scrollTop.value + state.scrollRound * v < 0) {
  //     return;
  //   }
  //   state.list = state.list.map((it) => {
  //     it.cy = it.cy - 2;
  //     return it;
  //   });
  // }
};
</script>
<style lang="scss" scoped>
.CoverArea {
  height: 100%;
  overflow: hidden;
  .cardArea {
    width: 100%;
    padding: 4px;
    transform: translateY(-100px);
    .card {
      border-radius: 10px;
    }
  }
}
</style>
