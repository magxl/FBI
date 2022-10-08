export default {
  path: '/Animat',
  name: 'Animat',
  meta: {
    label: '动画',
    position: 'navbar',
  },
  component: () => import('../../views/Launch/Frame.vue'),
  children: [
    {
      path: '/Animat/Demo',
      name: 'Demo',
      meta: {
        label: 'DEMO',
        position: 'navbar',
      },
      component: () => import('../../views/Animat/Demo.vue'),
    },
  ],
};
