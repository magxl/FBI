<template>
  <div
    class="DialogHeader relative flexMode vc hb h56 wp100 p0-10 noShrink border-b-dark1"
  >
    <div class="infoArea relative flexMode vc noShrink txt-nowrap">
      <Avatar :avatar="headerInfo.avatar" type="small" />
      <div class="pl10">
        <div class="flexMode vc">
          <span class="fs14">{{ headerInfo.name }}</span>
          <span class="pl10 txt-dark3 fs12">{{ headerInfo.status }}</span>
        </div>
        <div class="txt-dark3 fs12">
          {{ headerInfo.name }}({{ headerInfo.department }})
        </div>
      </div>
    </div>
    <div class="flexMode vc">
      <div
        v-for="(it, i) in state.btns"
        :key="i"
        class="flexMode hc vc ml10 w32 h32 radius4 hover-bg-dark1"
      >
        <el-tooltip placement="bottom" :content="it.label">
          <i class="vicon" :class="it.icon" />
        </el-tooltip>
      </div>
    </div>
  </div>
</template>
<script setup>
import Avatar from '../chip/Avatar.vue';
defineOptions({
  name: 'DialogHeader',
  components: { Avatar },
});
import { reactive, inject, computed } from 'vue';
const store = inject('store');
const state = reactive({
  btns: [],
});

const headerInfo = computed(() => {
  return store.dingding().dialogHeaderInfo;
});

state.btns = [
  {
    label: '文件',
    icon: 'vite-home',
  },
  {
    label: '聊天记录',
    icon: 'vite-home',
  },
  {
    label: '添加成员',
    icon: 'vite-home',
  },
  {
    label: '设置',
    icon: 'vite-home',
  },
];
</script>
<style lang="scss" scoped>
.infoArea {
  width: calc(100% - 168px);
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 30px;
    box-shadow: $littleGray -30px 0 30px inset;
  }
}
</style>
