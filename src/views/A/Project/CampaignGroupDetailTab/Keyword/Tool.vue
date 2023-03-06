<template>
  <div class="DetailTabKeywordTableTool flexMode vc p0-16">
    <el-button
      plain
      type="primary"
      circle
      @click="toCreate"
      class="hoverBtn"
      :txt="$l('Create')"
    >
      <template #icon>
        <i class="adicon ad-plus"></i>
      </template>
    </el-button>
    <!-- create -->
    <!-- aggregation -->
    <el-button
      plain
      circle
      type="primary"
      @click="toAggregation"
      class="hoverBtn width80"
      :txt="$l('Aggregation')"
    >
      <template #icon>
        <i class="adicon ad-aggregation"></i>
      </template>
    </el-button>
    <!-- aggregation -->
    <!-- status -->
    <el-dropdown
      trigger="click"
      placement="bottom-start"
      @command="statusCommand"
      @visible-change="statusChange"
    >
      <el-button plaintype="primary" class="ml8">
        <span class="pr4">{{ $l('Status') }}</span>
        <i class="adicon ad-arrow-down fs14"></i>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="(it, i) in statusOptions"
            :key="i"
            :command="it.value"
            :divided="it.divided"
          >
            <Status :status="it.label" />
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <!-- status -->
    <!-- update -->
    <el-dropdown
      trigger="click"
      placement="bottom-start"
      @command="updateCommand"
      @visible-change="updateChange"
    >
      <el-button plaintype="primary" class="ml8">
        <span class="pr4">{{ $l('Update') }}</span>
        <i class="adicon ad-arrow-down fs14"></i>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="(it, i) in updateOptions"
            :key="i"
            :command="it.value"
            :divided="it.divided"
          >
            {{ it[`label_${lang}`] }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <!-- update -->
    <Drawer v-model:current="state.currentDrawer" :drawer="state.drawer" />
  </div>
</template>
<script setup>
import Create from './Create.vue';
// 定义
defineOptions({
  name: 'DetailTabKeywordTableTool',
});
// 传参
const prop = defineProps({
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
      size: 1000,
      cpt: Create,
    },
  ],
});

// 挂载

// 事件
const toCreate = () => {
  state.drawer[0].title = window.$l('Create Keyword');
  state.drawer[0].params = { orginfo: prop.orginfo };
  state.currentDrawer = 0;
};
// 计算属性
const lang = computed(() => {
  return window.$getLang();
});
// 监听
const updateOptions = computed(() => {
  return updateMap;
});
// 卸载

// Map

const statusOptions = [
  {
    label: 'ACTIVE',
    value: 1,
  },
  {
    label: 'PAUSED',
    value: 0,
    divided: true,
  },
];
const updateMap = [
  {
    label: 'CPT Bid',
    label_en_us: 'CPT Bid',
    label_zh_cn: 'CPT Bid',
    value: 0,
  },
  {
    label: 'CPA Goal',
    label_en_us: 'CPA Goal',
    label_zh_cn: 'CPA Goal',
    value: 1,
  },
  {
    label: 'Search Match',
    label_en_us: 'Search Match',
    label_zh_cn: 'Search Match',
    value: 2,
  },
  {
    label: 'Reach All Eligibel Users',
    label_en_us: 'Reach All Eligibel Users',
    label_zh_cn: 'Reach All Eligibel Users',
    value: 3,
    divided: true,
  },
  {
    label: 'Age',
    label_en_us: 'Age',
    label_zh_cn: '年龄',
    value: 4,
    divided: true,
  },
  {
    label: 'Gender',
    label_en_us: 'Gender',
    label_zh_cn: '性别',
    value: 5,
  },
  {
    label: 'Device',
    label_en_us: 'Device',
    label_zh_cn: '设备',
    value: 6,
  },
  {
    label: 'Customer Type',
    label_en_us: 'Customer Type',
    label_zh_cn: '用户类型',
    value: 7,
  },
  {
    label: 'Category',
    label_en_us: 'Category',
    label_zh_cn: '分类',
    value: 8,
  },
];
const downloadOptions = [
  {
    label: 'CPA Goal',
    label_en_us: 'CPA Goal',
    label_zh_cn: 'CPA Goal',
    value: 0,
  },
  {
    label: 'By Country',
    label_en_us: 'By Country',
    label_zh_cn: '根据国家地区',
    value: 1,
  },
  {
    label: 'By Date & Country',
    label_en_us: 'By Date & Country',
    label_zh_cn: '根据日期和国家地区',
    value: 2,
  },
  {
    label: 'By Campaign',
    label_en_us: 'By Campaign',
    label_zh_cn: '根据广告组',
    value: 3,
  },
  {
    label: 'By Campaign & Date',
    label_en_us: 'By Campaign & Date',
    label_zh_cn: '根据日期和广告组',
    value: 4,
  },
];
</script>
<style lang="scss" scoped></style>
