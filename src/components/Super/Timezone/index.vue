<template>
  <div class="SuperTimezone">
    <el-select
      v-model="state.timezone_name"
      filterable
      placeholder=" "
      @change="change"
    >
      <el-option
        v-for="(it, i) in timezoneOptions"
        :key="i"
        :label="it[labelName]"
        :value="it.label"
      >
        <div class="flexMode vc hb">
          <span>{{it[labelName]}}</span>
          <span>[{{it.value>0?'+'+it.value:it.value}}]</span>
        </div>
      </el-option>
    </el-select>
  </div>
</template>
<script setup>
defineOptions({
  name: 'SuperTimezone',
});
// 传参
const prop = defineProps({
  timezoneName: {
    type: String,
    default: 'Etc/GMT',
  },
  defaultLocal: {
    type: Boolean,
    default: false,
  },
});
import { reactive } from 'vue';
// 数据
const state = reactive({
  timezone: 0,
  timezone_name: '',
});
const store = inject('store');
const launch = store.launch();
// 计算属性

const timezoneOptions = computed(() => {
  return window.$map.common.timezoneOptions;
});
const labelName = computed(() => {
  return `label_${launch.lang}`;
});
// 监听

// 挂载
onMounted(() => {
  if(prop.defaultLocal){
    state.timezone_name = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // state.timezone = new Date().getTimezoneOffset() / -60;
  }else{
    state.timezone_name = prop.timezoneName;
  }
});
// 事件
const emit = defineEmits();
const change = (timezone_name) => {
  const timezone = timezoneOptions.value.filter(
    (it) => it.label === timezone_name,
  )[0].value;
  emit('update:modelValue', timezone);
  emit('update:timezone_name', timezone_name);
  emit('change', { timezone, timezone_name });
};
// 卸载
</script>
<style lang="scss" scoped></style>
