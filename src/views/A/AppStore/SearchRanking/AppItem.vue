<template>
  <div class="SearchRankingAppItem">
    <div
      class="border-gray1 hover-box-shadow-dark1 mb16 radius8"
      :class="it.isad && 'bg-blue1'"
    >
      <div class="p16 border-b">
        <div class="flexMode vs hb">
          <div class="flexMode vs point hover-txt-primary" @click="toDetail">
            <div class="w64 h64 radius8" :class="'bg-' + it.color"></div>
            <div class="pl16">
              <div class="pb8 fs14">{{ it.name }}</div>
              <div class="fs12 txt-dark3">{{ it.subTitle }}</div>
              <div class="fs12 txt-dark7">{{ it.artistName }}</div>
            </div>
          </div>
          <!--  -->
          <div v-if="it.isad" class="flexMode flexV vr">
            <div class="p2-4 radius4 fs12 bg-blue3 txt-white">Ad</div>
            <div class="flexMode fs12 pt8">
              <span class="pr8">Campaign ID</span>
              <span>{{ it.campaignId }}</span>
            </div>
            <div
              class="flexMode vc fs12 hover-a pt4"
              @click="state.appsToggle = !state.appsToggle"
            >
              <i class="adicon ad-apps txt-dark5"></i>
              <span class="pr4">
                {{ $l('Ads Running') }}:{{ it.adsList.length }}
              </span>
              <i
                class="adicon ad-arrow-down txt-dark5 fs14 transition3"
                :class="state.appsToggle && 'rotate180'"
              ></i>
            </div>
          </div>
        </div>
        <div v-if="state.appsToggle" class="flexMode hr pt8">
          <div class="flexMode flexWrap hr wp50">
            <div v-for="(at, a) in it.adsList" :key="a">
              <div
                class="w24 h24 mr4 mb4 radius radiusP50 hover-y-8 transition3"
                :class="'bg-' + at.color"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- ↑ header ↑ -->
      <div class="flexMode vc p16 border-b fs12">
        <div class="flexMode vc pr16">
          <i class="adicon ad-calendar fs14 txt-dark7"></i>
          <span class="pl8">{{ it.releaseDate }}</span>
        </div>
        <div class="flexMode vc pr16">
          <i class="adicon ad-tag fs14 txt-dark7"></i>
          <span class="pl8">{{ it.genreName }}</span>
        </div>
        <div class="flexMode vc pr16">
          <i class="adicon ad-thumb fs14 txt-dark7"></i>
          <span class="pl8">{{ it.rating }}</span>
        </div>
        <div class="flexMode vc pr16">
          <el-rate :model-value="it.score" disabled></el-rate>
          <span class="pl8">{{ it.score }}</span>
        </div>
      </div>
      <!-- ↑ info ↑ -->
      <!-- screenshots -->
      <div v-if="it.screenshots.length" class="border-b">
        <el-scrollbar class="hp100">
          <div class="flexMode p16">
            <div
              v-for="(gt, g) in it.screenshots"
              :key="g"
              class="h240 w480 radius8 mr16 noShrink"
              :class="'bg-' + gt"
            ></div>
            <div class="w1 h240 noShrink"></div>
          </div>
        </el-scrollbar>
      </div>
      <!-- ↑ screenshots ↑ -->
      <div class="p16 fs12">
        <div v-html="it.description"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineOptions({
  name: 'SearchRankingAppItem',
});
// 传参
const prop = defineProps({
  it: {
    type: Object,
    default: () => {},
  },
});
// 数据
const state = reactive({
  appsToggle: false,
});

// 挂载

// 事件
const emit = defineEmits();
const toDetail = () => {
  emit('toDetail', prop.it);
};
// 卸载
</script>
<style lang="scss" scoped></style>
