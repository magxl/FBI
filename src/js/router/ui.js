export default {
  path: '/UI',
  name: 'UI',
  meta: {
    label: 'UI',
    position: 'navbar',
  },
  component: () => import('../../views/Launch/Frame.vue'),
  children: [
    {
      path: '/UI/DingDing',
      name: 'DingDing',
      meta: {
        label: '钉钉',
        position: 'navbar',
      },
      component: () => import('../../views/UI/DingDing.vue'),
    },
    {
      path: '/UI/WePoem',
      name: 'WePoem',
      meta: {
        label: 'VP',
        position: 'navbar',
      },
      component: () => import('../../views/UI/WePoem.vue'),
    },
    {
      path: '/UI/Moban',
      name: 'Moban',
      meta: {
        label: '模版',
        position: 'navbar',
      },
      component: () => import('../../views/UI/Moban.vue'),
    },
  ],
};
