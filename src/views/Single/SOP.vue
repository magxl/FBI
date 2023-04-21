<template>
  <div class="SingleSOP">
    <Loading v-show="state.loading" class="ztop" />
    <Header
      :nav="nav"
      :active="state.active"
      @scroll-to="toScroll"
      @show-form="toShowForm"
    />
    <div class="scrollArea">
      <Banner />
      <Intro :type="type" @loaded="state.loaded++" />
      <Case :type="type" @loaded="state.loaded++" />
      <Product :type="type" />
      <Optimized :type="type" @loaded="state.loaded++" />
      <Partner :type="type" @loaded="state.loaded++" @show-form="toShowForm" />
    </div>
    <Footer @show-form="toShowForm" />
    <Form />
  </div>
</template>
<script setup>
import Header from './SOP/Header.vue';
import Banner from './SOP/Banner.vue';
import Intro from './SOP/Intro.vue';
import Case from './SOP/Case.vue';
import Product from './SOP/Product.vue';
import Optimized from './SOP/Optimized.vue';
import Partner from './SOP/Partner.vue';
import Footer from './SOP/Footer.vue';
import Form from './SOP/Form.vue';
import 'intersection-observer';
import scrollama from 'scrollama';
import gsap from 'gsap';
import { nextTick, watchEffect } from 'vue-demi';

// 定义
defineOptions({
  name: 'SingleSOP',
  components: {
    Header,
    Banner,
    Intro,
    Case,
    Product,
    Optimized,
    Partner,
    Footer,
    Form,
  },
});
// 数据
const state = reactive({
  loading: true,
  active: 'Home',
  runMap: [],
  enterIndex: 0,
  pdIndex: 3, // 产品页的索引
  loaded: 0, // 已载入的数据块数量
  loadedTotal: 4, // 需要载入的数据数量
});
const { proxy } = getCurrentInstance();
// 挂载
function setCookie() {
  window.document.cookie = 'user_device_id=13decbce42db4cf38144a1703758b921;';
  window.document.cookie = 'user_device_id_timestamp=1670377347029;';
}
setCookie();
onMounted(() => {
  init();
});
// 事件
const init = () => {
  initScroll();
};
const toShowForm = () => {
  gsap.fromTo(
    '#Form',
    { opacity: 0, scale: 0, top: '50%', left: '50%', y: '-50%', x: '-50%' },
    {
      opacity: 1,
      top: '-10vh',
      left: '-20vw',
      x: 0,
      y: 0,
      scale: 1,
      duration: 1.4,
      ease: 'elastic.out',
    },
  );
};
const initScroll = () => {
  nextTick(() => {
    const scroller = scrollama();
    scroller
      .setup({
        step: '.step',
        offset: 0.9,
      })
      .onStepEnter(stepEnter)
      .onStepExit(stepExit);
  });
};
const stepEnter = ({ element, index, direction }) => {
  state.enterIndex = index;

  const key = element.getAttribute('data-id');
  const id = element.getAttribute('id');
  state.active = key;

  if (state.runMap.includes(id) || !key) {
    return;
  }
  nextTick(() => {
    eval(`init${key}Ani(id)`);
    state.runMap.push(id);
  });
};
const stepExit = ({ element, index, direction }) => {
  // const key = nav[index];
  // nextTick(() => {
  //   eval(`remove${key}Ani()`);
  // });
};
const toScroll = (it) => {
  proxy.$el.querySelector(`#${it}`).scrollIntoView({ behavior: 'smooth' });
};

// Animation

