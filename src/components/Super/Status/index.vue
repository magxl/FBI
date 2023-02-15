<template>
  <div class="SuperStatus flexMode vc">
    <i class="adicon" :class="status.class"></i>
    <span class="pl4">{{ status[`label_${lang}`] }}</span>
  </div>
</template>
<script setup>
// 定义
defineOptions({
  name: 'SuperStatus',
});
// 传参
const prop = defineProps({
  status: {
    type: String,
    default: '',
  },
});
// 数据
const store = inject('store');
const launch = store.launch();
// 挂载

// 事件

// 计算属性
const status = computed(() => {
  return (
    maps[prop.status] || {
      class: 'ad-loading txt-dark1',
      label_en_us: 'Loading',
      label_zh_cn: '载入',
    }
  );
});
const lang = computed(() => {
  return launch.lang;
});
// 监听

// maps
const maps = {
  RUNNING: {
    class: 'ad-dot txt-green',
    label_en_us: 'Running',
    label_zh_cn: '运行',
  },
  ENABLED: {
    class: 'ad-dot txt-green',
    label_en_us: 'Enabled',
    label_zh_cn: '启用',
  },
  ACTIVE: {
    class: 'ad-dot txt-green',
    label_en_us: 'Active',
    label_zh_cn: '激活',
  },
  NOT_RUNNING: {
    class: 'ad-pause txt-dark7',
    label_en_us: 'Not Running',
    label_zh_cn: '暂停',
  },
  PAUSED: {
    class: 'ad-pause txt-dark7',
    label_en_us: 'Paused',
    label_zh_cn: '暂停',
  },
  DELETED: {
    class: 'ad-forbid txt-red',
    label_en_us: 'Deleted',
    label_zh_cn: '删除',
  },
  REMOVED: {
    class: 'ad-forbid txt-red',
    label_en_us: 'Removed',
    label_zh_cn: '删除',
  },
  ON_HOLD: {
    class: 'ad-dot txt-orange',
    label_en_us: 'On Hold',
    label_zh_cn: '搁置',
  },
};

// 卸载
</script>
<style lang="scss" scoped></style>
