<template>
  <div class="DialogInput h200 noShrink">
    <div class="flexMode vc hb h44 p10">
      <div class="flexMode">
        <div
          v-for="(it, i) in state.icons"
          :key="i"
          class="flexMode hc vc w24 h24 m0-4 radius4 hover-bg-dark1"
        >
          <el-tooltip placement="bottom" :content="it.label">
            <i class="vicon vite-home"></i>
          </el-tooltip>
        </div>
      </div>
      <div class="flexMode hc vc w24 h24 m0-4 radius4 hover-bg-dark1">
        <el-tooltip placement="bottom" content="富文本模式">
          <i class="vicon vite-home"></i>
        </el-tooltip>
      </div>
    </div>
    <div
      ref="inputArea"
      v-click-outside="toBlur"
      class="inputBody p10"
      :class="state.inputed && 'inputed'"
      contenteditable
      @click="toFocus"
    />
    <div class="footBtn h44 flexMode hr p4-10">
      <el-button :disabled="!state.inputed" type="primary" @click="toSend"
        >发送</el-button
      >
    </div>
  </div>
</template>
<script setup>
import { ClickOutside as vClickOutside } from 'element-plus';
defineOptions({
  name: 'DialogInput',
});
import {
  reactive,
  getCurrentInstance,
  onMounted,
  nextTick,
  defineEmits,
} from 'vue';
const state = reactive({
  input: '',
  inputArea: {},
  inputed: false,
  range: {},
  emptyPID: 0,
  icons: [],
});
const { proxy } = getCurrentInstance();
onMounted(() => {
  state.inputArea = proxy.$refs.inputArea;
  keyboardListener();
});
const toFocus = () => {
  console.info('toFocus');
  state.focus = true;
};
const toBlur = () => {
  console.info('toBlur');
  state.focus = false;
};

const emit = defineEmits();
const toSend = () => {
  console.info('toSend');
  emit('toSend', {
    type: 'my',
    content: state.inputArea.innerHTML,
    time: +new Date(),
  });
  state.inputArea.innerHTML = '';
  state.inputed = false;
};

const keyboardListener = () => {
  state.inputArea.addEventListener('keydown', keydown);
  state.inputArea.addEventListener('keyup', keyup);
};
const keydown = (v) => {
  // 聚焦组件时响应
  if (state.focus) {
    // 回车拦截
    if (v.keyCode === 13) {
      v.preventDefault();
      const emptyP = document.createElement('p');
      emptyP.className = 'm4-0';
      emptyP.innerText = '\u200b';
      const id = 'emptyP' + +new Date();
      emptyP.id = id;
      state.emptyPID = id;
      state.inputArea.appendChild(emptyP);
    }
  }
};
const keyup = (v) => {
  if (state.focus) {
    if (v.keyCode === 13) {
      const e = state.inputArea.querySelector(`#${state.emptyPID}`);
      nextTick(() => {
        const range = new Range();
        range.setStart(e, 0);
        range.setEnd(e, 0);
        const selection = document.getSelection();
        selection.removeAllRanges();

        selection.addRange(range);
      });
    }

    let html = state.inputArea.innerHTML;
    if (html === '') {
      state.inputed = false;
    } else {
      state.inputed = true;
    }
    console.info('响应模式', html);
  }
};
state.icons = [
  {
    label: '表情',
    icon: 'vite-home',
  },
  {
    label: '点赞',
    icon: 'vite-home',
  },
  {
    label: '截图',
    icon: 'vite-home',
  },
  {
    label: '输入@',
    icon: 'vite-home',
  },
  {
    label: '快捷指令 / ',
    icon: 'vite-home',
  },
  {
    label: '视频会议',
    icon: 'vite-home',
  },
  {
    label: '直播',
    icon: 'vite-home',
  },
  {
    label: '邮件',
    icon: 'vite-home',
  },
];
</script>
<style lang="scss" scoped>
.inputBody {
  position: relative;
  height: calc(100% - 44px - 44px);
  outline-style: none;
  font-size: 14px;
  &::before {
    content: '请输入';
    position: absolute;
    color: $dark3;
    font-size: 14px;
    top: 10px;
    left: 10px;
  }
  &.inputed {
    &::before {
      content: '' !important;
    }
  }
  // cursor: text;
}
</style>
