<template>
  <div class="SuperCountryAll">
    <el-select
      v-model="state.v"
      v-bind="$attrs"
      filterable
      :placeholder="$l('Country or Regions')"
    >
      <template v-if="state.v.length" #prefix>
        <span
          v-if="prefix.length===1"
          class="areaicon"
          :class="'area-' + prefix[0]"
        />
      </template>
      <el-option-group
        v-for="(it, i) in options"
        :label="it[`label_${lang}`]"
        :key="it.value"
      >
        <el-option
          v-for="(ot, o) in it.children"
          :key="ot.value"
          :label="ot[`label_${lang}`]"
          :value="ot.value"
        >
          <div class="flexMode vc">
            <span class="areaicon" :class="ot.icon"></span>
            <span class="pl8 fs12">{{ ot[`label_${lang}`] }}</span>
          </div>
        </el-option>
      </el-option-group>
    </el-select>
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
  return window.$map.country.countryAll;
});
const lang = computed(() => {
  return launch.lang;
});
const prefix = computed(() => {
  if (window.$getType(state.v) === 'String') {
    return [state.v.toLowerCase()];
  } else {
    return state.v.map((it) => it.toLowerCase());
  }
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
