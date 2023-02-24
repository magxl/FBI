export default {
  path: '/A/AppStore',
  name: 'AAppStore',
  meta: {
    sort: 30,
    label: 'App Store',
    label_en_us: 'App Store',
    label_zh_cn: '应用商店',
    icon: 'ad-appstore',
  },
  children: [
    {
      path: 'Charts',
      name: 'A_Charts',
      meta: {
        sort: 0,
        label: 'Charts',
        label_en_us: 'Charts',
        label_zh_cn: '实时排行',
        icon: 'ad-realtime-ranking',
      },
      component: () => import('@views/A/AppStore/Charts.vue'),
    },
    {
      path: 'SearchRanking',
      name: 'A_SearchRanking',
      meta: {
        sort: 0,
        label: 'Search Ranking',
        label_en_us: 'Search Ranking',
        label_zh_cn: '搜索排行',
        icon: 'ad-search-ranking',
      },
      component: () => import('@views/A/AppStore/SearchRanking.vue'),
    },
    {
      path: 'RecommendKeywords',
      name: 'A_RecommendKeyword',
      meta: {
        sort: 0,
        label: 'Recommend Keywords',
        label_en_us: 'Recommend Keywords',
        label_zh_cn: '推荐词',
        icon: 'ad-recommend',
      },
      component: () => import('@views/A/AppStore/RecommendKeywords.vue'),
    },
    {
      path: 'Popularity',
      name: 'A_Popularity',
      meta: {
        sort: 0,
        label: 'Popularity',
        label_en_us: 'Popularity',
        label_zh_cn: '热度',
        icon: 'ad-fire',
      },
      component: () => import('@views/A/AppStore/Popularity.vue'),
    },
    {
      path: 'CoveringWord',
      name: 'A_CoveringWord',
      meta: {
        sort: 0,
        label: 'Covring Wrod',
        label_en_us: 'Covring Wrod',
        label_zh_cn: '覆盖词',
        icon: '',
        hide: true,
      },
      component: () => import('@views/A/AppStore/CoveringWord.vue'),
    },
  ],
};
