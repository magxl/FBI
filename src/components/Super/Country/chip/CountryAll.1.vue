<template>
  <div class="SuperCountryAll">
    <el-select
      v-if="state.mounted"
      v-model="state.v"
      filterable
      v-bind="$attrs"
      :placeholder="$l('Country or Regions')"
      @change="change"
      class="wp100"
    >
      <template v-if="prefix" #prefix>
        <span class="areaicon" :class="`area-${prefix}`" />
      </template>
      <el-option label="All" value="all">
        <div class="flexMode vc hb">
          <span>All</span>
          <span class="fs12 txt-dark5">x{{ total }}</span>
        </div>
      </el-option>
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
const emit = defineEmits();
const change = (v) => {
  console.info(v);
  nextTick(() => {
    const lastItem = v[v.length - 1];
    if (lastItem === 'all') {
      if (state.v.length - 1 === total.value) {
        // 已全选，则反选
        state.v = '';
      } else {
        const ids = getValue(options.value).flat();
        state.v = ids;
      }
      emit('update:modelValue', state.v);
    }
  });
};
const getValue = (v) => {
  return v.map((it) => {
    if (it.children?.length) {
      return getValue(it.children);
    }
    return it.value;
  });
};
// 计算属性
const options = computed(() => {
  return window.$map.country.countryAll;
});
const total = computed(() => {
  return getValue(options.value).flat().length;
});

const lang = computed(() => {
  return window.$getLang();
});
const prefix = computed(() => {
  if (window.$getType(state.v) === 'String') {
    return state.v.toLowerCase();
  } else {
    return '';
  }
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
