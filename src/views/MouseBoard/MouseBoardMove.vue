<template>
  <MainBoard :options="options" />
</template>
<script setup>
import MainBoard from './chip/MainBoard.vue';
defineOptions({
  name: 'MouseBoardMove',
  components: { MainBoard },
});
import { reactive } from 'vue';
const options = reactive({
  type: 'h5',
});
</script>
<style lang="scss" scoped></style>
