<template>
  <Page title="Ranking Keywords" class="Ranking">
    <Table ref="table" :load-data="loadData" table-name="Ranking">
      <template #actions>
        <div class="flexMode vc p0-16">
          <div class="flexMode vc w240 pr10">
            <el-select
              ref="appidSelector"
              class="wp100"
              v-model="state.search.app_id"
              multiple
              clearable
              filterable
              allow-create
              collapse-tags
              :multiple-limit="5"
              :placeholder="$l('APP ID: up to 5')"
              @visible-change="appidVisibleChange"
              @change="appidChange"
            >
              <el-option
                v-for="(it, i) in appidMap"
                :key="i"
                :label="it.label"
                :value="it.value"
              />
            </el-select>
            <!-- <el-input
              v-model="state.search.app_id"
              size="small"
              clearable
              :placeholder="$l('APP ID: up to 5')"
              @input="appidInput"
              @clear="appidClear"
            >
              <template #suffix>
                <div class="fs12 lh22">
                  <span :class="appidClass">{{ state.appidCount }}</span>
                  <span>/{{ state.appidMax }}</span>
                </div>
              </template>
            </el-input> -->
          </div>
          <div class="w120 pr10">
            <Device v-model="state.search.device" :placeholder="$l('Device')" />
          </div>
          <div class="pr10">
            <Country v-model="state.search.country" type="aso" />
          </div>
          <div class="pr10">
            <el-button plain round @click="toReset">
              <span>{{ $l('Reset') }}</span>
            </el-button>
          </div>
          <div class="pr10">
            <el-button plain round type="primary" @click="toSearch">
              <template #icon>
                <i class="adicon ad-search1"></i>
              </template>
              <span>{{ $l('Search') }}</span>
            </el-button>
          </div>
        </div>
      </template>
      <el-table-column label="ID" prop="id" width="80" align="center" />
      <el-table-column label="APP ID" prop="app_id" width="120" sortable />
      <el-table-column
        :label="$l('Ranking')"
        prop="ranking"
        width="120"
        sortable
      />
      <el-table-column :label="$l('Keyword')" prop="keywords" sortable />
    </Table>
  </Page>
</template>
<script setup>
import { getCurrentInstance, nextTick } from '@vue/runtime-core';

defineOptions({
  name: 'Ranking',
});
// 数据
const { proxy } = getCurrentInstance();
const state = reactive({
  table: {
    total: 1000,
  },
  search: {
    device: 'IPHONE',
    country: 'US',
  },
  osearch: {},
  appidMax: 5,
  appidCount: 0,
});

// 计算属性
const appidClass = computed(() => {
  return state.appidCount === state.appidMax ? 'txt-red' : 'txt-primary';
});
const countryLangMap = computed(() => {
  return window.$map.country.countryLang;
});
// 监听

// 挂载
onMounted(() => {
  state.osearch = JSON.parse(JSON.stringify(state.search));
});
// 事件
const toReset = () => {
  state.search = JSON.parse(JSON.stringify(state.osearch));
};
const toSearch = () => {
  proxy.$refs.table.initTable(state.search);
};
const appidInput = (v) => {
  let arr = v.split(',');
  if (arr.length > state.appidMax) {
    arr = arr.slice(0, state.appidMax);
    state.search.app_id = arr.join(',');
  }
  state.appidCount = arr.length;
};
const loadData = (v) => {
  const list = window.$fakeData(v.pageSize, (i) => {
    const id = (v.pageNum - 1) * v.pageSize + i;
    return {
      id,
      name: 'name' + id,
      app_id: window.$randomNumber(88888888, 11111111),
      ranking: window.$randomNumber(88888888, 1),
      status: window.$randomNumber(2),
    };
  });
  return {
    list,
    total: state.table.total,
  };
};
const appidChange = (v) => {
  console.info(proxy.$refs.appidSelector.input);

  nextTick(() => {
    proxy.$refs.appidSelector.blur();
    // proxy.$refs.appidSelector.focus();
    // proxy.$refs.appidSelector.input.focus();
  });
};
const appidVisibleChange = (v) => {
  if (proxy.$refs.appidSelector) {
    if (!v) {
      nextTick(() => {
        proxy.$refs.appidSelector.blur();
        proxy.$refs.appidSelector.input.blur();
      });
      // nextTick(() => {
      // proxy.$refs.appidSelector.selectWrapper.blur();
      //   // proxy.$refs.appidSelector.focus();
      //   // proxy.$refs.appidSelector.input.focus()
      // });
    } else {
      // proxy.$refs.appidSelector.focus();
    }
  }
};
// 卸载

// map
const appidMap = [];
</script>
<style lang="scss" scoped></style>
