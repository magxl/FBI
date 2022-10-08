export default {
  path: '/Visual',
  name: 'Visual',
  meta: {
    label: '视觉',
    position: 'navbar',
  },
  component: () => import('../../views/Launch/Frame.vue'),
  children: [
    {
      path: '/Visual/VisualMain',
      name: 'VisualMain',
      meta: {
        label: 'MAIN',
        position: 'navbar',
      },
      component: () => import('../../views/Visual/VisualMain.vue'),
    },
    {
      path: '/Visual/BlueAlpha',
      name: 'BlueAlpha',
      meta: {
        label: '蓝法',
        position: 'navbar',
      },
      component: () => import('../../views/Visual/BlueAlpha.vue'),
    },
    {
      path: '/Visual/MoonSun',
      name: 'MoonSun',
      meta: {
        label: '月息日作',
        position: 'navbar',
      },
      component: () => import('../../views/Visual/MoonSun.vue'),
    },
  ],
};
