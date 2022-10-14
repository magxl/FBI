<template>
  <div class="ToolFrameNav w64 bg-blue"></div>
</template>
<script setup>
defineOptions({
  name: 'ToolFrameNav',
});
import { reactive } from 'vue';
const state = reactive({});
</script>
<style lang="scss" scoped>
.ToolFrameNav {
  border-radius: 12px 3px 3px 12px;
}
</style>
