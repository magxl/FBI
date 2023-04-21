<template>
  <div
    id="Home"
    data-id="Home"
    class="SOPBanner relative step bg-dark9"
    :style="bannerStyle"
  >
    <div class="bannerArea relative">
      <div class="leftArea relative flexMode flexV">
        <div v-if="lang === 'en_us'" class="title hover-txt-shadow-orange">
          <div
            class="slogen slogen1 inline-block txt-white colorfulFont orange fw600"
          >
            {{ $l('More Focused') }}
          </div>
          <br />
          <div
            class="slogen slogen2 inline-block txt-white colorfulFont orange fw600"
          >
            {{ $l('More Professional') }}
          </div>
        </div>
        <div v-else class="title hover-txt-shadow-orange">
          <div
            class="slogen slogen1 inline-block fw600 txt-white colorfulFont orange"
          >
            {{ $l('More Focused') }}，{{ $l('More Professional') }}
          </div>
          <br />
          <div class="h64 slogen2"></div>
        </div>
        <div class="subTitle pt30 fs24 txt-white9">
          <div class="pb8 sub1">{{ $l('90% KPI Achievement Rate') }}</div>
          <div class="pb8 sub2">{{ $l('80% Bulk and Automation') }}</div>
          <div class="pb8 sub3">{{ $l('Thousands of app Cases') }}</div>
        </div>
        <div class="pt16 logo2">
          <img :src="$getImg('svg/ads-white.svg')" width="100" />
        </div>
      </div>
      <!--  -->
    </div>
    <div class="rightArea wp100 hp100">
      <div class="bannerMask"></div>
      <el-carousel :interval="10000" :height="`${pageHeight}px`" arrow="never">
        <el-carousel-item
          v-for="(it, i) in state.list"
          :key="i"
          class="flexMode vc hp100 wp100"
        >
          <el-image :src="it" fit="cover" class="wp100 hp100" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script setup>
import { nextTick } from 'vue-demi';
// 定义
defineOptions({
  name: 'SOPBanner',
});
// 传参
const prop = defineProps({
  type: {
    type: Number,
    default: 1,
  },
});
// 数据
const state = reactive({
  list: [],
});

// 挂载
onMounted(() => {
  getData();
});
// 事件
const getData = async () => {
  const { code, data } = await window.$get({
    url: window.$api.single.config,
    // data: {
    //   type: prop.type,
    // },
  });
  const list = lang.value === 'zh_cn' ? data[4] : data[8];
  state.list = list.value
    .split(',')
    .map((it) => 'https://www.ann9.com/uploads' + it);
};
// 计算属性
const lang = computed(() => {
  return window.$getLang();
});
const pageHeight = computed(() => {
  return window.global.config.options.pageHeight + 56;
});
const bannerStyle = computed(() => {
  return {
    height: pageHeight.value + 'px',
  };
});
// 监听

// 卸载

// Map
</script>
<style lang="scss" scoped>
.SOPBanner {
  .bannerArea {
    max-width: 1200px;
    margin: 0 auto;
    .title {
      padding-top: 64px;
      font-size: 64px;
    }
  }
  .leftArea {
    z-index: 1;
  }
  .rightArea {
    position: absolute;
    top: 0;
    right: 0;
    // height: 640px;
    // width: 860px;
    box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
    z-index: 0;
    .bannerMask {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
      background-image: radial-gradient($dark1, $dark7);
      backdrop-filter: blur(3px) saturate(.8) contrast(1.3);
    }
  }
}
</style>
