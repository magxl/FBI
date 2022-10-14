export default {
  path: '/A/Test',
  name: 'ATest',
  meta: {
    sort: 1000,
    label: '测试',
    icon: 'ad-board1',
    position: ['menu'],
    tips: [
      {
        title: '测试提示',
        content: '这是一个供测试的提示语',
      },
    ],
  },
  children: [
    {
      path: '/A/Test/FormatterArea',
      name: 'ATestFormatterArea',
      meta: {
        sort: 1000,
        label: '格式化地区',
        icon: 'ad-board1',
        position: ['menu'],
      },
      component: () => import('@views/A/Test/Formatter.vue'),
    },
    {
      path: '/A/Test/FakeData',
      name: 'ATestFakeData',
      meta: {
        sort: 1000,
        label: '假数据',
        icon: 'ad-board1',
        position: ['menu'],
      },
      component: () => import('@views/A/Test/FakeData.vue'),
    },
    {
      path: '/A/Test/NumberRange',
      name: 'ATestNumberRange',
      meta: {
        sort: 1000,
        label: '序列数据',
        icon: 'ad-board1',
        position: ['menu'],
      },
      component: () => import('@views/A/Test/NumberRange.vue'),
    },
  ],
};
