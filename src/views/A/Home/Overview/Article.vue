<template>
  <div class="OverviewArticle relative hp100 radius border-r-dark1 PageAfter flexGrow">
    <Loading v-show="state.loading"/>
    <el-scrollbar>
      <div
        v-for="it in state.list"
        :key="it.id"
        class="itemArea p16 border-b-dark1 hover-box-shadow-primary1"
        :class="state.selected.id===it.id && 'active'"
        @click="toSelect(it)"
      >
        <div class="flexMode vc hb fs14">
          <span>{{ it.title }}</span>
          <div class="w36 h36 radiusP50 bg-primary3"></div>
        </div>
        <div class="fs12 txt-dark5">{{ it.description }}</div>
        <div class="flexMode hr pt8 fs14">
          <span class="txt-dark5">C</span>
          <span class="pl4 txt-dark7">{{ it.click }}</span>
          <span class="p0-8 sep"></span>
          <span class="txt-dark5">D</span>
          <span class="pl4 txt-dark7">{{ it.dimension }}</span>
        </div>
      </div>
    </el-scrollbar>
    <div class="detailArea hp100" :class="state.selected.id&&'active'">
      <div class="h48 border-b-dark1"></div>
      <el-scrollbar>
        <p v-for="it in 30" :key="it" class="p16">Detail {{ it }}</p>
      </el-scrollbar>
    </div>
  </div>
</template>
<script setup>
// 定义
defineOptions({
  name: 'OverviewArticle',
});
// 数据
const state = reactive({
  loading: true,
  list: [],
  selected: {},
});

// 挂载
onMounted(() => {
  init();
});
// 事件
const emit = defineEmits();
const init = async () => {
  state.loading = true;
  await window.$promise(() => {
    state.list = window.$fd(window.$rn(50), (i) => {
      return {
        id: window.$rn(8888888, 1111111),
        title: 'Title ' + i,
        description: 'Description ' + i,
        click: window.$fa(window.$rn(99999999),0),
        dimension: window.$fa(window.$rn(100),0),
      };
    });
  });
  state.loading = false;
};
const toSelect = (v) => {
  state.selected = v;
  emit('update:modelValue', v)
};
// 计算属性

// 监听

// 卸载

// Map
</script>
<style lang="scss" scoped>
.OverviewArticle {
  min-width: 640px;
  .itemArea {
    &.active {
      background-color: $primary1;
    }
  }
  .detailArea {
    position: absolute;
    top: 0;
    left: 100px;
    right: 0;
    z-index: 2;
    background-color: $white9;
    transform: translateX(120%);
    transition: $trans3;
    box-shadow: 0 0 10px $dark1;
    @include backdrop();
    &.active {
      transform: translateX(0)
    }
  }
}
</style>
