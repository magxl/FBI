export default {
  path: '/A/Board/Main',
  name: 'ABoardMain',
  meta: {
    sort: 0,
    label: '主看板',
    icon: 'ad-chart1',
    position: ['menu'],
    keepalive: true,
    tips: [
      {
        title: '测试提示',
        content: '这是一个供测试的提示语',
      },
    ],
  },
  component: () => import('@views/A/Board/BoardMain.vue'),
};