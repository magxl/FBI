<template>
  <div class="MobanOne Page" :class="state.mode">
    <div class="toolArea">
      <el-button v-if="state.mode === 'edit'" type="primary" @click="toSubmit"
        >完成</el-button
      >
      <el-button v-else type="success" @click="toEdit">编辑</el-button>
    </div>
    <el-scrollbar ref="scrollbar" class="hp100" @scroll="onScroll">
      <div class="flexMode">
        <div
          class="bodyArea flexGrow transition1"
          :style="{ width: state.bodyWidth + 'px' }"
        >
          <Body :dt="state.form" />
        </div>
        <div class="editArea sticky noShrink transition1">
          <Edit :dt="state.form" />
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script setup>
import Body from './One/Body.vue';
defineOptions({
  name: 'MobanOne',
  components: { Body },
});
import { reactive, onMounted, getCurrentInstance, nextTick } from 'vue';
import Edit from './One/Edit.vue';
const { proxy } = getCurrentInstance();
const state = reactive({
  mode: '',
  scrollbar: {},
  w: 0,
  bodyWidth: 0,
  aniStep: 0,
  aniKey: {},
  scrollLeft: 0,
  form: {
    banner: {
      title: 'Get Business Solution With Boseo.',
      subTitle:
        'A SUBTITLE HERE FOR DOUBLE LINES THROGHT THE BANNER & UNDER THE TITLE',
    },
    contact: [
      { label: '联系电话', value: '10086', icon: 'vite-active-call' },
      { label: '营业时间', value: '7x24小时', icon: 'vite-alarm-clock' },
      { label: '微信联系', value: 'magxl', icon: 'vite-wechat' },
    ],
    production: [],
    companyName: 'MAGXL',
    introduce:
      'YOUR COMPANY INTRODUCE WILL BE HERE. AND YOU CAN TYPE 500 WORDS FOR THE INTRODUCE. JUST ENJOY IN TYPE IT!',
    footer: {
      xiaochengxu: '',
      gongzhonghao: '',
    },
  },
  drawer: [
    {
      title: 'EDIT',
      cpt: Edit,
      size: 800,
    },
  ],
  drawerCurrent: '',
});

onMounted(() => {
  state.scrollbar = proxy.$refs.scrollbar;
  state.bodyWidth = proxy.$el.clientWidth;
  state.form.production = window.$fakeData(9, (i) => {
    return {
      i,
      id: i + 1,
      name: 'NAME ONE LINE' + i,
      description: 'DESCRIPTIONS DOUBLE LINES HERE',
      bg: 'bg-' + window.$randomColor({ alpha: 3 }),
    };
  });
});

//
const toEdit = () => {
  state.mode = 'edit';
  nextTick(() => {
    state.w = proxy.$el.clientWidth;
    state.aniKey = requestAnimationFrame(scrollAni);
  });
};
const toSubmit = () => {
  state.mode = '';
};

const scrollAni = () => {
  if (state.scrollLeft >= state.w - state.bodyWidth) {
    state.aniStep = 0;
    cancelAnimationFrame(state.aniKey);
  } else {
    state.aniStep += 10;
    state.scrollbar.setScrollTop(state.scrollTop + state.aniStep);
    requestAnimationFrame(scrollAni);
  }
};
const onScroll = (v) => {
  state.scrollLeft = v.scrollLeft;
};
</script>
<style lang="scss" scoped>
.toolArea {
  position: fixed;
  bottom: 100px;
  right: 20px;
  z-index: 9;
}

.MobanOne {
  .bodyArea {
    transform-origin: top right;
  }
  .editArea {
    width: 0;
    overflow: hidden;
  }
  &.edit {
    .editArea {
      width: 500px;
    }
    .bodyArea {
      transform: scale(0.8, 0.8) translate(0, 20px);
      // transform: rotateY(45deg) skewY(-10deg) translateX(200px); // 倾斜
      box-shadow: 0 40px 40px $dark1;
      border-radius: 12px;
      overflow: hidden;
    }
  }
}
</style>
