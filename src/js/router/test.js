export default {
  path: '/Test',
  name: 'Test',
  meta: {
    label: '测试',
    position: 'navbar',
  },
  component: () => import('../../views/Launch/Frame.vue'),
  children: [
    {
      path: '/Test/T1',
      name: 'T1',
      meta: {
        label: 'T1',
        position: 'navbar',
      },
      component: () => import('../../views/Test/T1.vue'),
    },
  ],
};
