export default {
  path: '/Tool',
  name: 'Tool',
  meta: {
    label: '工具',
    position: 'navbar',
  },
  component: () => import('../../views/Launch/Frame/ToolFrame.vue'),
  children: [
    {
      path: '/Tool/HitDot',
      name: 'HitDot',
      meta: {
        label: '打点',
        position: 'navbar',
      },
      component: () => import('../../views/Tool/HitDot.vue'),
    },
    {
      path: '/Tool/PasteBoard',
      name: 'PasteBoard',
      meta: {
        label: '剪切板',
        position: 'navbar',
      },
      component: () => import('../../views/Tool/PasteBoard.vue'),
    },
  ],
};
