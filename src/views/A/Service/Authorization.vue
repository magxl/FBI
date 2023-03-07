<template>
  <Page title="Authorization" class="Authorization">
    <Table
      ref="table"
      :loading="state.loading"
      :list="state.list"
      table-name="Authorization"
    >
      <template #actions>
        <div class="flexMode vc p0-16">
          <DatePicker
            v-model="state.search.date"
            :shortcuts="true"
            class="w240"
          />
          <div class="pl8">
            <el-select
              v-model="state.search.client"
              clearable
              :placeholder="$l('Client Name')"
            >
              <el-option
                v-for="(it, i) in clientOptions"
                :key="i"
                :label="it.label"
                :value="it.value"
              />
            </el-select>
          </div>
        </div>
      </template>
      <el-table-column label="ID" prop="id" width="80" />
      <el-table-column
        :label="$l('Client')"
        prop="client"
        width="120"
        sortable
      />
      <el-table-column
        :label="$l('Campaign Group')"
        prop="orgName"
        width="200"
        sortable
      />
      <el-table-column :label="$l('Org ID')" prop="orgId" width="100" />
      <el-table-column :label="$l('App ID')" prop="appId" width="100" />
      <el-table-column :label="$l('Start Date')" prop="startDate" width="120" />
      <el-table-column
        :label="$l('Expire Date')"
        prop="expireDate"
        width="120"
      />
      <el-table-column
        :label="$l('Currency')"
        prop="currency"
        width="96"
        align="right"
        sortable
      />
      <el-table-column
        :label="$l('Spend(All)')"
        prop="spendAll"
        width="120"
        align="right"
        sortable
      />
      <el-table-column
        :label="$l('Spend(Result)')"
        prop="spendResult"
        width="140"
        align="right"
        sortable
      />
    </Table>
  </Page>
</template>
<script setup>
// 定义
defineOptions({
  name: 'Authorization',
});
// 数据
const state = reactive({
  loading: false,
  search: {},
  list: [],
});

// 挂载
onMounted(() => {
  getData();
});
// 事件
const getData = async () => {
  const total = window.$rn(100);
  const list = window.$fd(total, (i) => {
    const id = i + 1;
    const spendAll = (window.$rn(999999999, 100) / 100).toFixed(2);
    return {
      id,
      client: 'Client ' + id,
      orgName: 'Org ' + id,
      orgId: window.$rn(88888888, 11111111),
      appName: 'App ' + id,
      appId: window.$rn(88888888, 11111111),
      startDate: '2023-01-01',
      expireDate: '2023-01-01',
      currency: window.$rn(2) ? '$' : '¥',
      spendAll: window.$fa(spendAll, 2),
      spendResult: window.$fa(
        (window.$rn(spendAll * 100, 100) / 100).toFixed(2),
        2,
      ),
    };
  });
  state.list = list;
};
// 计算属性

// 监听

// 卸载

// Map
const clientOptions = [];
</script>
<style lang="scss" scoped></style>
