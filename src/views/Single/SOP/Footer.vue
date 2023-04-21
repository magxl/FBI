<template>
  <div id="Contact" class="SOPFooter step">
    <div class="footerArea">
      <div class="flexMode">
        <div class="contactArea maxw300 pr16">
          <div class="p16 fs14 txt-white5">{{ $l('Contact') }}</div>
          <div class="txt-white9">
            <div class="flexMode vc p8-16">
              <i class="adicon ad-iphone"></i>
              <span class="pl8">+86 010-65880952</span>
            </div>
            <div class="flexMode vc p8-16">
              <i class="adicon ad-mail"></i>
              <span class="pl8">business@ann9.com</span>
            </div>
            <div class="flexMode p8-16">
              <i class="adicon ad-home"></i>
              <span class="pl8 txt-wrap"
                >Address xxx x x x
                xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span
              >
            </div>
          </div>
          <div class="p16 pb0 txt-white7 fs14">QRCODE</div>
          <div class="qrcodeArea flexMode flexV p16">
            <div class="bg-white9 radius4 p8">
              <img :src="$getImg('d/qrcode.png')" width="100" height="100" />
            </div>
          </div>
        </div>
        <!-- contact -->
        <!-- service -->
        <div class="serviceArea maxw300 pr16">
          <div class="p16 fs14 txt-white5">{{ $l('Service') }}</div>
          <div class="txt-white9">
            <div class="p8-16 hover-txt-orange">{{ $l('Get a Demo') }}</div>
            <div class="p8-16 hover-txt-orange">{{ $l('Authrization') }}</div>
            <div class="p8-16 hover-txt-orange">{{ $l('Ads Help') }}</div>
            <div class="p8-16 hover-txt-orange">{{ $l('Other') }}</div>

            <div class="p8-16 txt-green hover-txt-orange" @click="toShowForm">{{ $l('Submit Your Enquiry') }}</div>
          </div>
        </div>
        <!-- service -->
      </div>
      <!-- cpr -->
      <div class="cprArea flexGrow">
        <div class="flexMode flexV hr vr fs14">
          <div class="txt-white7">
            © 2022-Now Ann9.com,All Rights Reserved.
            北京阳光伟烨网络科技有限公司
          </div>
          <div class="txt-white7 hover-txt-orange">
            京ICP备15044084号-2 京公网安 110105012193号.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// 定义
defineOptions({
  name: 'SOPFooter',
});
// 数据
const state = reactive({

});

// 挂载

// 事件
const emit = defineEmits();
const toShowForm = () => {
  emit('show-form')
};
// 计算属性

// 监听

// 卸载

// Map
</script>
<style lang="scss" scoped>
.SOPFooter {
  padding: 16px;
  height: 480px;
  background-color: $dark9;
  .footerArea {
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>
