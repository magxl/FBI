export default {
  path: '/A/Automation',
  name: 'AAutomation',
  meta: {
    sort: 10,
    label: '自动化服务',
    icon: 'ad-autoservice',
  },
  children: [
    {
      path: 'ChartsMonitor',
      name: 'AChartsMonitor',
      meta: {
        sort: 0,
        label: '图表监控',
        icon: '',
      },
      component: () => import('@views/A/Automation/ChartsMonitor.vue'),
    },
    {
      path: 'Monitor',
      name: 'AMonitor',
      meta: {
        sort: 0,
        label: '监控组',
        icon: '',
      },
      component: () => import('@views/A/Automation/Monitor.vue'),
    },
  ],
};
