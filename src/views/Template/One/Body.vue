<template>
  <div class="Body wrap" :class="prop.type">
    <div class="banner flexMode vc hc">
      <div class="content">
        <div class="title">
          <span>{{ state.form.banner.title }}</span>
        </div>
        <div class="subTitle">
          <span>{{ state.form.banner.subTitle }}</span>
        </div>
      </div>
    </div>
    <!-- banner -->
    <!-- contact -->
    <div class="section contact">
      <div class="content flexMode">
        <div
          v-for="(it, i) in state.form.contact"
          :key="i"
          class="flexMode vc p0-30 wp30"
        >
          <div class="flexMode hc vc w64 h64 noShrink txt-blue3">
            <i class="vicon fs48" :class="it.icon" />
          </div>
          <div class="flexMode flexV hb h64 p10">
            <div class="fs20 txt-blue7">{{ it.value }}</div>
            <div class="txt-dark3 fs14">{{ it.label }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- contact -->
    <!-- production -->
    <div class="section production">
      <div class="flexMode flexV hc vc">
        <div class="fs48 txt-dark9">PRODUCTION</div>
        <div class="p20 fs24 txt-dark3">SOMETHING U SALEED</div>
      </div>
      <div class="flexMode hc p30">
        <div class="productionArea flexMode flexWrap hc vc">
          <div
            v-for="(it, i) in state.form.production"
            :key="i"
            class="w200 m5 bg-white hover-type1 radius8 radius"
          >
            <div class="w200 h200" :class="it.bg"></div>
            <div class="w200 h64 p10 fs16 lh22 txt-dark7">
              {{ it.name }}
            </div>
            <div class="w200 h48 p10 fs12 lh14 txt-dark3">
              {{ it.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- production -->
    <!-- introduce -->
    <div class="section introduce">
      <div class="flexMode flexV hc vc">
        <div class="fs48 txt-dark9">INTRODUCE</div>
        <div class="p20 fs24 txt-dark3">SHOW THEM YOUR COMPANY</div>
      </div>
      <div class="flexMode hc p30">
        <div class="introductArea radius8 radius">
          <div class="introduceBanner box-shadow-blue1"></div>
          <div class="bg-white p20 fs18 txt-dark9">
            {{ state.form.introduce }}
          </div>
        </div>
      </div>
    </div>
    <!-- introduce -->
    <div class="footer bg-blue7">
      <div class="section flexMode hb">
        <div>
          <div class="p5 txt-white">
            {{ state.form.companyName }}
          </div>
          <div class="p5 txt-white">TEL: {{ state.form.contact[0].value }}</div>
          <div class="p5 txt-white">Copyright © Magxl</div>
        </div>
        <div class="flexMode">
          <div class="ml5">
            <div class="w100 h100 bg-white5"></div>
            <div class="p10 bg-white3 fs12">小程序</div>
          </div>
          <div class="ml5">
            <div class="w100 h100 bg-white5"></div>
            <div class="p10 bg-white3 fs12">公众号</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineOptions({
  name: 'Body',
});
import { reactive, onMounted } from 'vue';
const prop = defineProps({
  dt: {
    type: Object,
    default: () => {},
  },
  type: {
    type: String,
    defualt: '',
  },
});
const state = reactive({
  form: {},
});
state.form = prop.dt;
</script>
<style lang="scss" scoped>
.section {
  width: 1200px;
  margin: 0 auto;
  padding: 50px 0;
}
.banner {
  background-image: radial-gradient(
    rgba(251, 237, 230, 0.5) 50%,
    rgba(204, 224, 250, 0.5) 100%
  );
  .content {
    height: 500px;
    width: 1200px;
    padding: 120px 0 0 200px;
  }
  .title {
    max-height: 128px;
    width: 600px;
    font-size: 48px;
    font-weight: 800;
    line-height: 64px;
    color: #111;
    overflow: hidden;
  }
  .subTitle {
    height: 60px;
    margin-top: 20px;
    width: 600px;
    font-size: 20px;
    font-weight: 400;
    line-height: 30px;
    color: #777;
    overflow: hidden;
  }
}
.contact {
  padding: 50px 0;
}
.productionArea {
  width: 630px;
}
.introduceBanner {
  height: 300px;
  width: 1200px;
  background-image: linear-gradient(to bottom, $orange1, $red1);
}
</style>
