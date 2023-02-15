export default {
  path: '/A/Aso',
  name: 'A_Aso',
  meta: {
    sort: 20,
    label: 'ASO',
    label_en_us: 'ASO',
    label_zh_cn: 'ASO',
    icon: 'ad-keyword',
  },
  children: [
    {
      path: 'Tag',
      name: 'A_Tag',
      meta: {
        hide: true,
        sort: 0,
        label: 'Tag',
        label_en_us: 'Tag',
        label_zh_cn: '标签',
        icon: 'ad-tags',
      },
      component: () => import('@views/A/Aso/Tag.vue'),
    },
    {
      path: 'Ranking',
      name: 'A_Ranking',
      meta: {
        sort: 0,
        label: 'Ranking',
        label_en_us: 'Ranking',
        label_zh_cn: '排行',
        icon: 'ad-ranking',
      },
      component: () => import('@views/A/Aso/Ranking.vue'),
    },
    {
      path: 'Category',
      name: 'A_Category',
      meta: {
        sort: 0,
        label: 'Category',
        label_en_us: 'Category',
        label_zh_cn: '类别',
        icon: 'ad-category',
      },
      component: () => import('@views/A/Aso/Category.vue'),
    },
    {
      path: 'Trending',
      name: 'A_Trending',
      meta: {
        sort: 0,
        label: 'Trending',
        label_en_us: 'Trending',
        label_zh_cn: '趋势',
        icon: 'ad-trending',
      },
      component: () => import('@views/A/Aso/Trending.vue'),
    },
    {
      path: 'Volume',
      name: 'A_Volume',
      meta: {
        sort: 0,
        label: 'Volume',
        label_en_us: 'Volume',
        label_zh_cn: '体量',
        icon: 'ad-volume',
      },
      component: () => import('@views/A/Aso/Volume.vue'),
    },
  ],
};
