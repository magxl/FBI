export default {
  path: '/A/AppStore',
  name: 'AAppStore',
  meta: {
    sort: 30,
    label: 'App Store',
    icon: 'ad-appstore',
  },
  children: [
    {
      path: 'Charts',
      name: 'A_Charts',
      meta: {
        sort: 0,
        label: 'Charts',
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
        icon: 'ad-search-ranking',
      },
      component: () => import('@views/A/AppStore/SearchRanking.vue'),
    },
    {
      path: 'RecommendKeywords',
      name: 'A_RecommendKeywrod',
      meta: {
        sort: 0,
        label: 'Recommend Keywords',
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
        hide: true,
      },
      component: () => import('@views/A/AppStore/CoveringWord.vue'),
    },
  ],
};
