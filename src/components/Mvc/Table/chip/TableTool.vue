<template>
  <div v-if="topShow" class="TableTool h48 flexMode vc hb">
    <div class="flexGrow"><slot /></div>
    <div v-if="prop.tool !== false" class="flexMode vc noShrink pr20">
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
defineOptions({
  name: 'TableTool',
});
import { reactive } from 'vue';
// 数据
const state = reactive({});
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
});
const emit = defineEmits();

// 计算属性
const defaultTool = computed(() => {
  return {
    filter: true,
    download: true,
    print: true,
    refresh: false,
    ...prop.tool,
  };
});
const toolBtn = computed(() => {
  const { filter, download, print, refresh } = defaultTool.value;
  return [
    {
      label: 'Filter',
      icon: 'adicon ad-config1',
      action: 'filter',
      hide: !prop.tableName || !filter,
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
// 监听

// 挂载

// 事件

const toolEvent = (it) => {
  switch (it.action) {
    case 'download':
      emit('toolEvent', 'download');
      break;
    case 'refresh':
      emit('toolEvent', 'refresh');
      break;
    case 'filter':
      emit('toolEvent', 'filter');
      break;
  }
};
// 卸载
</script>
<style lang="scss" scoped></style>
