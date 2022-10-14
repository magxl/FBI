<template>
  <router-view />
</template>
<script setup>
console.info('Launch Frame');
defineOptions({
  name: 'Frame',
});
import { reactive } from 'vue';
const state = reactive({});
</script>
<style lang="scss" scoped></style>
