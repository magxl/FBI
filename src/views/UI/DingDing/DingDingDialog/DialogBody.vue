<template>
  <div class="DialogBody border-b-dark1">
    <el-scrollbar ref="scrollbar" class="hp100" @scroll="onScroll">
      <div ref="scrollArea" class="p10">
        <div class="loadingArea" :class="state.scrollLoading && 'loading'">
          ...LOADING...
        </div>
        <div
          v-for="(it, i) in state.list"
          :key="it.i"
          class="dialogList p10-0 mb20"
          :class="it.type"
        >
          <div
            v-if="it.type === 'time'"
            class="flexMode hc vc h48 p10 txt-dark5 fs12"
          >
            {{ it.time }}
          </div>
          <div v-else class="listArea flexMode">
            <div class="flexMode hc vc w48 h48 txt-white5 bg-blue5 radius4">
              {{ it.i }}
            </div>
            <div class="contentArea flexMode p0-10">
              <div class="txtArea flexMode vc">
                <div class="timeArea hoverShow">{{ it.time }}</div>
                <div v-html="it.content"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="scrollBottom"></div>
    </el-scrollbar>
  </div>
</template>
<script setup>
defineOptions({
  name: 'DialogBody',
});
import { reactive, getCurrentInstance, onMounted, nextTick } from 'vue';
const state = reactive({
  scrollbar: {},
  list: [],
  page: 0,
  scrollTop: 0,
  aniKey: null,
  aniStep: 0,
  scrollLoading: false,
  h: 0,
  ph: 0,
});

const { proxy } = getCurrentInstance();

const toSend = (v) => {
  state.list.push(v);
  scrollToBottom();
};
defineExpose({
  toSend,
});
onMounted(() => {
  state.ph = proxy.$el.clientHeight;
  state.scrollbar = proxy.$refs.scrollbar;
  scrollToBottom();
});

// 滚动到底部
const scrollToBottom = () => {
  // proxy.$refs.scrollbar.wrap$
  //   .querySelector('#scrollBottom')
  //   .scrollIntoView({ behavior: 'smooth' });
  nextTick(() => {
    state.h = proxy.$refs.scrollArea.clientHeight;
    state.aniKey = requestAnimationFrame(scrollAni);
  });
};
const scrollAni = () => {
  if (state.scrollTop + state.ph === state.h) {
    state.aniStep = 0;
    cancelAnimationFrame(state.aniKey);
  } else {
    state.aniStep += 10;
    state.scrollbar.setScrollTop(state.scrollTop + state.aniStep);
    requestAnimationFrame(scrollAni);
  }
};
const onScroll = (v) => {
  state.scrollTop = v.scrollTop;
  if (v.scrollTop < 1 && !state.scrollLoading) {
    state.scrollLoading = true;
    getList();
    console.info('loadMore');
    // 计算增加后卷去的高度，来还原原来的对话位置
    nextTick(() => {
      const h = proxy.$refs.scrollArea.clientHeight;
      const loadH = h - state.h;
      state.h = h;
      state.scrollbar.setScrollTop(loadH);
    });

    state.timer = setTimeout(() => {
      state.scrollLoading = false;
    }, 1000);
  }
};
const getList = () => {
  const len = state.list.length;
  const pageSize = window.$randomNumber(50, 5);
  const tlist = window
    .$fakeData(pageSize, (i) => {
      return {
        i: i + len,
        content: 'sjkadjajdkadjkadj',
        time: '2022-09-09',
        user: 'Magxl',
        type: window.$randomNumber(10) > 5 ? 'my' : '',
      };
    })
    .sort((a, b) => b.i - a.i);
  const time = {
    type: 'time',
    time: `PAGESIZE ${pageSize}`,
  };
  state.list = [time, ...tlist, ...state.list];
};
getList();
</script>
<style lang="scss" scoped>
.DialogBody {
  height: calc(100% - 56px - 200px);
  .dialogList {
    .contentArea {
      width: calc(100% - 48px);
      .txtArea {
        position: relative;
        padding: 10px;
        font-size: 14px;
        max-width: calc(80% - 116px);
        min-height: 48px;
        min-width: 48px;
        color: $dark9;
        background-color: $white;
        border-radius: 2px 6px 6px 6px;
        user-select: text;
        .timeArea {
          display: none;
          position: absolute;
          left: 0;
          bottom: 100%;
          padding: 2px 4px;
          font-size: 12px;
          color: $dark3;
        }
      }
    }
    &:hover {
      .hoverShow {
        display: block !important;
      }
    }
  }
  .my {
    .listArea {
      flex-direction: row-reverse;
      .contentArea {
        justify-content: flex-end;
        .txtArea {
          background-color: $blue3 !important;
          border-radius: 6px 2px 6px 6px;
          .timeArea {
            left: auto !important;
            right: 0;
          }
        }
      }
    }
  }
}
.loadingArea {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 30px;
  padding: 4px;
  text-align: center;
  font-size: 12px;
  color: $dark3;
  z-index: 2;
  transition: $trans5;
  transform: translate(0, -50px);
  &.loading {
    transform: translate(0, 0);
  }
}
</style>
