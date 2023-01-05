<template>
  <div class="MvcCard" :class="noshadow">
    <div v-if="slots.header || prop.title" class="cardHeader">
      <div v-if="prop.title" class="txt-blob">{{ prop.title }}</div>
      <slot v-else name="header" />
    </div>
    <div class="cardBody">
      <slot />
    </div>
    <div v-if="slots.footer" class="cardFooter">
      <slot name="footer" />
    </div>
  </div>
</template>
<script setup>
defineOptions({
  name: 'MvcCard',
});
import { reactive } from 'vue';
// 传参
const prop = defineProps({
  title: {
    type: String,
    default: '',
  },
  noshadow: {
    type: Boolean,
    default: false
  }
});
const { proxy } = getCurrentInstance();
// 数据
const state = reactive({});

// 计算属性
const slots = computed(() => {
  return proxy.$slots;
});
// 监听

// 挂载

// 事件

// 卸载
</script>
<style lang="scss" scoped>
.MvcCard {
  border-radius: 8px;
  background-color: $white;
  box-shadow: 0 5px 20px $dark1;
  &.noshadow {
    box-shadow: none;
  }
  .cardHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 48px;
    padding: 0 16px;
    border-radius: 8px 8px 0 0;
    border-bottom: 1px solid $dark1;
  }
  .cardFooter {
    padding: 12px 16px;
    border-radius: 0 0 8px 8px;
    border-top: 1px solid $dark1;
  }
}
</style>
