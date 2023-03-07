<template>
  <div class="CustomReportChart">
    <div class="flexMode vc h48 pl16 border-b">
      <div class="w240 pr8">
        <el-date-picker
          v-model="state.date"
          class="wp100"
          type="daterange"
          range-separator="~"
          value-format="YYYY-MM-DD"
          end-placeholder="End Date"
          start-placeholder="Start Date"
          :disabled-date="(t) => +t > +new Date() - 86400000"
          @change="dateChange"
          size="small"
        />
      </div>
      <div class="pr8">
        <Country v-model="state.search.country" />
      </div>
      <div class="pr8">
        <el-select
          v-model="state.search.spend"
          clearable
          :placeholder="$l('Spend')"
          size="small"
        >
          <el-option
            v-for="(it, i) in spendMap"
            :key="i"
            :label="it.label"
            :value="it.value"
          />
        </el-select>
      </div>
      <div class="pr8">
        <el-button plain type="primary" @click="toSearch">
          <template #icon>
            <i class="adicon ad-search1"></i>
          </template>
        </el-button>
      </div>
    </div>
    <!-- ↑ search ↑ -->
    <div v-if="state.options.series" class="chartArea border-b">
      <EChart :options="state.options" height="300" />
    </div>
    <div v-else class="border-b h300">
      <div class="emptyBg">
        <span class="fs64 txt-dark1">Chart Area</span>
      </div>
    </div>
    <!-- ↑ chart ↑ -->
    <Table ref="table" :load-data="loadData" minus-height="-88">
      <el-table-column label="ID" prop="ID" width="100" />
      <el-table-column label="Date" prop="Date" width="120" />
      <el-table-column label="Name" prop="Name" width="240" />
      <el-table-column label="Number" prop="Number" width="120" />
      <el-table-column label="-" />
    </Table>
  </div>
</template>
<script setup>
import { reactive } from 'vue';
// 定义
defineOptions({
  name: 'CustomReportChart',
});
// 数据
const state = reactive({
  search: {},
  date: [],
  options: {},
});
// 计算属性

// 监听

// 挂载
onMounted(() => {
  initDate();
  initChart();
});
// 事件
const initDate = () => {
  state.date = [
    window.$moment().add(-7, 'day').format('YYYY-MM-DD'),
    window.$moment().add(-1, 'day').format('YYYY-MM-DD'),
  ];
};
const dateChange = (v) => {
  state.search.day = v[0] + '-' + v[1];
};
const toSearch = () => {};
const initChart = () => {
  state.options = {};
};
const loadData = async () => {
  const total = 30;
  const list = window.$fd(total, (i) => {
    const index = i + 1;
    return {
      ID: index,
      Date: window.$moment().add(window.$rn(0, 10), 'day').format('YYYY-MM-DD'),
      Name: 'Name' + index,
      Number: window.$rn(9999),
    };
  });
  return {
    list,
    total,
  };
};
// 卸载
</script>
<style lang="scss" scoped></style>
