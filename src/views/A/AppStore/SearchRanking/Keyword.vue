<template>
  <div class="SearchRankingKeyword p16">
    <div class="Card w240">
      <div class="CardBody pb16">
        <el-table size="small" :data="prop.keywords">
          <el-table-column :label="$l('Keyword')" prop="keyword"></el-table-column>
          <el-table-column :label="$l('Volume')" prop="volume"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue';
defineOptions({
  name: 'SearchRankingKeyword',
});
// 传参
const prop = defineProps({
  keywords: {
    type: Array,
    default: () => [],
  },
});
// 数据
const state = reactive({});

// 计算属性

// 监听

// 挂载

// 事件

// 卸载
</script>
<style lang="scss" scoped></style>
