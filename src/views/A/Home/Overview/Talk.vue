<template>
  <div class="OverviewTalk relative hp100 w480 noShrink">
    <div class="flexMode vc h48 p16 border-b-dark1">
      <div
        v-for="it in state.nav"
        :key="it.id"
        class="flexMode hover-txt-primary p0-4"
      >
        <div class="rotate180">
          <i class="adicon ad-arrow-right fs12"></i>
        </div>
        <span class="pl4 fs12">{{ it.title }}</span>
      </div>
    </div>
    <el-scrollbar class="scrollArea">
      <div class="p8">
        <div
          v-for="it in 30"
          :key="it"
          class="p8 mb4 radius8 border-dark3-dashed hover-box-shadow-dark1"
          @click="toDetail"
        >
          {{ it }}
        </div>
      </div>
    </el-scrollbar>
    <div
      class="inputArea flexMode hb border-t-dark1 box-shadow-dark1 transition3"
      :class="state.mode ? 'h240 vr' : 'h64 vc'"
    >
      <div class="toolArea">
        <el-radio-group v-model="state.mode">
          <el-radio-button
            v-for="(it, i) in toolOptions"
            :key="i"
            :label="it.value"
          >
            <span>{{ it.label }}</span>
          </el-radio-button>
        </el-radio-group>
      </div>
      <div class="flexMode vc flexGrow p8-16 pr0 hp100">
        <el-input
          v-show="state.mode === 0"
          v-model="state.comment"
          clearable
          :placeholder="toolOptions[0].placeholder"
        >
          <template #prefix>
            <div class="dot24 fs10 txt-white bg-primary7">评</div>
          </template>
        </el-input>
        <el-input
          v-show="state.mode === 1"
          v-model="state.story"
          type="textarea"
          clearable
          class="fullTextArea"
          :placeholder="toolOptions[1].placeholder"
        >
          <template #prefix>
            <div class="dot24 fs10 txt-white bg-purple7">续</div>
          </template>
        </el-input>
      </div>
      <div class="flexMode vc p8">
        <el-button plain type="primary" @click="toSubmit">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script setup>
// 定义
defineOptions({
  name: 'OverviewTalk',
});
// 传参
const prop = defineProps({
  info: {
    type: Object,
    default: Object.create(null),
  },
});
// 数据
const state = reactive({
  nav: [],
  comment: '',
  story: '',
  mode: 0,
});

// 挂载
onMounted(() => {
  initNav();
});
// 事件
const initNav = () => {
  state.nav = window.$fd(window.$rn(10), () => {
    const id = window.$rn(88888, 11111);
    return {
      id,
      title: 'Title' + id,
    };
  });
};
const toDetail = () => {
  
};
// 计算属性

// 监听

// 卸载

// Map
const toolOptions = [
  {
    label: '评',
    value: 0,
    placeholder: '评论一下',
  },
  {
    label: '续',
    value: 1,
    placeholder: '续写另一个时空',
  },
];
</script>
<style lang="scss" scoped>
.scrollArea {
  height: calc(100% - 48px - 64px);
}
.inputArea {
  position: absolute;
  width: 100%;
  bottom: 0;
  z-index: 2;
}
.toolArea {
  position: absolute;
  left: 0;
  bottom: 100%;
}
</style>
