<template>
  <div class="WePoem Page">
    <VPLaunch />
  </div>
</template>
<script setup>
import VPLaunch from './WePoem/VPLaunch.vue';
defineOptions({
  name: 'WePoem',
  components: { VPLaunch },
});
import { reactive } from 'vue';
const state = reactive({});
</script>
<style lang="scss" scoped></style>
