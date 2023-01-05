export default {
  path: '/A/Automation',
  name: 'A_Automation',
  meta: {
    sort: 10,
    label: '自动化服务',
    icon: 'ad-autoservice',
  },
  children: [
    {
      path: 'ChartsMonitor',
      name: 'A_ChartsMonitor',
      meta: {
        sort: 0,
        label: '图表监控',
        icon: 'ad-nav-system-set',
      },
      component: () => import('@views/A/Automation/ChartsMonitor.vue'),
    },
    {
      path: 'Monitor',
      name: 'A_Monitor',
      meta: {
        sort: 0,
        label: '监控组',
        icon: 'ad-mac',
      },
      component: () => import('@views/A/Automation/Monitors.vue'),
    },
  ],
};
