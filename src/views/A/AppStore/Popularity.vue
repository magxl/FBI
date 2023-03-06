<template>
  <Page title="Popularity" class="Popularity">
    <Table :loading="state.loading" :list="state.list">
      <template #actions>
        <div class="inputGroup flexMode vc hb p16 border-b">
          <div class="flexMode vc">
            <Country
              v-model="state.search.country"
              size="small"
              class="inputGroupLeft w160"
            />
            <div class="inputGroupCenter w320">
              <el-input
                v-model="state.search.keyword"
                size="small"
                clearable
                placeholder="App ID"
                @keydown.enter="toSearch"
              />
            </div>
            <div class="inputGroupRight">
              <el-button type="primary" plain @click="toSearch">
                <template #icon>
                  <i class="adicon ad-search1"></i>
                </template>
                <span>{{ $l('Search') }}</span>
              </el-button>
            </div>
          </div>
          <div class="flexMode pl16">
            <el-tag
              v-for="(it, i) in state.localKeyword"
              :key="it"
              round
              effect="plain"
              type="info"
              class="mr4 point"
              @click="toUseKeyword(it, i)"
              closable
              @close="toRemoveKeyword(it, i)"
            >
              {{ it }}
            </el-tag>
          </div>
        </div>
      </template>
      <el-table-column label="No." prop="i" width="64" align="center" />
      <el-table-column :label="$l('Keyword')" prop="keyword" />
      <el-table-column
        :label="$l('Popularity')"
        prop="popularity"
        width="100"
      />
    </Table>
  </Page>
</template>
<script setup>
defineOptions({
  name: 'Popularity',
});
// 数据
const state = reactive({
  loading: false,
  search: {
    country: 'US',
  },
  list: [],
  total: null,
  keywords: [],
  localKeyword: [],
});
const { proxy } = getCurrentInstance();

// 计算属性

// 监听

// 挂载
onMounted(() => {
  let localKeyword = localStorage.getItem('PopularityKeyword');
  if (localKeyword) {
    state.localKeyword = localKeyword.split(',');
  }
});
// 事件

const toSearch = () => {
  const { keyword, country } = state.search;
  if (!keyword) {
    proxy.$message.info(window.$l('请输入内容'));
    return;
  }
  state.loading = true;
  state.total = null;
  const total = window.$randomNumber(20);
  const list = window.$fakeData(total, (i) => {
    const index = i + 1;
    return {
      i: index,
      keyword: 'Keyword' + index,
      popularity: window.$randomNumber(9999),
    };
  });
  state.list = list;
  state.total = total;
  state.loading = false;
  // 本地存储
  const { localKeyword } = state;
  // 是否有重复
  let hasIndex = 0;
  const has = localKeyword.filter((it, i) => {
    if (it === keyword) {
      hasIndex = i;
      return it;
    }
  })[0];
  let aim = localKeyword;
  if (has) {
    // 重复则删除
    aim.splice(hasIndex, 1);
  }
  aim.unshift(keyword);
  aim = aim.slice(0, 5);
  localStorage.setItem('PopularityKeyword', aim.join(','));
  state.localKeyword = aim;
};
const toUseKeyword = (v, i) => {
  state.search.keyword = v;
  toSearch();
};
const toRemoveKeyword = (v, i) => {
  state.localKeyword.splice(i, 1);

  localStorage.setItem('PopularityKeyword', state.localKeyword.join(','));
};
// 卸载
</script>
<style lang="scss" scoped></style>
