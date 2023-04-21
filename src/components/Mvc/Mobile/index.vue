<template>
  <div class="MvcMobile PageAfter bg-white radius box-shadow-dark1" :class="type">
    <div v-if="useHeader" class="relative border-b-dark1" :style="headerStyle">
      <div class="titleArea flexMode vc hc abs l r t b">
        <b v-if="prop.title">{{ $l(prop.title) }}</b>
        <slot v-else name="header" />
      </div>
      <!--  -->
      <!--  -->
      <div class="flexMode vc hb hp100">
        <div class="flexMode vc hc w48">
          <div v-if="noback" class="mgbtn circle36" @click="toBack">
            <i class="adicon ad-arrow-right rotate180"></i>
          </div>
        </div>
        <div class="toolArea">
          <slot name="tool" />
        </div>
      </div>
    </div>
    <div class="MobileBody relative" :style="bodyStyle">
      <Submiting v-show="prop.loading" txt="... LOADING ..." />

      <slot v-if="prop.noscroll" />
      <el-scrollbar v-else>
        <slot />
      </el-scrollbar>
    </div>
  </div>
</template>
<script setup>
defineOptions({
  name: 'MOBILE',
});
const prop = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Object,
    default: () => {},
  },
  title: {
    type: String,
    default: '',
  },
  noscroll: {
    type: Boolean,
    default: false,
  },
  noback: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'tabbar',
  },
});
// 数据
const { proxy } = getCurrentInstance();
const state = reactive({
  defaultOptions: {
    scroll: false,
  },
});
const store = inject('store');
const mobile = store.mobile();


// 事件
const router = useRouter();

const toBack = () => {
  mobile.saveData({aim: 'transition', dt: 'back'})
  router.back();
};

// 计算属性
const type = computed(() => {
  return window.$toUpperCamel(prop.type)
 });
const noback = computed(() => {
  if (prop.type !== 'tabbar') {
    return true;
  } else {
    if (prop.noback) {
      return true;
    } else {
      return false;
    }
  }
});
const useHeader = computed(() => {
  return prop.title || proxy.$slots.header;
});
const pageConfig = computed(() => {
  return window.global.config.page;
});

const headerStyle = computed(() => {
  return {
    height: pageConfig.value.header + 'px',
  };
});
const bodyStyle = computed(() => {
  let minusHeight = 0;
  if (useHeader.value) {
    minusHeight = pageConfig.value.header;
  }
  if (prop.type === 'tabbar') {
    minusHeight += 48;
  }
  return {
    height: `calc(100% - ${minusHeight}px)`,
  };
});
// 监听

// 挂载

// 卸载
</script>
<style lang="scss" scoped>
.MvcMobile {
  width: 100%;
  height: 100%;
  &.Full {
    position: relative;
    z-index: 9;
  }
}
</style>
