<template>
  <div class="ToolFrame flexMode vs absCenter">
    <ToolFrameNav />
    <div class="ToolFrameBody">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
import ToolFrameNav from './ToolFrameNav.vue';
defineOptions({
  name: 'ToolFrame',
  components: { ToolFrameNav },
});
import { reactive } from 'vue';
const state = reactive({});
</script>
<style lang="scss" scoped>
.ToolFrame {
  width: 1000px;
  height: 720px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: $dark1 0 40px 20px, $blue1 0 20px 20px;
  .ToolFrameBody {
    width: calc(100% - 64px);
  }
}
</style>
