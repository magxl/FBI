export default {
  path: '/A/Project',
  name: 'AProject',
  meta: {
    sort: 40,
    label: '计划',
    icon: 'ad-item-folder',
  },
  children: [
    {
      path: 'CampaignGroup',
      name: 'ACampaignGroup',
      meta: {
        sort: 0,
        label: '活动组',
        icon: '',
      },
      component: () => import('@views/A/Project/CampaignGroup.vue'),
    },
    {
      path: 'CustomReport',
      name: 'ACustomReport',
      meta: {
        sort: 0,
        label: '报表',
        icon: '',
      },
      component: () => import('@views/A/Project/CustomReport.vue'),
    },
  ],
};
