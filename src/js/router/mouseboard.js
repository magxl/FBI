export default {
  path: '/MouseBoard',
  name: 'MouseBoard',
  meta: {
    label: '触控板',
    position: 'navbar',
  },
  component: () => import('../../views/Launch/Frame.vue'),
  children: [
    {
      path: '/MouseBoard/MouseBoardMove',
      name: 'MouseBoardMove',
      meta: {
        label: '触控板滑动',
        position: 'navbar',
      },
      component: () => import('../../views/MouseBoard/MouseBoardMove.vue'),
    },
    {
      path: '/MouseBoard/MouseSwipe',
      name: 'MouseSwipe',
      meta: {
        label: '切换图片',
        position: 'navbar',
      },
      component: () => import('../../views/MouseBoard/MouseSwipe.vue'),
    },
  ],
};
