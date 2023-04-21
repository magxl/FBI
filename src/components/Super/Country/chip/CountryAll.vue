<template>
  <div class="SuperCountryAll relative">
    <el-cascader
      v-model="state.v"
      :options="options"
      :props="cascaderProps"
      clearable
      filterable
      :placeholder="$l('Country or Regions')"
      class="wp100"
      v-bind="$attrs"
    />
  </div>
</template>
<script setup>
import { reactive } from 'vue';
defineOptions({
  name: 'SuperCountryAll',
});
// 传参
const prop = defineProps({
  modelValue: {
    type: [String, Array],
    default: '',
  },
});

// 数据
const state = reactive({
  mounted: false,
  v: '',
  seted: false,
});
const { proxy } = getCurrentInstance();

// 挂载
onMounted(() => {
  state.mounted = true;
});
// 事件

const getValue = (v) => {
  return v.map((it) => {
    if (it.children?.length) {
      return getValue(it.children);
    }
    return it.value;
  });
};
// 计算属性
const cascaderProps = computed(() => {
  return {
    multiple: multiple.value,
    emitPath: false,
    checkStrictly: false
  }
 });
const options = computed(() => {
  return window.$map.country.countryAll;
});

const multiple = computed(() => {
  return proxy.$attrs.multiple !== undefined;
});
// 监听

watch(
  () => prop.modelValue,
  (n, o) => {
    if (!state.seted) {
      if (n) {
        state.v = n;
        state.seted = true;
      } else {
        if (multiple.value) {
          state.v = [];
        }
      }
    }
  },
  {
    immediate: true,
  },
);
// 卸载
</script>
