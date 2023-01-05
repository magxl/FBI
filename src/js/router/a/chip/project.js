export default {
  path: '/A/Project',
  name: 'A_Project',
  meta: {
    sort: 40,
    label: '计划',
    icon: 'ad-item-folder',
  },
  children: [
    {
      path: 'CampaignGroup',
      name: 'A_CampaignGroup',
      meta: {
        sort: 0,
        label: '活动组',
        icon: 'ad-group',
      },
      component: () => import('@views/A/Project/CampaignGroup.vue'),
    },
    {
      path: 'CustomReport',
      name: 'A_CustomReport',
      meta: {
        sort: 0,
        label: '报表',
        icon: 'ad-report',
      },
      component: () => import('@views/A/Project/CustomReport.vue'),
    },
    {
      path: 'AddKeyword',
      name: 'A_AddKeyword',
      meta: {
        sort: 0,
        label: '添加关键词',
        icon: 'ad-add-keyword',
      },
      component: () => import('@views/A/Project/AddKeyword.vue'),
    },
    {
      path: 'UpdateKeyword',
      name: 'A_UpdateKeyword',
      meta: {
        sort: 0,
        label: '更新关键词',
        icon: 'ad-update-keyword',
      },
      component: () => import('@views/A/Project/UpdateKeyword.vue'),
    },
  ],
};
