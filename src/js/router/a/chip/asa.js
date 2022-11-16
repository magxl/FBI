export default {
  path: '/A/Asa',
  name: 'AAsa',
  meta: {
    hide: true,
    sort: 101,
    label: 'ASA数据量化衡量',
    icon: 'ad-chart1',
    position: ['menu'],
  },
  children: [
    {
      path: 'Account',
      name: 'AAsaAccount',
      meta: {
        sort: 10,
        label: '账户量化分析',
        icon: 'ad-chart1',
        position: ['menu'],
        tips: [],
      },
      component: () => import('@views/A/Asa/Account.vue'),
    },
    {
      path: 'Area',
      name: 'AAsaArea',
      meta: {
        sort: 20,
        label: '地区量化分析',
        icon: 'ad-chart1',
        position: ['menu'],
        tips: [],
      },
      component: () => import('@views/A/Asa/Area.vue'),
    },
  ],
};
