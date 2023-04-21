<template>
  <div class="MvcTabs">
    <el-tabs
      v-model="state.current"
      class="mgtabs"
      :class="prop.tabClass"
      @change="toChange"
    >
      <el-tab-pane
        v-for="it in tabs"
        :key="it.value"
        :label="$l(it.label)"
        :name="it.value"
      ></el-tab-pane>
    </el-tabs>
    <transition v-if="current.keepalive" name="mg">
      <keep-alive>
        <component
          :is="cpt"
          v-bind="$attrs"
          :params="current.params"
          :current="state.current"
        />
      </keep-alive>
    </transition>
    <component
      v-if="!current.keepalive"
      :is="cpt"
      v-bind="$attrs"
      :params="current.params"
      :current="state.current"
    />
  </div>
</template>
<script setup>
import { watchEffect } from 'vue';

// 定义
defineOptions({
  name: 'MvcTabs',
});
// 传参
const prop = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  tabs: {
    type: Array,
    default: () => [],
  },
  tabClass: {
    type: String,
    default: '',
  },
});
// 数据
const state = reactive({
  current: 0,
  valueKey: 'i',
});

// 挂载

// 事件
const emit = defineEmits();
const toChange = (v) => {
  emit('update:modelValue', v);
};
// 计算属性
const tabs = computed(() => {
  return prop.tabs.map((it, i) => {
    it.i = i;
    return it;
  });
});
const current = computed(() => {
  return prop.tabs.filter((ft) => ft[state.valueKey] === state.current)[0];
});
const cpt = computed(() => {
  return current.value.cpt;
});
// 监听
watchEffect(() => {
  console.info(prop.modelValue);
  if (prop.modelValue === 0 || prop.modelValue) {
    const type = window.$getType(prop.modelValue);
    if (type === 'String') {
      state.valueKey = 'value';
      // 使用value时，判断value是否存在tab，不存在则使用第一个tab
      if (prop.tabs[prop.modelValue]) {
        state.current = prop.modelValue;
      } else {
        state.current = prop.tabs[0].value;
      }
    } else {
      // 使用index时
      const len = prop.tabs;
      if (prop.defaultCurrent >= len) {
        state.current = len - 1;
      }
    }
  }
});
// 卸载

// Map
</script>
<style lang="scss" scoped></style>
