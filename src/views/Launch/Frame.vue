<template>
  <div class="Frame">
    <router-view></router-view>
  </div>
</template>
<script setup>
defineOptions({
  name: 'Frame',
});
import { reactive } from 'vue';
const state = reactive({});
</script>
<style lang="scss" scoped></style>
