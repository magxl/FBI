<template>
  <div class="VolumeHistory">
    <Table
      :loading="false"
      :list="state.list"
      :tool="false"
      nofooter
      height="300"
    >
      <el-table-column
        :label="$l('Country or Region')"
        prop="country"
        width="200"
      >
        <template #default="{ row }">
          <CountryItem :name="row.country" />
        </template>
      </el-table-column>
      <el-table-column :label="$l('Days')" prop="days" width="100">
      </el-table-column>
      <el-table-column :label="$l('Keyword')" prop="keywords">
      </el-table-column>
      <el-table-column :label="$l('Count')" prop="count" width="100">
      </el-table-column>
      <el-table-column :label="$l('Create Time')" prop="createTime" width="160">
      </el-table-column>
      <el-table-column :label="$l('Update Time')" prop="updateTime" width="160">
      </el-table-column>
      <el-table-column :label="$l('Operation')" fixed="right" width="100">
        <template #default="{ row, $index }">
          <div class="flexMode vc">
            <div class="mgbtn circle24" @click="toSearch(row, $index)">
              <i class="adicon ad-search1"></i>
            </div>
            <div class="mgbtn circle24 red" @click="toRemove($index)">
              <i class="adicon ad-remove"></i>
            </div>
          </div>
        </template>
      </el-table-column>
    </Table>
  </div>
</template>
<script setup>
// 定义
defineOptions({
  name: 'VolumeHistory',
});
// 传参
const prop = defineProps({
  search: {
    type: Object,
    default: Object.create(null),
  },
});
// 数据
const state = reactive({
  list: [],
});

// 挂载
onMounted(() => {
  state.list = JSON.parse(localStorage.getItem('VolumeSearch')) || [];
});
// 事件
const emit = defineEmits();
const toRemove = (i) => {
  state.list.splice(i, 1);
  toSave();
};
const toAdd = () => {
  state.list.unshift({
    ...prop.search,
    count: 1,
    key: +new Date(),
    createTime: window.$m().format('YYYY-MM-DD HH:mm:ss'),
  });
  toSave();
};
const toSearch = (row, i) => {
  state.list[i].count++;
  state.list[i].key = +new Date();
  state.list[i].updateTime = window.$m().format('YYYY-MM-DD HH:mm:ss');
  const list = state.list.sort((a, b) => b.key - a.key);
  state.list = list;
  toSave();
  emit('search', JSON.parse(JSON.stringify(row)));
};
const toSave = () => {
  const { list } = state;
  if (list.length > 20) {
    list.splice(0, 20);
  }
  localStorage.setItem('VolumeSearch', JSON.stringify(state.list));
};
// 计算属性

// 监听

// 卸载
defineExpose({
  toAdd,
});
// Map
</script>
<style lang="scss" scoped></style>
