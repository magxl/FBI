export default {
  path: '/A/Service',
  name: 'A_Service',
  meta: {
    sort: 50,
    label: 'Service',
    label_en_us: 'Service',
    label_zh_cn: '服务',
    icon: 'ad-setting3',
  },
  children: [
    {
      path: 'Authorization',
      name: 'A_Authorization',
      meta: {
        sort: 0,
        label: 'Authorization',
        label_en_us: 'Authorization',
        label_zh_cn: '授权',
        icon: 'ad-authorization',
      },
      component: () => import('@views/A/Service/Authorization.vue'),
    },
    {
      path: 'DailyReportMail',
      name: 'A_DailyReportMail',
      meta: {
        sort: 0,
        label: 'Daily Report Mail',
        label_en_us: 'Daily Report Mail',
        label_zh_cn: '日报邮件',
        icon: 'ad-mail',
      },
      component: () => import('@views/A/Service/DailyReportMail.vue'),
    },
    {
      path: 'MMPSetting',
      name: 'A_MMPSetting',
      meta: {
        sort: 0,
        label: 'MMP Setting',
        label_en_us: 'MMP Setting',
        label_zh_cn: 'MMP设置',
        icon: 'ad-setting2',
      },
      component: () => import('@views/A/Service/MMPSetting.vue'),
    },
  ],
};
