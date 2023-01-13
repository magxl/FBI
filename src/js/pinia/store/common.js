const state = () => {
  return {
    menu: [], // 全局路由
    campaignGroup: [], // 广告系列组 即 org
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
        value: '￥',
      },
    ];
    this.campaignGroup = window.$fakeData(window.$randomNumber(100), (i) => {
      const { label, value } = currencyOptions[window.$randomNumber(2)];
      const timezone = window.$randomNumber(24, -12);
      const id = i + 1;
      return {
        id,
        name: value + ' Org ' + id,
        permission: window.$randomNumber(3), // 权限 0 只读，1 编辑 2 可删，权限向下覆盖
        currency: value,
        currency_name: label,
        timezone,
        timezone_name: `timezone (${timezone})`,
      };
    });
  },
  async getCampaign(org_id = '') {
    if (!org_id) {
      return [];
    }
    const statusOptions = [
      {
        label: 'Running',
        value: 'RUNNING',
      },
      {
        label: 'Paused',
        value: 'PAUSED',
      },
      {
        label: 'Removed',
        value: 'REMOVED',
      },
      {
        label: 'Hold ON',
        value: 'HOLD_ON',
      },
    ];
    const adplacementOptions = [
      'APPSTORE_PRODUCT_PAGES_BROWSE',
      'APPSTORE_SEARCH_RESULTS',
      'APPSTORE_SEARCH_TAB',
      'APPSTORE_TODAY_TAB',
    ];
    return window.$fakeData(window.$randomNumber(100), (i) => {
      const { value } = statusOptions[window.$randomNumber(4)];
      const supplySources = adplacementOptions[window.$randomNumber(4)];
      const id = i + 1;
      return {
        id,
        org_id,
        name: 'Campaign ' + org_id + ' - ' + id,
        supplySources,
        status: value,
      };
    });
  },
  async getAdGroup({ org_id = '', campaign_id = '' }) {
    if (!org_id || !campaign_id) {
      return [];
    }
    const statusOptions = [
      {
        label: 'Running',
        value: 'RUNNING',
      },
      {
        label: 'Paused',
        value: 'PAUSED',
      },
      {
        label: 'Removed',
        value: 'REMOVED',
      },
      {
        label: 'Hold ON',
        value: 'HOLD_ON',
      },
    ];
    return window.$fakeData(window.$randomNumber(100), (i) => {
      const { value } = statusOptions[window.$randomNumber(4)];
      const id = i + 1;
      return {
        id,
        org_id,
        campaign_id,
        name: 'Ad Group ' + org_id + ' - ' + campaign_id + ' - ' + id,
        status: value,
      };
    });
  },
};
const getters = {};
export default {
  state,
  actions,
  getters,
};
