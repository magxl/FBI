export default {
  path: '/A/AppStore',
  name: 'AAppStore',
  meta: {
    sort: 30,
    label: '应用商店',
    icon: 'ad-appstore',
  },
  children: [
    {
      path: 'Charts',
      name: 'A_Charts',
      meta: {
        sort: 0,
        label: '实时排行',
        icon: 'ad-realtime-ranking',
      },
      component: () => import('@views/A/AppStore/Charts.vue'),
    },
    {
      path: 'SearchRanking',
      name: 'A_SearchRanking',
      meta: {
        sort: 0,
        label: '搜索排行',
        icon: 'ad-search-ranking',
      },
      component: () => import('@views/A/AppStore/SearchRanking.vue'),
    },
    {
      path: 'Recommend Keywords',
      name: 'A_RecommendKeywrod',
      meta: {
        sort: 0,
        label: '推荐词',
        icon: 'ad-recommend',
      },
      component: () => import('@views/A/AppStore/RecommendKeywords.vue'),
    },
    {
      path: 'Popularity',
      name: 'A_Popularity',
      meta: {
        sort: 0,
        label: '热度',
        icon: 'ad-fire',
      },
      component: () => import('@views/A/AppStore/Popularity.vue'),
    },
    {
      path: 'CoveringWord',
      name: 'A_CoveringWord',
      meta: {
        sort: 0,
        label: '覆盖词',
        icon: '',
      },
      component: () => import('@views/A/AppStore/CoveringWord.vue'),
    },
  ],
};
