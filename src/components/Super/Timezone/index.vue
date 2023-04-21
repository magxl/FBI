<template>
  <div class="SuperTimezone">
    <el-select
      v-model="state.timezone_name"
      filterable
      placeholder=" "
      @change="change"
    >
      <template v-if="timezone" #prefix> [{{ timezone }}] </template>
      <el-option
        v-for="(it, i) in timezoneOptions"
        :key="i"
        :label="it[labelName]"
        :value="it.label"
      >
        <div class="flexMode vc hb">
          <span>{{ it[labelName] }}</span>
          <span>[{{ it.value > 0 ? '+' + it.value : it.value }}]</span>
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
    validate: (v) => {
      return window.$map.common.timezoneOptions[v];
    },
  },
  defaultLocal: {
    type: Boolean,
    default: false,
  },
});
// 数据
const state = reactive({
  timezone: 0,
  timezone_name: '',
});
const store = inject('store');
// 计算属性
const timezone = computed(() => {
  if (state.timezone > 0) {
    return `+${state.timezone}`;
  } else {
    return state.timezone;
  }
});

const labelName = computed(() => {
  return `label_${window.$getLang()}`;
});
// 监听

// 挂载
onMounted(() => {
  if (prop.defaultLocal) {
    state.timezone_name = Intl.DateTimeFormat().resolvedOptions().timeZone;
    state.timezone = new Date().getTimezoneOffset() / -60;
  } else {
    const timezone = timezoneOptions[prop.timezoneName].value;
    state.timezone_name = prop.timezoneName;
    state.timezone = timezone;
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

// Maps
const timezoneOptions = window.$map.common.timezoneOptions;
</script>
<style lang="scss" scoped></style>
