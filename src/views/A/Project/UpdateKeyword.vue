<template>
  <Page title="Update Keyword" class="UpdateKeyword">
    <div class="flexMode hb p8-16 border-b">
      <!-- ↓ form -->
      <div class="flexMode vs">
        <div class="w240 pr8">
          <div class="relative pb8">
            <span class="abs l t txt-red fs12 lh24 z2">*</span>
            <Org
              v-model="state.search.orgId"
              v-model:currency="state.currency"
              v-model:orgName="state.names.orgName"
              :placeholder="$l('Campaign Group')"
            />
          </div>
          <div class="relative pb8">
            <span class="abs l t txt-red fs12 lh24 z2">*</span>
            <Campaign
              v-model="state.search.campaignId"
              v-model:orgId="state.search.orgId"
              v-model:campaignName="state.names.campaignName"
              :placeholder="$l('Campaign')"
            />
          </div>
          <div class="pb8">
            <AdGroup
              ref="adgroup"
              multiple
              v-model="state.search.adgroupId"
              v-model:orgId="state.search.orgId"
              v-model:campaignId="state.search.campaignId"
              v-model:adgroupName="state.names.adgroupName"
              :placeholder="$l('Ad Group')"
            />
          </div>
          <div class="">
            <el-date-picker
              v-model="state.date"
              class="wp100"
              type="daterange"
              range-separator="~"
              value-format="YYYY-MM-DD"
              end-placeholder="End Date"
              start-placeholder="Start Date"
              :disabled-date="(t) => +t > +new Date()"
              @change="dateChange"
            />
          </div>
        </div>
        <!-- oca ↑ -->
        <!-- filters ↓ -->
        <div class="w240 pr8">
          <el-popover
            ref="filters"
            placement="bottom"
            trigger="click"
            width="400"
          >
            <template #reference>
              <div
                v-if="filtersItem.length === 0"
                class="flexMode vc hc h120 border-dark3-dashed radius4 hover-bg-dark1"
              >
                <div class="flexMode flexV vc">
                  <i class="adicon ad-plus-circle fs36 txt-dark3"></i>
                  <span class="fs12 txt-dark5">{{ $l('Add Filters') }}</span>
                </div>
              </div>
              <div
                v-else
                class="wp100 h120 yscroll border-dark3-dashed radius4 hover-bg-dark1 fs12"
              >
                <div v-for="it in filtersItem" :key="it.label" class="p4">
                  <span class="txt-dark5 pr8">{{ it.label }}</span>
                  <span class="txt-dark9">{{ it.value }}</span>
                </div>
              </div>
            </template>
            <div class="w400">
              <Filters
                :currency="state.currency"
                @reset="filtersReset"
                @confirm="filtersConfirm"
              />
            </div>
          </el-popover>
        </div>
        <!-- ↑ form -->
        <!-- ↓ dashed box -->
        <div class="flexMode flexV hb">
          <div class="pb8 w200">
            <el-input
              v-model="state.search.keyword"
              clearable
              :rows="4"
              resize="none"
              type="textarea"
              :placeholder="$l('Keyword')"
              class="wp100"
            />
          </div>
          <div class="w200 pb4">
            <el-button
              plain
              round
              type="primary"
              class="wp100"
              @click="toSearch"
            >
              <template #icon>
                <i class="adicon ad-search1"></i>
              </template>
              <span>{{ $l('Search') }}</span>
            </el-button>
          </div>
          <!-- dashed box -->
        </div>
      </div>
      <!-- left ↑ -->
      <!-- right ↓ -->
      <div class="w240 border-dark1 radius4 hover-box-shadow-dark1">
        <div class="flexMode vc p0-8 h24 fs14 txt-dark7 border-b">
          {{ $l('History') }}
        </div>
        <div class="yscroll" style="height: 96px">
          <div
            v-for="(it, i) in state.history"
            :key="i"
            class="flexMode vc hb p4-16 fs12 hover-bg-dark1"
            :class="i !== state.history.length - 1 && 'border-b'"
            @click="toUseHistory(it, i)"
          >
            <span class="pr8">{{ it.name }}</span>
            <i
              v-if="state.useHistory === it.name"
              class="adicon ad-select fs14 txt-green"
            ></i>
          </div>
        </div>
      </div>
    </div>
    <!-- top -->
    <!-- table -->
    <Table
      ref="table"
      :loading="state.loading"
      :list="state.list"
      minus-height="130"
      table-name="UpdateKeyword"
    >
      <template #actions>
        <div class="flexMode p0-16 vc">
          <div class="pr8">
            <el-dropdown
              trigger="click"
              placement="bottom-start"
              @command="statusCommand"
            >
              <el-button plain round type="primary">
                <span class="pr4">{{ $l('Status') }}</span>
                <i class="adicon ad-arrow-down"></i>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-for="(it, i) in statusMap"
                    :key="i"
                    :command="it.value"
                  >
                    {{ it.label }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <!-- status ↑ -->
          <div class="pr8">
            <el-dropdown
              trigger="click"
              placement="bottom-start"
              @command="cptBidCommand"
            >
              <el-button plain round type="primary">
                <span class="pr4">{{ $l('CPT Bid') }}</span>
                <i class="adicon ad-arrow-down"></i>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-for="(it, i) in cptBidMap"
                    :key="i"
                    :command="it.value"
                  >
                    {{ it.label }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </template>
      <el-table-column
        type="selection"
        width="48"
        align="center"
        fixed="left"
      />
      <el-table-column
        :label="$l('Currency')"
        prop="currency"
        width="72"
        fixed="left"
      />
      <el-table-column
        :label="$l('Keyword')"
        prop="keyword"
        width="200"
        fixed="left"
        show-overflow-tooltip
      />
      <el-table-column :label="$l('CPT Bid')" prop="cptBid" width="100" />
      <el-table-column
        :label="$l('Campaign Group')"
        prop="orgName"
        width="200"
        show-overflow-tooltip
      />
      <el-table-column
        :label="$l('Campaign')"
        prop="campaignName"
        width="200"
        show-overflow-tooltip
      />
      <el-table-column
        :label="$l('Ad Group')"
        prop="adgroupName"
        width="200"
        show-overflow-tooltip
      />
      <el-table-column :label="$l('Match Type')" prop="matchType" width="100" />
      <el-table-column :label="$l('Status')" prop="status" width="100" />
      <el-table-column :label="$l('Spend')" prop="spend" width="100" />
      <el-table-column :label="$l('CPA')" prop="cpa" width="100" />
      <el-table-column :label="$l('CPT')" prop="cpt" width="100" />
      <el-table-column
        :label="$l('Impression')"
        prop="impression"
        width="100"
      />
      <el-table-column :label="$l('Tap')" prop="tap" width="100" />
      <el-table-column :label="$l('Install')" prop="install" width="100" />
      <el-table-column :label="$l('TTR')" prop="ttr" width="100" />
      <el-table-column :label="$l('CR')" prop="cr" width="100" />
      <el-table-column
        :label="$l('Redownload')"
        prop="redownload"
        width="100"
      />
      <el-table-column
        :label="$l('New Download')"
        prop="newDownload"
        width="120"
      />
      <el-table-column :label="$l('LAT On')" prop="latOn" width="100" />
      <el-table-column :label="$l('LAT Off')" prop="latOff" width="100" />
      <el-table-column label="-"></el-table-column>
    </Table>
    <Dialog v-model:current="state.currentDialog" :dialog="state.dialog" />
  </Page>
</template>
<script setup>
import Filters from './UpdateKeyword/Filters.vue';
import UpdateCptBid from './UpdateKeyword/UpdateCptBid.vue';
// 定义
defineOptions({
  name: 'UpdateKeyword',
  components: { Filters },
});
// 数据
const state = reactive({
  loading: false,
  search: {},
  names: {},
  date: [],
  currency: '',
  list: [],
  filter: {},
  useHistory: '',
  history: window.$fd(10, (i) => {
    return {
      name: 'history name' + i,
    };
  }),
  selection: [],
  currentDialog: '',
  dialog: [
    {
      title: 'Update CPT Bid',
      cpt: UpdateCptBid,
    },
  ],
});
const { proxy } = getCurrentInstance();
// 挂载
onMounted(() => {
  init();
});
// 事件
const init = () => {
  const start = window.$moment().add(-7, 'day').format('YYYY-MM-DD');
  const end = window.$moment().add(-1, 'day').format('YYYY-MM-DD');
  dateChange([start, end]);
};
const dateChange = (v) => {
  state.search.day = v[0] + '-' + v[1];
};
const filtersConfirm = (v) => {
  state.filter = JSON.parse(JSON.stringify(v));
  proxy.$refs.filters.hide();
};
const filtersReset = () => {
  state.filter = {};
};
const toSearch = async () => {
  const { search, names } = state;
  if (!search.orgId || !search.campaignId) {
    proxy.$message.info({
      grouping: true,
      message: $l('Campaign Group And Campaign Must Be Fill'),
    });
    return;
  }
  let adgroup = search.adgroupId;
  if (adgroup[0] === 'all') {
    adgroup = proxy.$refs.adgroup.getValue();
  }
  proxy.$refs.adgroup.getName();
  console.info(adgroup);
  getData(adgroup);
};
const getData = async (adgroup) => {
  const total = 30;
  const { orgName, campaignName, adgroupName } = state.names;
  const list = window.$fd(total, (i) => {
    const id = i + 1;
    const adgroupId = adgroup[window.$rn(adgroup.length)];
    console.info(adgroupId);
    return {
      id,
      currency: state.currency,
      orgName,
      campaignName,
      keyword: 'Keyword' + id,
      adgroupName: adgroupName[adgroupId],
      cptBid: window.$fa((window.$rn(999999, 100) / 100).toFixed(2), 2),
    };
  });
  state.list = list;
};
const toUseHistory = (it, i) => {
  state.useHistory = it.name;
};
const statusCommand = (v) => {
  if (state.selection.length) {
  } else {
    proxy.$message.info({
      grouping: true,
      message: $l('No Selection'),
    });
  }
};
const cptBidCommand = (v) => {
  if (state.selection.length) {
    state.dialog[0].title = window.$l(state.dialog[0].title);
    state.dialog[0].params = { type: v, selection: state.selection };
    state.currentDialog = 0;
  } else {
    proxy.$message.info({
      grouping: true,
      message: $l('No Selection'),
    });
  }
};
// 计算属性
const filtersItem = computed(() => {
  const r = [];
  Object.keys(state.filter).forEach((it) => {
    const v = state.filter[it];
    if (window.$getType(v) === 'Number') {
      r.unshift({
        label: it,
        value: v,
      });
    }
  });
  return r;
});
// 监听

// maps
const statusMap = [
  {
    label: 'Activate',
    value: 'ACTIVE',
  },
  {
    label: 'Paused',
    value: 'PAUSED',
  },
];
const cptBidMap = [
  {
    label: 'Set New Bid',
    value: 'SetNewBid',
  },
  {
    label: 'Change According to CPT Bid',
    value: 'ByCptBid',
  },
  {
    label: 'Change According to AVG CPT',
    value: 'ByAvgCpt',
  },
];
// 卸载
</script>
<style lang="scss" scoped></style>
