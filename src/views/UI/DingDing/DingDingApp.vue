<template>
  <div class="DingDingApp w160 noShrink bg-littleBlue">
    <div class="logoArea p10">
      <div class="flexMode vc p8 pr0 hover-bg-dark1 radius4">
        <div class="w24 h24 bg-blue1 radius4"></div>
        <div class="w80 pl4 fs12 txt-dark5 txt-nowrap">
          北京小苗财税服务有限公司
        </div>
      </div>
    </div>
    <div class="p0-10">
      <div
        v-for="(it, i) in state.apps"
        :key="i"
        class="flexMode vc hb p10 mb4 hover-bg-dark1 radius4"
        :class="state.active === i ? 'txt-blue bg-dark1' : ''"
      >
        <div class="flexMode vc">
          <i class="vicon" :class="it.icon" />
          <span class="pl10 fs14 lh14">{{ it.label }}</span>
        </div>
        <div v-if="it.tag">
          <el-tag round type="error" effect="dark" size="small">{{
            it.tag
          }}</el-tag>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineOptions({
  name: 'DingDingApp',
});
import { reactive } from 'vue';
const state = reactive({
  apps: [],
  active: 0,
});

state.apps = [
  {
    label: '消息',
    icon: 'vite-home',
    tag: 10,
  },
  {
    label: '文档',
    icon: 'vite-home',
  },
  {
    label: '工作台',
    icon: 'vite-home',
  },
  {
    label: '通讯录',
    icon: 'vite-home',
  },
  {
    label: '会议',
    icon: 'vite-home',
  },
  {
    label: '云盘',
    icon: 'vite-home',
  },
  {
    label: '日历',
    icon: 'vite-home',
  },
  {
    label: '待办',
    icon: 'vite-home',
  },
  {
    label: 'DING',
    icon: 'vite-home',
  },
  {
    label: '项目',
    icon: 'vite-home',
  },
  {
    label: '邮箱',
    icon: 'vite-home',
  },
  {
    label: '钉钉搭',
    icon: 'vite-home',
  },
  {
    label: '收藏',
    icon: 'vite-home',
  },
  {
    label: '更多',
    icon: 'vite-home',
  },
];
</script>
<style lang="scss" scoped></style>
