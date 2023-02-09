<template>
  <div class="ChartDetailAppPurchase">
    <div class="p16">
      <div class="flexMode vc fs14 pb16">
        <span>{{ $l('Purchase') }}</span>
        <span class="pl8 fs12 txt-dark5">({{ prop.info.purchaseList.length }})</span>
      </div>
      <div class="border-l border-t border-r">
        <el-table :data="prop.info.purchaseList" size="small">
          <el-table-column :label="$l('Name')" prop="name"></el-table-column>
          <el-table-column :label="$l('Price')" prop="price"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue';
defineOptions({
  name: 'ChartDetailAppPurchase',
});
// 传参
const prop = defineProps({
  info: {
    type: Object,
    default: () => {},
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
