<template>
  <div
    class="OnloadHelp"
    :class="[visible && 'visible', size ? 'large' : '']"
    :style="helpStyle"
  >
    <div
      class="helpArea radius8 bg-white9 backdrop box-shadow-dark1 border-dark1"
    >
      <div class="flexMode vc h48 border-b bg-gray1 radius-t8">
        <div
          class="flexMode hc vc w24 h36 pl8 hover-txt-primary"
          @click="toToggleSize"
        >
          <i class="adicon ad-arrow-right rotate180 transition3"></i>
        </div>
        <div class="relative pl10 flexGrow">
          <el-input
            ref="input"
            v-model="state.v"
            clearable
            placeholder=" "
            @keydown.enter="getData"
          >
            <template #prefix>
              <i class="adicon ad-search1"></i>
            </template>
          </el-input>
        </div>
        <div class="flexMode hc vc w36 h36 hover-txt-red" @click="toClose">
          <i class="adicon ad-close"></i>
        </div>
      </div>
      <!-- header -->
      <!-- body -->
      <div class="helpBody" :style="helpBodyStyle">
        <el-scrollbar>
          <div v-for="(it, i) in state.list" :key="it.id">
            <div class="p8">
              <div class="fs14">{{ it.title }}</div>
              <div class="fs12 txt-dark7">{{ it.description }}</div>
              <div
                class="flexMode hr vc hover-txt-orange noselect"
                @click="toAddUseful(it, i)"
              >
                <i class="adicon ad-thumb"></i>
                <span class="fs12">{{ it.useful }}</span>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <!-- body -->
      <!-- foot -->
      <div class="flexMode vc h36 p8 border-t">
        <div class="flexMode vs">
          <div class="flexMode vc">
            <div class="fs10-l txt-dark5">{{ $l('Close') }}</div>
            <div class="p4-8 fs10-l bg-dark1 txt-dark5 radius4">Esc</div>
          </div>
          <div class="border-r mr8"></div>
          <div class="flexMode vc">
            <div class="fs10-l txt-dark5">{{ $l('Toggle') }}</div>
            <div class="p4-8 fs10-l bg-dark1 txt-dark5 radius4">
              {{ keyboard }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// 定义
defineOptions({
  name: 'OnloadHelp',
});
// 数据
const state = reactive({
  v: '',
  list: [],
  history: [],
  hot: [],
  ctrl: false,
});
const { proxy } = getCurrentInstance();
const store = inject('store');
const launch = store.launch();
// 挂载
onMounted(() => {
  init();
});

// 事件
const init = () => {
  const setting = JSON.parse(localStorage.getItem('helpSetting'));
  if (setting) {
    launch.saveData('help', setting);
  }
  initKeybordListener();
};
const getData = () => {
  const { v } = state;
  state.list = window.$fd(window.$rn(10), (i) => {
    const id = i + 1;
    return {
      id,
      title: v + ' Title ' + id,
      description: 'Description ' + id,
      useful: window.$rn(10000),
    };
  });
};
const toAddUseful = (it, i) => {
  state.list[i].useful++;
};
const toClose = () => {
  launch.saveData('help', { visible: false });
};
const toToggleShow = () => {
  launch.saveData('help', { visible: !visible.value });
};
const toToggleSize = () => {
  saveHelp(!size.value);
  launch.saveData('help', { size: !size.value });
};
const saveHelp = (size) => {
  localStorage.setItem('helpSetting', JSON.stringify({ size }));
};
const initKeybordListener = () => {
  document.addEventListener('keydown', keydown);
};
const removeKeybordListener = () => {
  document.removeEventListener('keydown', keydown);
};
const keydown = (e) => {
  kListener(e);
  if (visible.value) {
    escListener(e);
  }
};
const kListener = (e) => {
  if (
    e.which === 75 ||
    e.code === 'MetaK' ||
    e.key === 'k' ||
    e.keyCode === 75
  ) {
    if (e.metaKey || e.ctrlKey) {
      toToggleShow();
    }
  }
};
const escListener = (e) => {
  if (
    e.which === 27 ||
    e.key === 'Escape' ||
    e.code === 'Escape' ||
    e.keyCode === 27
  ) {
    toClose();
  }
};
// 计算属性
const visible = computed(() => {
  return launch.help.visible;
});
const keyword = computed(() => {
  return launch.help.keyword;
});
const size = computed(() => {
  return launch.help.size;
});
const pageHeight = computed(() => {
  return launch.options.pageHeight;
});
const helpStyle = computed(() => {
  if (size.value) {
    return {
      height: pageHeight.value - 32 + 'px',
      width: 640 + 'px',
    };
  } else {
    return '';
  }
});
const helpBodyStyle = computed(() => {
  if (size.value) {
    return {
      height: pageHeight.value - 32 - 84 + 'px',
    };
  } else {
    return '';
  }
});

const keyboard = computed(() => {
  return launch.options.platform === 'macOS' ? '⌘ + K' : 'Ctrl + K';
});
// 监听
watchEffect(() => {
  if (state.v || !keyword.value) {
    return;
  }
  state.v = keyword.value;
  getData();
});
watchEffect(() => {
  if (visible.value) {
    nextTick(() => {
      proxy.$refs.input.focus();
    });
  }
});
// 卸载

// Map
</script>
<style lang="scss" scoped>
.OnloadHelp {
  position: fixed;
  bottom: 16px;
  right: 16px;
  transition: $trans3;
  z-index: 19910608;
  width: 300px;
  height: 480px;
  transform: translate(332px, 0);
  &.visible {
    transform: translate(0, 0) !important;
  }
  .helpArea {
    transition: $trans3;
    .helpBody {
      height: 396px;
    }
  }
  &.large {
    transform: translate(662px, 0);

    .helpArea {
      .ad-arrow-right {
        transform: rotateZ(0);
      }
    }
  }
}
</style>
