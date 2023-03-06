const state = () => {
  return {
    menu: [], // 全局路由
    campaignGroup: [], // 广告系列组 即 org
    roleMap: [], // 角色字典
  };
};
const actions = {
  saveMenu(v) {},
  saveData(s, { aim, dt }) {
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
      return;
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
      { icon: 'adicon ad-noedit txt-dark3', tips: 'No Access Write' },
      { icon: 'adicon ad-canedit txt-green', tips: 'You Can Edit' },
      { icon: 'adicon ad-cohort txt-purple', tips: 'From OAuth' },
    ];
    const campaignGroup = window
      .$fakeData(window.$randomNumber(100), (i) => {
        const { label, value } = currencyOptions[window.$randomNumber(2)];
        const timezone = window.$randomNumber(24, -12);
        const id = i + 1;
        // 权限 0 只读，1 编辑 2 OAuth，权限向下覆盖
        const permission = window.$randomNumber(3);
        const icon = permissionMap[permission];
        return {
          id,
          name: value + ' Org ' + id,
          permission,
          currency: value,
          currency_name: label,
          timezone,
          timezone_name: `timezone (${timezone})`,
          icon: icon.icon,
          tips: icon.tips,
        };
      })
      .sort((a, b) => b.permission - a.permission);
    this.campaignGroup = campaignGroup;
    return campaignGroup;
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
    return window
      .$fakeData(window.$randomNumber(100), (i) => {
        const status = statusMapArr[window.$randomNumber(statusMapArr.length)];
        const icon = status.class;
        const supplySources = adplacementOptions[window.$randomNumber(4)];
        const id = i + 1;
        return {
          id,
          orgId,
          name: 'Campaign ' + orgId + ' - ' + id,
          supplySources,
          status: status.label,
          sort: status.sort,
          icon,
        };
      })
      .sort((a, b) => a.sort - b.sort);
  },
  async getAdgroup(orgId = '', campaignId = '') {
    if (!orgId || !campaignId) {
      return [];
    }
    const { statusMap } = window.$map;
    const statusMapArr = Object.keys(statusMap).map((it) => statusMap[it]);

    return window
      .$fakeData(window.$randomNumber(100), (i) => {
        const status = statusMapArr[window.$randomNumber(statusMapArr.length)];
        const icon = status.class;
        const id = i + 1;
        return {
          id,
          orgId,
          campaignId,
          name: 'Ad Group ' + orgId + ' - ' + campaignId + ' - ' + id,
          status: status.label,
          sort: status.sort,
          icon,
        };
      })
      .sort((a, b) => a.sort - b.sort);
  },
  // 角色信息
  async getRoleMap() {
    if (this.roleMap.length) {
      return;
    }
    const list = window.$fd(window.$rn(30), (i) => {
      const id = i + 1;
      return {
        id,
        name: 'Name ' + id,
        users: window.$rn(30),
      };
    });
    this.roleMap = list;
    return list;
  },
};
const getters = {};
export default {
  state,
  actions,
  getters,
};
