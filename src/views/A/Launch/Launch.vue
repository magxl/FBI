<template>
  <div class="Launch hp100">
    <div class="searchArea flexMode hc">
      <el-input
        v-model="state.search"
        size="large"
        round
        clearable
        placeholder="搜索"
      />
    </div>
    <div class="coverArea">
      <CoverArea />
    </div>
  </div>
</template>
<script setup>
import CoverArea from './CoverArea/index.vue';
console.info('Launch loaded');
defineOptions({
  name: 'Launch',
  components: { CoverArea },
});
import { inject, reactive, ref } from 'vue';
const store = inject('store');
const { launch } = store;
const { title } = launch();
const Launch = ref(title);
const state = reactive({
  search: '',
});
</script>
<style lang="scss" scoped>
.searchArea {
  position: fixed;
  top: 200px;
  left: 50%;
  width: 720px;
  transform: translateX(-50%);
  z-index: 2;
  :deep(.el-input__inner) {
    height: 64px;
    font-size: 20px;
    text-align: center;
  }
  :deep(.el-input__wrapper) {
    border-radius: 32px;
    background-color: $white9;
    box-shadow: 0 0 10px $blue1;
    @include backdrop();
    &.is-focus {
      box-shadow: 0 0 20px $blue3, 0 0 3px $blue inset;
    }
    .el-input__suffix {
      position: absolute;
      right: 20px;
      i {
        font-size: 24px;
      }
    }
  }
}
.coverArea {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}
</style>
