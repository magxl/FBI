export default {
  path: '/A/Home',
  name: 'A_Home',
  meta: {
    sort: 0,
    label: 'Home',
    label_en_us: 'Home',
    label_zh_cn: '首页',
    icon: 'ad-home',
  },
  children: [
    {
      path: 'Overview',
      name: 'A_Overview',
      meta: {
        sort: 0,
        label: 'Overview',
        label_en_us: 'Overview',
        label_zh_cn: '概览',
        icon: 'ad-chart1',
        keepalive: true,
        tips: [
          {
            title: '测试提示',
            content: '这是一个供测试的提示语',
          },
        ],
      },
      component: () => import('@views/A/Home/Overview.vue'),
    },
  ],
};
