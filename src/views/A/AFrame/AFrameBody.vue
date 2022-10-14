<template>
  <div class="AFrameBody">
      <transition name="fade" :key="$route.meta.key">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component
              v-if="$route.meta.keepalive"
              :is="Component"
              :key="$route.meta.key"
            />
          </keep-alive>
          <component
            v-if="!$route.meta.keepalive"
            :key="$route.meta.key"
            :is="Component"
          />
        </router-view>
      </transition>
  </div>
</template>
<script setup>
defineOptions({
  name: 'AFrameBody',
});
import { reactive } from 'vue';
// 数据
const state = reactive({});

// 计算属性

// 监听

// 挂载

// 事件

// 卸载
</script>
<style lang="scss" scoped>
.AFrameBody {
  margin: 4px 0 0 4px;
  height: calc(100% - 60px);
  overflow: hidden;
  background-color: $white;
  border-radius: 8px 0 0 0;
}
</style>
