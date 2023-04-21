export default {
  path: '/A',
  name: 'A404',
  meta: {
    hide: true,
    sort: 9999,
    label: '404',
    label_en_us: '404',
    label_zh_cn: '404',
    icon: 'ad-chart1',
    position: ['menu'],
    unsave: true,
  },
  component: () => import('@views/A/Launch/404.vue'),
  children: [
    {
      path: '404',
      name: 'A404Page',
      meta: {
        sort: 10,
        label: '404',
        label_en_us: '404',
        label_zh_cn: '404',
        tips: [],
      },
      component: () => import('@views/A/Launch/404.vue'),
    },
  ],
};