// Home
const initHomeAni = () => {
  ['.slogen1', '.slogen2', '.sub1', '.sub2', '.sub3', '.logo2'].forEach(
    (it, i) => {
      homeTxtAni(it, i);
    },
  );
  // gsap.fromTo(
  //   '#Home .rightArea',
  //   {
  //     opacity: 0,
  //     x: 640,
  //   },
  //   {
  //     opacity: 1,
  //     x: 0,
  //     ease: 'sine.out',
  //     delay: 0.5,
  //   },
  // );
};
const homeTxtAni = (el, i) => {
  gsap.fromTo(
    el,
    { opacity: 0, x: 100 },
    { opacity: 1, x: 0, duration: 0.5, ease: 'sine.out', delay: i * 0.1 },
  );
};
// Intro
const initIntroAni = () => {
  gsap.fromTo(
    '.card0',
    {
      opacity: 0,
      x: -200,
    },
    {
      opacity: 1,
      x: 0,
      delay: 0.2,
    },
  );
  gsap.fromTo(
    '.card1',
    {
      opacity: 0,
      x: -200,
    },
    {
      opacity: 1,
      x: 0,
    },
  );
  gsap.fromTo(
    '.card2',
    {
      opacity: 0,
      x: 200,
    },
    {
      opacity: 1,
      x: 0,
    },
  );
  gsap.fromTo(
    '.card3',
    {
      opacity: 0,
      x: 200,
    },
    {
      opacity: 1,
      x: 0,
      delay: 0.2,
    },
  );
};
// Case
const initCaseAni = () => {
  gsap.fromTo(
    '.caseContentArea',
    {
      opacity: 0,
      x: -1000,
      // rotate: -120,
    },
    {
      opacity: 1,
      x: 0,
      // rotate: 0,
    },
  );
  gsap.fromTo(
    '.caseMenuArea',
    {
      opacity: 0,
      x: 200,
      // rotate: 120,
    },
    {
      opacity: 1,
      x: 0,
      // rotate: 0,
    },
  );
};
// product
const initProductAni = (id) => {
  // const i = Number(id.replace('product', ''));
  const tweenLeft = tweenMap[window.$rn(tweenMap.length)];
  const tweenRight = tweenMap[window.$rn(tweenMap.length)];
  gsap.fromTo(
    `#${id} .leftArea`,
    {
      opacity: 0,
      x: -200,
      rotate: -135,
    },
    {
      opacity: 1,
      x: 0,
      rotate: 0,
    },
  );
  gsap.fromTo(
    `#${id} .rightArea`,
    {
      opacity: 0,
      x: 200,
      rotate: 135,
    },
    {
      opacity: 1,
      x: 0,
      rotate: 0,
    },
  );
};
// optimized
const initOptimizingAni = () => {
  const dom = [...proxy.$el.querySelectorAll('.optimizedItem')];
  const ids = dom.map((it) => it.id);
  ids.forEach((it, i) => {
    gsap.fromTo(
      `#${it}`,
      { opacity: 0, rotate: 360, scale: 0.2 },
      { opacity: 1, rotate: 0, scale: 1, delay: i * 0.02 },
    );
  });
};
// partner
const initPartnerAni = () => {
  const dom = [...proxy.$el.querySelectorAll('.partnerItem')];
  const ids = dom.map((it) => it.id);
  ids.forEach((it, i) => {
    gsap.fromTo(
      `#${it}`,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, delay: i * 0.02 },
    );
  });
};
// 计算属性

// 监听

// 卸载

// Map
const nav = [
  {
    label: 'Home',
    value: 'Home'
  },
  {
    label: 'Intro',
    value: 'Intro'
  },
  {
    label: 'Case',
    value: 'Case'
  },
  {
    label: 'Product',
    value: 'Product'
  },
  {
    label: 'Optimizing',
    value: 'Optimizing'
  },
  {
    label: 'Partner',
    value: 'Partner'
  },
  {
    label: 'Contact',
    value: 'Contact'
  },
];

const tweenMap = [
  [
    {
      opacity: 0,
      x: -400,
      scale: 0.5,
    },
    {
      opacity: 1,
      x: 0,
      scale: 1,
    },
  ],
  [
    {
      opacity: 0,
      x: 400,
      scale: 0.5,
    },
    {
      opacity: 1,
      x: 0,
      scale: 1,
    },
  ],
  [
    {
      opacity: 0,
      y: -400,
    },
    {
      opacity: 1,
      y: 0,
    },
  ],
  [
    {
      opacity: 0,
      y: 400,
    },
    {
      opacity: 1,
      y: 0,
    },
  ],
];

// computed
const typeMap = {
  zh_cn: 2,
  en_us: 1,
};
const type = computed(() => {
  return typeMap[window.$getLang()];
});

// watchEffect
watchEffect(() => {
  if (state.loaded === state.loadedTotal) {
    state.loading = false;
  }
});
</script>
<style lang="scss" scoped>
.ztop {
  z-index: 99;
}
.SingleSOP {
  overflow-y: auto;
  height: 100%;
  .scrollArea {
    .step {
      padding: 56px 0;
    }
  }
}
</style>
