<template>
  <Page title="Search Ranking" class="SearchRanking" noscroll>
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
            :placeholder="$l('Search: Keyword/App ID')"
            @keydown.enter="toSearch"
          />
        </div>
        <div class="inputGroupRight">
          <el-button type="primary" plain size="small" @click="toSearch">
            <template #icon>
              <i class="adicon ad-search1"></i>
            </template>
            <span>{{ $l('搜索') }}</span>
          </el-button>
        </div>
      </div>
      <div class="flexMode pl16">
        <el-tag
          v-for="(it, i) in state.localKeyword"
          :key="it"
          size="small"
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
    <!-- ↑ search ↑ -->
    <div class="relative" style="height: calc(100% - 58px - 56px)">
      <el-scrollbar class="hp100">
        <div class="flexMode">
          <div v-if="state.total === null" class="absCenter fs48 txt-dark1">
            Waiting For Your Search
          </div>

          <div v-else class="appsArea p16">
            <template v-if="state.list.length">
              <template v-for="(it, i) in state.list">
                <AppItem :it="it" />
              </template>
            </template>

            <div v-else class="absCenter">
              <el-empty :image-size="80"></el-empty>
            </div>
          </div>
          <!-- ↑ app area ↑ -->
          <Keyword
            v-if="state.keywords.length"
            class="sticky"
            :keywords="state.keywords"
          />
        </div>
      </el-scrollbar>
    </div>
  </Page>
</template>
<script setup>
import AppItem from './SearchRanking/AppItem.vue';
import Keyword from './SearchRanking/Keyword.vue';
defineOptions({
  name: 'SearchRanking',
  components: { AppItem, Keyword },
});
// 数据
const state = reactive({
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
  let localKeyword = localStorage.getItem('SearchRankingKeyword');
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
  state.total = null;
  const total = window.$randomNumber(20);
  const list = window.$fakeData(total, (i) => {
    const index = i + 1;
    return {
      color: window.$randomColor(),
      name: 'Name' + index,
      artistName: 'Artist' + index,
      subTitle: 'Sub Title' + index,
      releaseDate: '2022-05-24',
      genreName: 'Genre Name' + index,
      rating: window.$randomNumber(99999),
      score: (window.$randomNumber(50, 0) / 10).toFixed(1),
      screenshots: window.$fakeData(window.$randomNumber(10), (j) =>
        window.$randomColor(),
      ),
      description: 'descriptions' + index,
      isad: !i,
      campaignId: window.$randomNumber(9999999999, 1000000000),
      adsList: window.$fakeData(window.$randomNumber(20, 1), (j) => {
        return {
          color: window.$randomColor(),
        };
      }),
    };
  });
  const keywords = window.$fakeData(window.$randomNumber(20), (i) => {
    const index = i + 1;
    return {
      keyword: keyword + index,
      volume: window.$randomNumber(999),
    };
  });
  state.list = list;
  state.total = total;
  state.keywords = keywords;
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
  aim = aim.slice(0,5);
  localStorage.setItem('SearchRankingKeyword', aim.join(','));
  state.localKeyword = aim;
};
const toUseKeyword = (v, i) => {
  state.search.keyword = v;
  toSearch();
};
const toRemoveKeyword = (v, i) => {
  state.localKeyword.splice(i, 1);

  localStorage.setItem('SearchRankingKeyword', state.localKeyword.join(','));
};
// 卸载
</script>
<style lang="scss" scoped>
.appsArea {
  width: 860px;
}
</style>
