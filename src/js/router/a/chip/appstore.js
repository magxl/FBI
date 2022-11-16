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
      path: 'RealtimeRanking',
      name: 'ARealtimeRanking',
      meta: {
        sort: 0,
        label: '实时排行',
        icon: '',
      },
      component: () => import('@views/A/AppStore/RealtimeRanking.vue'),
    },
    {
      path: 'SearchRanking',
      name: 'ASearchRanking',
      meta: {
        sort: 0,
        label: '搜索排行',
        icon: '',
      },
      component: () => import('@views/A/AppStore/SearchRanking.vue'),
    },
    {
      path: 'RecommendedWrod',
      name: 'ARecommendedWrod',
      meta: {
        sort: 0,
        label: '推荐词',
        icon: '',
      },
      component: () => import('@views/A/AppStore/RecommendedWrod.vue'),
    },
    {
      path: 'Popularity',
      name: 'APopularity',
      meta: {
        sort: 0,
        label: '热度',
        icon: '',
      },
      component: () => import('@views/A/AppStore/Popularity.vue'),
    },
    {
      path: 'CoveringWord',
      name: 'ACoveringWord',
      meta: {
        sort: 0,
        label: '覆盖词',
        icon: '',
      },
      component: () => import('@views/A/AppStore/CoveringWord.vue'),
    },
    {
      path: 'AddKeyword',
      name: 'AAddKeyword',
      meta: {
        sort: 0,
        label: '添加关键词',
        icon: '',
      },
      component: () => import('@views/A/AppStore/AddKeyword.vue'),
    },
    {
      path: 'UpdateKeyword',
      name: 'AUpdateKeyword',
      meta: {
        sort: 0,
        label: '更新关键词',
        icon: '',
      },
      component: () => import('@views/A/AppStore/UpdateKeyword.vue'),
    },
  ],
};
