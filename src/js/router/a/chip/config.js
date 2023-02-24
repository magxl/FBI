export default {
  path: '/A/Config',
  name: 'AConfig',
  meta: {
    sort: 100,
    label: 'Config',
    label_en_us: 'Config',
    label_zh_cn: '配置',
    icon: 'ad-icon-config',
  },
  children: [
    {
      path: 'Role',
      name: 'A_Role',
      meta: {
        sort: 0,
        label: 'Role',
        label_en_us: 'Role',
        label_zh_cn: '角色',
        icon: 'ad-userinfo',
      },
      component: () => import('@views/A/Config/Role.vue'),
    },
    // {
    //   path: 'Permission',
    //   name: 'A_Permission',
    //   meta: {
    //     sort: 30,
    //     label: 'Permission',
    //     label_en_us: 'Permission',
    //     label_zh_cn: '权限',
    //     icon: 'ad-manage-author',
    //   },
    //   component: () => import('@views/A/Config/Permission.vue'),
    // },
    {
      path: 'Router',
      name: 'A_Router',
      meta: {
        sort: 20,
        label: 'Router',
        label_en_us: 'Router',
        label_zh_cn: '路由',
        icon: 'ad-schedule',
      },
      component: () => import('@views/A/Config/Router.vue'),
    },
    {
      path: 'Org',
      name: 'A_Org',
      meta: {
        sort: 40,
        label: 'Org',
        label_en_us: 'Org',
        label_zh_cn: '项目',
        icon: 'ad-item',
      },
      component: () => import('@views/A/Config/Org.vue'),
    },
    {
      path: 'User',
      name: 'A_User',
      meta: {
        sort: 10,
        label: 'User',
        label_en_us: 'User',
        label_zh_cn: '用户',
        icon: 'ad-customer-add',
      },
      component: () => import('@views/A/Config/User.vue'),
    },
  ],
};
