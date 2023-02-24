export default {
  path: '/A/Project',
  name: 'A_Project',
  meta: {
    sort: 40,
    label: 'Project',
    label_en_us: 'Project',
    label_zh_cn: '项目',
    icon: 'ad-item-folder',
  },
  children: [
    {
      path: 'CampaignGroup',
      name: 'A_CampaignGroup',
      meta: {
        sort: 0,
        label: 'Campaign Group List',
        label_en_us: 'Campaign Group List',
        label_zh_cn: '广告系列组',
        icon: 'ad-group',
        keepalive: true,
      },
      component: () => import('@views/A/Project/CampaignGroup.vue'),
    },
    {
      path: 'CampaignGroupDetail/:orgId',
      name: 'A_CampaignGroupDetail',
      meta: {
        sort: 0,
        label: 'Campaign Group Detail',
        label_en_us: 'Campaign Group Detail',
        label_zh_cn: '广告系列组详情',
        icon: 'ad-group',
        hide: true,
        keepalive: true,
        multiple: true,
      },
      props: true,
      component: () => import('@views/A/Project/CampaignGroupDetail.vue'),
    },
    {
      path: 'CampaignGroupDetailTab/:orgId',
      name: 'A_CampaignGroupDetailTab',
      meta: {
        sort: 0,
        label: 'Campaign Group Detail Tab',
        label_en_us: 'Campaign Group Detail Tab',
        label_zh_cn: '广告系列组详情-选项卡',
        icon: 'ad-group',
        hide: true,
        keepalive: true,
        // multiple: true,
      },
      props: true,
      component: () => import('@views/A/Project/CampaignGroupDetailTab.vue'),
    },
    {
      path: 'CustomReport',
      name: 'A_CustomReport',
      meta: {
        sort: 0,
        label: 'Custom Report',
        label_en_us: 'Custom Report',
        label_zh_cn: '自定义报告',
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
        label_en_us: 'Create Keyword',
        label_zh_cn: '创建关键词',
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
        label_en_us: 'Update Keyword',
        label_zh_cn: '更新关键词',
        icon: 'ad-update-keyword',
      },
      component: () => import('@views/A/Project/UpdateKeyword.vue'),
    },
  ],
};
