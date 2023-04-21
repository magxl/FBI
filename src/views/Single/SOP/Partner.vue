<template>
  <div id="Partner" data-id="Partner" class="SOPPartner step">
    <div class="flexMode hc flexV vc p40">
      <b class="fs48 txt-dark7 colorfulFont green">{{ $l('PARTNER') }}</b>
      <span class="pt16 txt-dark3"
        >{{ state.list.length }} {{ $l('Enterprises Have Joined Us') }}</span
      >
    </div>
    <div class="partnerArea flexMode flexWrap">
      <div
        v-for="it in state.list"
        :key="it.id"
        :id="`partner${it.id}`"
        class="partnerItem p4 opacity0"
      >
        <Hover>
          <div class="item flexMode hc vc h100 radius radius8 bg-white9" :title="it.name">
            <el-image :src="it.image" fit="contain" class="w200" />
          </div>
        </Hover>
      </div>
      <div id="partnerEmpty" class="partnerItem flexGrow p4 opacity0">
        <div
          class="flexMode hc vc h100 radius8 bg-gray1 txt-dark3 hover-txt-primary"
          @click="toBePartner"
        >
          {{ $l('Be Partner') }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// 定义
defineOptions({
  name: 'SOPPartner',
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
    url: window.$api.single.partner,
    data: {
      type: 1,
    },
  });
  state.list = data
    ? data.map((it) => {
        // it.bg = 'bg-' + window.$rc({ alpha: 3 });
        return it;
      })
    : [];
  // state.active = data[0];
  state.loading = false;
  emit('loaded');
};
const toBePartner = () => {
  emit('show-form')
};
// 计算属性

// 监听

// 卸载

// Map
</script>
<style lang="scss" scoped>
.partnerArea {
  width: 1200px;
  margin: 0 auto;
  .item {
    width: 232px;
  }
}
</style>
