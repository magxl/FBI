<template>
  <div class="DetailTabSearchTermTableTool flexMode vc p0-16">
    <!-- create -->
    <el-dropdown
      trigger="click"
      placement="bottom-start"
      @command="createCommand"
      @visible-change="createChange"
    >
      <el-button plain circle type="primary">
        <i class="adicon ad-plus"></i>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="(it, i) in createOptions"
            :key="i"
            :command="it.value"
            :divided="it.divided"
          >
            {{ it[`label_${lang}`] }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <!-- create -->
    <Drawer v-model:current="state.currentDrawer" :drawer="state.drawer" />
  </div>
</template>
<script setup>
import Add from './Add.vue';
// 定义
defineOptions({
  name: 'DetailTabSearchTermTableTool',
  components: { Add },
});
// 传参
const prop = defineProps({
  selection: {
    type: Array,
    default: () => [],
  },
  orginfo: {
    type: Object,
    default: Object.create(null),
  },
});
// 数据
const state = reactive({
  currentDrawer: '',
  drawer: [
    {
      title: '',
      size: 500,
      cpt: Add,
    },
  ],
});
const {proxy} = getCurrentInstance();
// 挂载

// 事件
const createCommand = (type) => {
  console.info(type);
  if (prop.selection.length) {
    state.drawer[0].title = window.$l('Create From Search Term');
    state.drawer[0].params = {
      selection: prop.selection,
      orginfo: prop.orginfo,
      type,
    };
    state.currentDrawer = 0;
  } else {
    proxy.$message.info($l('noselection'));
  }
};
const createChange = (v) => {};
// 计算属性
const lang = computed(() => {
  return window.$getLang();
});
// 监听

// 卸载

// Map

const createOptions = [
  {
    label: 'Add to Keyword',
    label_en_us: 'Add to Keyword',
    label_zh_cn: '加入关键词',
    value: 0,
  },
  {
    label: 'Add to Negative',
    label_en_us: 'Add to Negative',
    label_zh_cn: '加入否定词',
    value: 1,
    divided: true,
  },
];
</script>
<style lang="scss" scoped></style>
