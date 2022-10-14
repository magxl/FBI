export default {
  path: '/A/AutomationService',
  name: 'AAutomationService',
  meta: {
    sort: 20,
    label: '自动化服务',
    icon: 'ad-board1',
  },
  children: [
    {
      path: 'SpendsMonitor',
      name: 'ASpendsMonitor',
      meta: {
        sort: 0,
        label: '支出监控',
        icon: '',
      },
      component: () => import('@views/A/AutomationService/SpendsMonitor.vue'),
    },
  ],
};
