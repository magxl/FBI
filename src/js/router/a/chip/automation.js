export default {
  path: '/A/Automation',
  name: 'A_Automation',
  meta: {
    sort: 10,
    label: 'Automation',
    label_en_us: 'Automation',
    label_zh_cn: '自动化服务',
    icon: 'ad-autoservice',
  },
  children: [
    {
      path: 'ChartsMonitor',
      name: 'A_ChartsMonitor',
      meta: {
        sort: 0,
        label: 'Charts Monitor',
        label_en_us: 'Charts Monitor',
        label_zh_cn: '排行监控',
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
        label_en_us: 'Monitors',
        label_zh_cn: '监控组',
        icon: 'ad-mac',
      },
      component: () => import('@views/A/Automation/Monitors.vue'),
    },
  ],
};
