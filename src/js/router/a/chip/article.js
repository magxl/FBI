export default {
  path: '/A/Article',
  name: 'A_Article',
  meta: {
    sort: 30,
    label: 'Article',
    label_en_us: 'Article',
    label_zh_cn: '文章',
    icon: 'ad-appstore',
  },
  children: [
    {
      path: 'Detail',
      name: 'A_ArticleDetail',
      meta: {
        sort: 0,
        label: 'Article Detail',
        label_en_us: 'Article Detail',
        label_zh_cn: '文章详情',
        icon: 'ad-realtime-ranking',
        hide: true,
      },
      component: () => import('@views/A/Article/ArticleDetail.vue'),
    },
  ],
};
