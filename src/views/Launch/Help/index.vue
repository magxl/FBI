<template>
  <div class="OnloadHelp" :class="[visible && 'visible', size ? 'large' : '']">
    <div
      class="helpArea radius8 bg-white9 backdrop box-shadow-dark1 border-dark1"
      :style="helpStyle"
    >
      <div class="flexMode vc h48 border-b bg-gray1 radius-t8">
        <div
          class="flexMode hc vc w24 h36 pl8 hover-txt-primary"
          @click="toToggleSize"
        >
          <i class="adicon ad-arrow-right rotate180 transition3"></i>
        </div>
        <div class="pl10 flexGrow">
          <el-input
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
      <div class="helpBody">
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
});
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
  launch.saveData('help', { visible: false, keyword: '' });
};
const toToggleSize = () => {
  saveHelp(!size.value);
  launch.saveData('help', { size: !size.value });
};
const saveHelp = (size) => {
  localStorage.setItem('helpSetting', JSON.stringify({ size }));
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
// 监听
watch(
  () => keyword.value,
  (n) => {
    if (n) {
      state.v = n;
      getData();
    }
  },
  {
    immediate: true,
  },
);
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
  &.visible {
    .helpArea {
      transform: translate(0, 0) !important;
    }
  }
  .helpArea {
    width: 300px;
    height: 480px;
    transition: $trans3;
    transform: translate(332px, 0);

    .helpBody {
      height: 432px;
    }
  }
  &.large {
    .helpArea {
      transform: translate(662px, 0);

      .ad-arrow-right {
        transform: rotateZ(0);
      }
      .helpBody {
        height: 772px;
      }
    }
  }
}
</style>
