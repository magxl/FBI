<template>
  <div class="FrameNav w64 bg-blue"></div>
</template>
<script setup>
defineOptions({
  name: 'FrameNav',
});
import { reactive } from 'vue';
const state = reactive({});
</script>
<style lang="scss" scoped>
.FrameNav {
  border-radius: 12px 3px 3px 12px;
}
</style>
