export default {
  path: '/A/Test',
  name: 'A_Test',
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
      name: 'A_Test_FormatterArea',
      meta: {
        sort: 1000,
        label: '格式化地区',
        icon: 'ad-board1',
        position: ['menu'],
        keepalive: true
      },
      component: () => import('@views/A/Test/Formatter.vue'),
    },
    {
      path: '/A/Test/FakeData',
      name: 'A_Test_FakeData',
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
      name: 'A_Test_NumberRange',
      meta: {
        sort: 1000,
        label: '序列数据',
        icon: 'ad-board1',
        position: ['menu'],
      },
      component: () => import('@views/A/Test/NumberRange.vue'),
    },
    {
      path: '/A/Test/SnippetsFormatter',
      name: 'A_Test_SnippetsFormatter',
      meta: {
        sort: 1000,
        label: '片段格式器',
        icon: 'ad-board1',
        position: ['menu'],
      },
      component: () => import('@views/A/Test/SnippetsFormatter.vue'),
    },
  ],
};
