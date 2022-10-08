export default {
  path: '/Algorithm',
  name: 'Algorithm',
  meta: {
    label: '算法',
    position: 'navbar',
  },
  component: () => import('../../views/Launch/Frame.vue'),
  children: [
    {
      path: '/Algorithm/99Table',
      name: '99Table',
      meta: {
        label: '九九乘法表',
        position: 'navbar',
      },
      component: () => import('../../views/Algorithm/99Table.vue'),
    },
  ],
};
