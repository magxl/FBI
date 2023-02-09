<template>
  <Page title="Campaign Group" class="CampaignGroup">
    <Table
      ref="table"
      table-name="CampaignGroup"
      :loading="state.loading"
      :list="state.list"
    >
      <template #actions>
        <div class="flexMode vc pl8">
          <div class="w240 pl8">
            <el-date-picker
              v-model="state.date"
              size="small"
              class="wp100"
              type="daterange"
              range-separator="~"
              value-format="YYYY-MM-DD"
              :end-placeholder="$l('End Date')"
              :start-placeholder="$l('Start Date')"
              :disabled-date="(t) => +t > +new Date()"
              @change="dateChange"
            />
          </div>
          <div class="w300 pl8">
            <el-input
              v-model="state.txt"
              clearable
              :placeholder="$l('Filter Campaign Group Name or ID')"
              size="small"
              class="h24 wp100"
              @keydown.enter="toFilter"
              @clear="toFilter"
            >
              <template #prefix>
                <i class="adicon ad-filter1"></i>
              </template>
            </el-input>
          </div>
          <div class="pl8">
            <el-checkbox
              v-model="state.valid"
              :label="$l('Valid Campaign Group')"
              size="small"
              @change="toFilter(true)"
            />
          </div>
        </div>
      </template>
      <el-table-column label="ID" prop="ID" width="80">
        <template #default="{ row }">
          <span @dblclick="$copy(row.ID, true)">{{ row.ID }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$l('Name')"
        prop="Name"
        width="300"
        show-overflow-tooltip
      >
        <template #default="{ row }">
          <span class="alink hover-txt-orange txt-primary">{{ row.Name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$l('Apps')" prop="Apps" width="240">
        <template #default="{ row }">
          <Avatar :list="row.Apps" @to-click="toAppDetail" />
        </template>
      </el-table-column>
      <el-table-column
        :label="$l('Country or Regions')"
        prop="Country"
        width="240"
      >
        <template #default="{ row }">
          <Avatar :list="row.Country" type="country" />
        </template>
      </el-table-column>
      <el-table-column
        :label="$l('Spends')"
        prop="Spends"
        width="120"
        align="right"
        sortable
        :formatter="(row) => row.currency + row.Spends"
      />
      <el-table-column
        :label="$l('Installs')"
        prop="Installs"
        width="120"
        align="right"
        sortable
      />
      <el-table-column
        :label="$l('Impressions')"
        prop="Impressions"
        width="120"
        align="right"
        sortable
      />
      <el-table-column
        :label="$l('Taps')"
        prop="Taps"
        width="120"
        align="right"
        sortable
      />
      <el-table-column
        :label="$l('AVG CPA')"
        prop="AVGCPA"
        width="120"
        align="right"
        sortable
        :formatter="(row) => row.currency + row.AVGCPA"
      />
      <el-table-column
        :label="$l('AVG CPT')"
        prop="AVGCPT"
        width="120"
        align="right"
        sortable
        :formatter="(row) => row.currency + row.AVGCPT"
      />
      <el-table-column
        :label="$l('CR')"
        prop="CR"
        width="100"
        align="right"
        sortable
        :formatter="(row) => row.CR + '%'"
      />
      <el-table-column
        :label="$l('TTR')"
        prop="TTR"
        width="100"
        align="right"
        sortable
        :formatter="(row) => row.TTR + '%'"
      />
      <el-table-column
        :label="$l('Modify Date')"
        prop="ModifyDate"
        width="120"
      />
    </Table>
    <Drawer v-model:current="state.currentDrawer" :drawer="state.drawer" />
  </Page>
</template>
<script setup>
import { nextTick } from 'vue';
import AppDetail from '../AppStore/Charts/Detail.vue';
defineOptions({
  name: 'CampaignGroup',
});
// 数据
const state = reactive({
  loading: true,
  search: {},
  txt: '',
  date: [],
  valid: false,
  list: [],
  olist: [],
  name: '',
  currentDrawer: '',
  drawer: [
    {
      title: '',
      size: 1000,
      cpt: AppDetail,
    },
  ],
});
const { proxy } = getCurrentInstance();
// 计算属性

// 监听

// 挂载
onMounted(() => {
  init();
});
// 事件
const init = () => {
  const end = window.$moment().add(-1, 'day').format('YYYY-MM-DD');
  const start = window.$moment().add(-7, 'day').format('YYYY-MM-DD');
  state.date = [start,end];
  dateChange([start, end]);
};
const dateChange = (v) => {
  state.search.day = v[0] + '~' + v[1];
  loadData();
};
const loadData = async () => {
  state.loading = true;
  const countrys = ['CN', 'US', 'JP', 'HK', 'KR', 'IE', 'AF'];
  const total = window.$rn(100);
  const list = window.$fd(total, (i) => {
    const index = i + 1;
    return {
      ID: window.$randomNumber(9999999, 10000000),
      Name: 'Name' + index,
      Apps: window.$fd(window.$randomNumber(10), (a) => window.$rc()).join(','),
      currency: window.$rn(2) ? '$' : '￥',
      Country: window.$fd(
        window.$randomNumber(30),
        (a) => countrys[window.$randomNumber(countrys.length - 1)],
      ),
      Spends: window.$fa(
        (window.$randomNumber(999999999, 100) / 100).toFixed(2),
      ),
      Installs: window.$fa(window.$randomNumber(9999999), 0),
      Impressions: window.$fa(window.$randomNumber(9999999), 0),
      Taps: window.$fa(window.$randomNumber(9999999), 0),
      AVGCPA: window.$fa((window.$randomNumber(999999, 100) / 100).toFixed(2)),
      AVGCPT: window.$fa((window.$randomNumber(999999, 100) / 100).toFixed(2)),
      CR: (window.$randomNumber(10000, 100) / 100).toFixed(2),
      TTR: (window.$randomNumber(10000, 100) / 100).toFixed(2),
      ModifyDate: window
        .$moment()
        .add(window.$rn(100, -100), 'day')
        .format('YYYY-MM-DD'),
    };
  });
  state.olist = list;
  toFilter(true);
  setTimeout(() => {
    state.loading = false;
  }, window.$rn(3000, 200));
};
const toSummary = ({ columns, data }) => {
  const currency = '$';
  if (!data.length) {
    return [];
  }
  const keys = [
    { key: 'AVGCPA', value: 'avg', unit_prev: currency },
    { key: 'AVGCPT', value: 'avg', unit_prev: currency },
    { key: 'AVGCPM', value: 'avg', unit_prev: currency },
    { key: 'TTR', value: 'avg', unit_append: '%' },
    { key: 'CR', value: 'avg', unit_append: '%' },
    { key: 'Installs', vlaue: 'sum' },
    { key: 'Taps', value: 'sum' },
    { key: 'Impressions', value: 'sum' },
    { key: 'Spends', value: 'sum', unit_prev: currency },
    // { key: 'NewDownloads', value: 'sum' },
    // { key: 'Redownloads', value: 'sum' },
    // { key: 'LatOnInstalls', value: 'sum' },
    // { key: 'LatOffInstalls', value: 'sum' },
    // { key: 'MMPInstalls', value: 'sum' },
    // { key: 'MMPCpi', value: 'sum' },
  ];
  const valueMap = {};
  const summaries = columns.map((it, i) => {
    const has = keys.filter((ft) => ft.key === it.property)[0];
    if (has) {
      let summary = '';
      if (has.value !== 'avg') {
        const value = data.map((vt) => vt[it.property]);
        let sum = window.$bigNumber(0);
        value.forEach((p) => {
          sum = sum.plus(p);
        });
        summary = sum.toNumber();
        summary = has.unit_prev ? has.unit_prev + summary : summary;
        summary = has.unit_append ? summary + has.unit_append : summary;
      }
      valueMap[it.property] = {
        value: summary,
        i,
      };
      return summary;
    } else {
      return '';
    }
  });
  const Taps = valueMap.Taps?.value;
  const Spend = Number(valueMap.Spend?.value.replace(currency, ''));
  const Installs = valueMap.Installs?.value;
  const Impressions = valueMap.Impressions?.value;

  const CR = valueMap.CR;
  const TTR = valueMap.TTR;
  const AvgCPA = valueMap.AvgCPA;
  const AvgCPT = valueMap.AvgCPT;
  const AvgCPM = valueMap.AvgCPM;

  if (CR && Taps && Installs) {
    summaries[CR.i] = ((Installs / Taps) * 100).toFixed(2) + '%';
  } else if (CR && Taps === 0) {
    summaries[CR.i] = '0.00%';
  }
  if (AvgCPT && Taps && Spend) {
    summaries[AvgCPT.i] = currency + (Spend / Taps).toFixed(2);
  } else if (AvgCPT && Taps === 0) {
    summaries[AvgCPT.i] = currency + '0.00';
  }
  if (TTR && Taps && Impressions) {
    summaries[TTR.i] = ((Taps / Impressions) * 100).toFixed(2) + '%';
  } else if (TTR && Impressions === 0) {
    summaries[TTR.i] = '0.00%';
  }
  if (AvgCPA && Installs && Spend) {
    summaries[AvgCPA.i] = currency + (Spend / Installs).toFixed(2);
  } else if (AvgCPA && Installs === 0) {
    summaries[AvgCPA.i] = currency + '0.00';
  }
  if (AvgCPM && Spend && Impressions) {
    summaries[AvgCPM.i] = currency + (Spend / Impressions / 1000).toFixed(2);
  } else if (AvgCPM && Impressions === 0) {
    summaries[AvgCPM.i] = currency + '0.00';
  }

  return summaries;
};
const toFilter = (initLoad) => {
  let list = [];
  if (state.valid) {
    state.olist.forEach((it) => {
      if (it.Apps) {
        list.push(it);
      }
    });
  } else {
    list = JSON.parse(JSON.stringify(state.olist));
  }
  if (initLoad === true) {
    state.list = list;
  }
  nextTick(() => {
    proxy.$refs.table.toFilter({
      type: 'or',
      v: { Name: state.txt, ID: state.txt },
    });
  });
};

const toAppDetail = (info) => {
  state.drawer[0].title = window.$l('App Detail');
  state.drawer[0].params = { info };
  state.currentDrawer = 0;
};
// 卸载
</script>
<style lang="scss" scoped></style>
