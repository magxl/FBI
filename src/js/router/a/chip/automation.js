export default {
  path: '/A/Automation',
  name: 'A_Automation',
  meta: {
    sort: 10,
    label: 'Automation',
    icon: 'ad-autoservice',
  },
  children: [
    {
      path: 'ChartsMonitor',
      name: 'A_ChartsMonitor',
      meta: {
        sort: 0,
        label: 'Charts Monitor',
        icon: 'ad-nav-system-set',
      },
      component: () => import('@views/A/Automation/ChartsMonitor.vue'),
    },
    {
      path: 'Monitor',
      name: 'A_Monitor',
      meta: {
        sort: 0,
        label: 'Monitors',
        icon: 'ad-mac',
      },
      component: () => import('@views/A/Automation/Monitors.vue'),
    },
  ],
};
