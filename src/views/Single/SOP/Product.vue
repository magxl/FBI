<template>
  <div id="Product" class="SOPProduct">
    <div class="flexMode hc flexV vc p40">
      <b class="fs48 txt-dark7 colorfulFont orange">{{ $l('PRODUCT') }}</b>
      <span class="pt16 txt-dark3">{{$l('One Tool All Tools with Our Sass')}}</span>
    </div>
    <div class="productArea">
      <div v-for="it in 10" :key="it" :id="`product${it}`" class="productItem flexMode vs step" data-id="Product">
        <div class="leftArea wp50 p8 opacity0">
          <div class="h400 radius8" :class="`bg-${$rc({ alpha: 3 })}`"></div>
        </div>
        <div class="rightArea wp50 p8 opacity0">
          <div class="h400 radius8" :class="`bg-${$rc({ alpha: 7 })}`"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// 定义
defineOptions({
  name: 'SOPProduct',
});
// 传参
const prop = defineProps({
  type: {
    type: Number,
    default: 1,
  },
});
// 数据
const state = reactive({});

// 挂载

// 事件

// 计算属性

// 监听

// 卸载

// Map
</script>
<style lang="scss" scoped>
.SOPProduct {
  position: relative;
  padding-top: 56px;
  background-color: $white;
}
.productArea {
  max-width: 1200px;
  margin: 0 auto;
  .leftArea{
    transform-origin: right bottom;
  }
  .rightArea {
    transform-origin: left bottom;
  }
}
</style>
