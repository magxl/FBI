<template>
  <div class="99Table">
    <div class="p10">
      <span class="txt-dark7 pr10">乘法表</span>
      <span>{{ state.arr }}</span>
    </div>
    <div class="p10 flexMode">
      <div v-for="(it, i) in state.list" :key="i" class="w72">
        <div v-for="(itt, j) in it" :key="j">{{ itt || '　' }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineOptions({
  name: '99Table',
});
import { reactive } from 'vue';
const state = reactive({
  arr: [],
  list: [],
});
// 快速创建数组
state.arr = Array.from({ length: 9 }, (it, i) => i + 1);
const len = state.arr.length;
// 生成乘法表
for (let i = 1; i <= len; i++) {
  state.list[i - 1] = state.list[i - 1] || [];
  for (let j = 1; j <= len; j++) {
    if (j < i) {
      state.list[i - 1].push('');
    } else {
      state.list[i - 1].push(`${i}x${j}=${i * j}`);
    }
  }
}
</script>
<style lang="scss" scoped></style>
