<template>
  <div class="SuperCountryAso">
    <el-select
      v-model="state.v"
      v-bind="$attrs"
      filterable
      :placeholder="$l('Country or Regions')"
    >
      <template v-if="state.v.length" #prefix>
        <span class="areaicon" :class="'area-' + state.v.toLowerCase()" />
      </template>
      <el-option
        v-for="(it, i) in options"
        :key="it.value"
        :label="it[`label_${lang}`]"
        :value="it.value"
      >
        <div class="flexMode vc">
          <span class="areaicon" :class="'area-' + it.value_lower"></span>
          <span class="pl8 fs12">{{ it[`label_${lang}`] }}</span>
        </div>
      </el-option>
    </el-select>
  </div>
</template>
<script setup>
import { reactive } from 'vue';
defineOptions({
  name: 'SuperCountryAso',
});
// 传参
const prop = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});
const store = inject('store');
const launch = store.launch();
// 数据
const state = reactive({
  v: '',
});

// 计算属性
const options = computed(() => {
  return window.$map.country.countryLang;
});
const lang = computed(() => {
  return launch.lang;
});
// 监听

watch(
  () => prop.modelValue,
  (n, o) => {
    if (n !== o) {
      state.v = n;
    }
  },
  {
    immediate: true,
  },
);
// 挂载
// 事件

// 卸载
</script>
