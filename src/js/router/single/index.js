export default {
  path: '/SOP',
  name: 'SOP',
  meta: {
    label: 'Station Of Portal',
    label_en_us: 'Station Of Portal',
    label_zh_cn: '门户',
    hide: true,
    unsave: true,
  },
  component: () => import('@views/Single/SOP.vue'),
};