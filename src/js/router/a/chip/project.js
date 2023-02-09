export default {
  path: '/A/Project',
  name: 'A_Project',
  meta: {
    sort: 40,
    label: 'Project',
    icon: 'ad-item-folder',
  },
  children: [
    {
      path: 'CampaignGroup',
      name: 'A_CampaignGroup',
      meta: {
        sort: 0,
        label: 'Campaign Group List',
        icon: 'ad-group',
      },
      component: () => import('@views/A/Project/CampaignGroup.vue'),
    },
    {
      path: 'CustomReport',
      name: 'A_CustomReport',
      meta: {
        sort: 0,
        label: 'Custom Report',
        icon: 'ad-report',
      },
      component: () => import('@views/A/Project/CustomReport.vue'),
    },
    {
      path: 'CreateKeyword',
      name: 'A_CreateKeyword',
      meta: {
        sort: 0,
        label: 'Create Keyword',
        icon: 'ad-add-keyword',
      },
      component: () => import('@views/A/Project/CreateKeyword.vue'),
    },
    {
      path: 'UpdateKeyword',
      name: 'A_UpdateKeyword',
      meta: {
        sort: 0,
        label: 'Update Keyword',
        icon: 'ad-update-keyword',
      },
      component: () => import('@views/A/Project/UpdateKeyword.vue'),
    },
  ],
};
