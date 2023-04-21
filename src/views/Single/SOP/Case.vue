<template>
  <div id="Case" data-id="Case" class="SOPCase step">
    <div class="flexMode hc flexV vc p40">
      <b class="fs48 txt-dark7 colorfulFont red">{{ $l('CASE') }}</b>
      <span class="pt16 txt-dark3">{{ $l('App We are Servicing') }}</span>
    </div>
    <div class="caseArea flexMode hb vs p16-0">
      <div class="caseContentArea flexGrow p8 pl0 opacity0">
        <div v-if="info" class="relative flexMode vs hp100 bg-white radius8">
          <div class="relative flexMode hc vr w480 noShrink">
            <el-image :src="info.image" fit="cover" class="relative w600">
              <template #placeholder>
                <i
                  class="absCenter fs24 adicon ad-loading el-icon is-loading"
                ></i>
              </template>
            </el-image>
          </div>
          <div class="">
            <div class="wp100 p40 pl0 fs24 txt-dark9">{{ info.name }}</div>

            <div v-html="info.content" class="pr16 fs18 txt-dark7"></div>
          </div>
          <div class="abs r b p16">
            <div
              class="flexMode vc hc w100 h36 bg-green1 border-green3 radius4 txt-green7 hover-bg-green3 hover-txt-green"
            >
              {{ $l('More Detail') }}
            </div>
          </div>
        </div>
        <div v-else class="relative hp100 bg-white radius8"></div>
      </div>
      <div class="caseMenuArea p8 pr0 w300 noShrink opacity0">
        <div class="hp100 bg-gray1 radius8">
          <el-scrollbar class="hp100">
            <div v-if="!state.loading" class="p4-0">
              <div v-for="(it, i) in state.list" :key="it.id" class="p4-8">
                <div
                  class="menuItem h100 p12-16 radius8 bg-gray1 border-transparent hover-border-primary-dashed"
                  :class="[state.active === i && 'active']"
                  @click="state.active = i"
                >
                  <div class="pb8 fs16 txt-dark7 txt-nowrap">{{ it.name }}</div>
                  <div
                    class="fs12 txt-dark5 txt-line3"
                    v-html="it.content"
                  ></div>
                </div>
              </div>
            </div>
            <div v-else class="p4-0">
              <div v-for="it in 4" :key="it" class="p4-8">
                <div class="h100 radius8 bg-gray1"></div>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// 定义
defineOptions({
  name: 'SOPCase',
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
  loading: true,
  list: [],
  active: 0,
});

// 挂载
onMounted(() => {
  getData();
});
// 事件
const emit = defineEmits();
const getData = async () => {
  state.loading = true;
  const { code, data } = await window.$get({
    url: window.$api.single.case,
    data: {
      type: prop.type,
    },
  });
  state.list = data || [];
  // state.active = data[0];
  state.loading = false;
  emit('loaded');
};
// 计算属性
const info = computed(() => {
  return state.list[state.active];
});
// 监听

// 卸载

// Maps
</script>
<style lang="scss" scoped>
.SOPCase {
  .caseArea {
    max-width: 1200px;
    height: 400px;
    margin: 0 auto;
    .caseContentArea {
      transform-origin: right bottom;
    }
    .caseMenuArea {
      transform-origin: left bottom;
      .menuItem {
        &.active {
          background-color: $primary3;
          border-color: $primary7;
        }
      }
    }
  }
}
</style>
