export default {
  path: '/A/Aso',
  name: 'AAso',
  meta: {
    sort: 20,
    label: 'ASO',
    icon: 'ad-keyword',
  },
  children: [
    {
      path: 'Tag',
      name: 'ATag',
      meta: {
        sort: 0,
        label: '标签',
        icon: '',
      },
      component: () => import('@views/A/Aso/Tag.vue'),
    },
    {
      path: 'Category',
      name: 'ACategory',
      meta: {
        sort: 0,
        label: '类别',
        icon: '',
      },
      component: () => import('@views/A/Aso/Category.vue'),
    },
    {
      path: 'Ranking',
      name: 'ARanking',
      meta: {
        sort: 0,
        label: '排行',
        icon: '',
      },
      component: () => import('@views/A/Aso/Ranking.vue'),
    },
    {
      path: 'Trending',
      name: 'ATrending',
      meta: {
        sort: 0,
        label: '趋势',
        icon: '',
      },
      component: () => import('@views/A/Aso/Trending.vue'),
    },
    {
      path: 'Volume',
      name: 'AVolume',
      meta: {
        sort: 0,
        label: '体量',
        icon: '',
      },
      component: () => import('@views/A/Aso/Volume.vue'),
    },
  ],
};
