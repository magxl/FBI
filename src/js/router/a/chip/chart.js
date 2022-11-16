export default {
  path: '/A/Chart',
  name: 'AChart',
  meta: {
    hide: true,
    sort: 100,
    label: '图表',
    icon: 'ad-board1',
    position: ['menu'],
    tips: [
      {
        title: '测试提示',
        content: '这是一个供测试的提示语',
      },
    ],
  },
  component: () => import('@views/A/Chart/Chart.vue'),
};
