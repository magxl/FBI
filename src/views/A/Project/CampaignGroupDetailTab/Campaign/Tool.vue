<template>
  <div class="DetailTabCampaignTableTool flexMode vc p0-16">
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
          >
            {{ it[`label_${lang}`] }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <!-- update -->
    <!-- download -->
    <el-dropdown
      trigger="click"
      placement="bottom-start"
      @command="downloadCommand"
      @visible-change="downloadChange"
    >
      <el-button plaintype="primary" class="ml8">
        <span class="pr4">{{ $l('Download') }}</span>
        <i class="adicon ad-arrow-down fs14"></i>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="(it, i) in downloadOptions"
            :key="i"
            :command="it.value"
          >
            {{ it[`label_${lang}`] }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <!-- download -->
  </div>
</template>
<script setup>
// 定义
defineOptions({
  name: 'DetailTabCampaignTableTool',
});
// 数据
const state = reactive({});

// 挂载

// 事件
const toCreate = () => {};
// 计算属性
const lang = computed(() => {
  return window.$getLang();
});
// 监听

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
const updateOptions = [
  {
    label: 'Daily Cap',
    label_en_us: 'Daily Cap',
    label_zh_cn: '日预算',
    value: 0,
  },
];
const downloadOptions = [
  {
    label: 'By Date',
    label_en_us: 'By Date',
    label_zh_cn: '根据日期',
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
