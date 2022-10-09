export default {
  path: '/Tempalte',
  name: 'Tempalte',
  meta: {
    label: '模版',
    position: 'navbar',
  },
  component: () => import('../../views/Launch/Frame.vue'),
  children: [
    {
      path: '/Template/One',
      name: 'One',
      meta: {
        label: 'One',
        position: 'navbar',
      },
      component: () => import('../../views/Template/One.vue'),
    },
  ],
};
