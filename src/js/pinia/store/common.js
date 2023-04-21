const state = () => {
  return {
    menu: [], // 全局路由
    campaignGroup: [], // 广告系列组 即 org
    roleMap: [], // 角色字典
    userMap: [], // 用户字典
  };
};
const actions = {
  saveMenu(v) {},
  saveData({ aim, dt }) {
    if (window.$getType(dt) === 'Object') {
      this[aim] = Object.assign({}, this[aim], dt);
    } else if (window.$getType(dt) === 'Array') {
      this[aim] = [].concat(dt);
    } else {
      this[aim] = dt;
    }
  },
  async getCampaignGroup() {
    if (this.campaignGroup.length) {
      return this.campaignGroup;
    }
    const currencyOptions = [
      {
        label: 'USD',
        value: '$',
      },
      {
        label: 'CNY',
        value: '¥',
      },
    ];
    const permissionMap = [
      { icon: 'adicon ad-noedit txt-dark3', tips: 'Not Writable' },
      { icon: 'adicon ad-canedit txt-green', tips: 'You Can Edit' },
      { icon: 'adicon ad-cohort txt-purple', tips: 'From OAuth' },
    ];
    let list = [];
    await window.$promise(() => {
      window.$fakeData(window.$randomNumber(100), (i) => {
        const { label, value } = currencyOptions[window.$randomNumber(2)];
        const timezone = window.$randomNumber(24, -12);
        const id = i + 1;
        // 权限 0 只读，1 编辑 2 OAuth，权限向下覆盖
        const permission = window.$randomNumber(3);
        const icon = permissionMap[permission];
        list.push({
          id,
          name: value + ' Org ' + id,
          permission,
          currency: value,
          currency_name: label,
          timezone,
          timezone_name: `timezone (${timezone})`,
          icon: icon.icon,
          tips: icon.tips,
        });
      });
    });
    list = list.sort((a, b) => b.permission - a.permission);
    this.campaignGroup = list;
    return list;
  },
  async getCampaign(orgId = '') {
    if (!orgId) {
      return [];
    }
    const { statusMap } = window.$map;
    const statusMapArr = Object.keys(statusMap).map((it) => statusMap[it]);
    const adplacementOptions = [
      'APPSTORE_PRODUCT_PAGES_BROWSE',
      'APPSTORE_SEARCH_RESULTS',
      'APPSTORE_SEARCH_TAB',
      'APPSTORE_TODAY_TAB',
    ];
    const lang = window.$getLang();
    const list = [];
    await window.$promise(() => {
      window.$fakeData(window.$rn(100), (i) => {
        const status = statusMapArr[window.$rn(statusMapArr.length)];
        const icon = status.class;
        const supplySources = adplacementOptions[window.$rn(4)];
        const id = i + 1;
        list.push({
          id,
          orgId,
          name: 'Campaign ' + orgId + ' - ' + id,
          supplySources,
          status: status[`label_${lang}`],
          sort: status.sort,
          icon,
        });
      });
    });
    return list.sort((a, b) => a.sort - b.sort);
  },
  async getAdGroup(orgId = '', campaignId = '') {
    if (!orgId || !campaignId) {
      return [];
    }
    const { statusMap } = window.$map;
    const statusMapArr = Object.keys(statusMap).map((it) => statusMap[it]);
    const lang = window.$getLang();
    const list = [];
    await window.$promise(() => {
      window.$fakeData(window.$randomNumber(100), (i) => {
        const status = statusMapArr[window.$randomNumber(statusMapArr.length)];
        const icon = status.class;
        const id = i + 1;
        list.push({
          id,
          orgId,
          campaignId,
          name: 'Ad Group ' + orgId + ' - ' + campaignId + ' - ' + id,
          status: status[`label_${lang}`],
          sort: status.sort,
          icon,
        });
      });
    });
    return list.sort((a, b) => a.sort - b.sort);
  },
  // 角色信息
  async getRoleMap() {
    if (this.roleMap.length) {
      return this.roleMap;
    }
    const list = [];
    await window.$promise(() => {
      window.$fd(window.$rn(30, 30), (i) => {
        const id = i + 1;
        list.push({
          id,
          name: 'Role Name ' + id,
          users: window.$rn(30),
          status: window.$rn(2),
        });
      });
    });

    this.roleMap = list.sort((a, b) => b.status - a.status);
    return list;
  },
  // 用户信息
  async getUserMap() {
    if (this.userMap.length) {
      return this.userMap;
    }
    const list = [];
    await window.$promise(() => {
      window.$fd(window.$rn(30, 30), (i) => {
        const id = i + 1;
        list.push({
          id,
          name: 'User Name ' + id,
          account: 'Account ' + id,
          mobile: 15718845548 + id,
          email: id + 'email@email.com',
          role: 'Role ' + window.$rn(20),
          roleId: 1,
          status: window.$rn(2),
          orgs: window.$fd(window.$rn(2000), (o) => {
            const oid = o + 1;
            return {
              id: oid,
              name: 'Org ' + oid,
              permission: {
                read: window.$rn(2),
                write: window.$rn(2),
              },
            };
          }),
        });
      });
    });
    this.userMap = list.sort((a, b) => b.status - a.status);
    return list;
  },
};
const getters = {};
export default {
  state,
  actions,
  getters,
};
