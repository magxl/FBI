<template>
  <div v-if="topShow" class="TableTool h48 flexMode vc hb">
    <div class="flexGrow"><slot /></div>
    <div v-if="prop.tool !== false" class="flexMode vc noShrink pr20">
      <el-popover
        placement="bottom"
        :visible="state.filterVisible"
        :width="prop.filterWidth"
        popper-class="p0"
        :offset="8"
      >
        <template #reference>
          <el-badge :value="filterCount" :hidden="!filterCount">
            <div v-if="slots.filter" class="mgbtn circle30" @click="toToggleFilter">
              <i
                class="adicon ad-filter2 fs20"
                :class="state.filterVisible && 'txt-primary'"
              ></i>
            </div>
          </el-badge>
        </template>
        <div class="header flexMode vc hb p8 bg-white9">
          <div class="flexMode vc txt-dark7">
            <i class="adicon ad-filter1 fs18"></i>
            <span class="pl8 fs14">{{ $l('Filter') }}</span>
          </div>
          <div class="w24 h24" @click="toCloseFilter">
            <i class="adicon ad-close hover-txt-red"></i>
          </div>
        </div>
        <div class="p8">
          <slot name="filter" />
        </div>
      </el-popover>
      <template v-for="it in toolBtn">
        <div
          v-if="!it.hide"
          :key="it.action"
          class="mgbtn circle30"
          @click="toolEvent(it)"
        >
          <i :class="it.icon" class="fs20"></i>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup>
import { onDeactivated } from 'vue';

defineOptions({
  name: 'TableTool',
});
// 传参
const prop = defineProps({
  tool: {
    type: [Boolean, Object],
    default: () => {},
  },
  tableName: {
    type: String,
    default: '',
  },
  useActions: {
    type: Boolean,
    default: false,
  },
  topShow: {
    type: Boolean,
    default: false,
  },
  filterWidth: {
    type: [String, Number],
    default: 400,
  },
  filter: {
    type: Object,
    default: Object.create(null),
  },
});
const state = reactive({
  filterVisible: false,
});
const { proxy } = getCurrentInstance();

const emit = defineEmits();
// 挂载
onDeactivated(()=>{
  toCloseFilter();
})
// 事件
const toToggleFilter = () => {
  state.filterVisible = !state.filterVisible;
};
const toCloseFilter = () => {
  state.filterVisible = false;
};
const toolEvent = (it) => {
  switch (it.action) {
    case 'download':
      emit('toolEvent', 'download');
      break;
    case 'refresh':
      emit('toolEvent', 'refresh');
      break;
    case 'config':
      emit('toolEvent', 'config');
      break;
  }
};
// 计算属性
const slots = computed(() => {
  return proxy.$slots;
});
const defaultTool = computed(() => {
  return {
    filter: false,
    config: true,
    download: true,
    print: true,
    refresh: false,
    ...prop.tool,
  };
});
const toolBtn = computed(() => {
  const { config, download, print, refresh } = defaultTool.value;
  return [
    {
      label: 'Config',
      icon: 'adicon ad-config1',
      action: 'config',
      hide: !prop.tableName || !config,
    },
    {
      label: 'Download',
      icon: 'adicon ad-download1',
      action: 'download',
      hide: !download,
    },
    {
      label: 'Refresh',
      icon: 'adicon ad-refresh',
      action: 'refresh',
      hide: !refresh,
    },
  ];
});
const filterCount = computed(() => {
  let r = 0;
  Object.keys(prop.filter).forEach((it) => {
    let len = 0;
    const v = prop.filter[it];
    try {
      len = v.length || 0;
    } catch (error) {}
    if (len === 0) {
      if (!(v === null || v === undefined || v === '')) {
        r++;
      }
    } else {
      r++;
    }
  });
  return r;
});
// 监听

// 卸载
defineExpose({
  toCloseFilter,
});
</script>
<style lang="scss" scoped></style>
