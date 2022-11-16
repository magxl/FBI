export default {
  path: '/A',
  name: 'A404',
  meta: {
    hide: true,
    sort: 9999,
    label: '404',
    icon: 'ad-chart1',
    position: ['menu'],
  },
  children: [
    {
      path: '404',
      name: 'A404',
      meta: {
        sort: 10,
        label: '404',
        tips: [],
      },
      component: () => import('@views/A/Launch/404.vue'),
    },
  ],
};
