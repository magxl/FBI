<template>
  <Page title="Create Keyword" class="CreateKeyword">
    <div class="flexMode hb p8-16 border-b">
      <!-- ↓ form -->
      <div class="flexMode vs">
        <div class="relative w240 pr8">
          <span class="abs l t txt-red fs12 lh24 z2">*</span>
          <div class="pb8">
            <OCA
              ref="oca"
              v-model:orgId="state.form.orgId"
              v-model:campaignId="state.form.campaignId"
              v-model:adgroupId="state.form.adgroupId"
              permission="1"
              :show-status="['RUNNING', 'PAUSED']"
              size="small"
              :placeholder="$l('Org & Campaign & Ad Group')"
              @change="ocaChange"
            />
          </div>
          <div class="pb8">
            <el-select
              v-model="state.form.matchType"
              size="small"
              :placeholder="`${$l('Match Type')}: ${
                defaultFormPlaceholder.matchType
              }`"
              class="wp100"
            >
              <el-option
                v-for="(it, i) in matchTypeMap"
                :key="i"
                :label="it.label"
                :value="it.value"
              />
            </el-select>
          </div>
          <div class="pb8">
            <el-select
              v-model="state.form.keywordStatus"
              size="small"
              :placeholder="`${$l('Keyword Status')}: ${
                defaultFormPlaceholder.keywordStatus
              }`"
              class="wp100"
            >
              <el-option
                v-for="(it, i) in keywordStatusMap"
                :key="i"
                :label="it.label[lang]"
                :value="it.value"
              />
            </el-select>
          </div>
          <div class="">
            <el-select
              v-model="state.form.removeDuplicate"
              size="small"
              :placeholder="`${$l('Remove Duplicate')}: ${
                defaultFormPlaceholder.removeDuplicate
              }`"
              class="wp100"
            >
              <el-option
                v-for="(it, i) in removeDuplicateMap"
                :key="i"
                :label="it.label[lang]"
                :value="it.value"
              />
            </el-select>
          </div>
        </div>
        <div class="flexMode flexV hb w240 pr8">
          <div class="wp100">
            <el-input-number
              v-model="state.form.cptBid"
              :min="0"
              :precision="2"
              :placeholder="$l('CPT Bid')"
              size="small"
              class="wp100"
            />
          </div>
          <div class="wp100">
            <el-input
              v-model="state.form.keyword"
              clearable
              :rows="4"
              size="small"
              resize="none"
              type="textarea"
              show-word-limit
              :placeholder="$l('Keyword')"
            />
          </div>
        </div>
        <!-- ↑ form -->
        <!-- ↓ dashed box -->
        <div class="flexMode flexV hr">
          <div class="w160 p8 border-dark3-dashed radius4">
            <div class="pb8 fs12 txt-c">
              <span class="txt-dark5">
                {{ $l('The Number You Can Create') }}
              </span>
              <span v-if="state.keywordCount !== null" class="pl4 txt-blue">
                {{ state.keywordCount }}
              </span>
            </div>
            <el-button
              plain
              type="primary"
              class="wp100"
              @click="toAddToTable"
            >
              <template #icon>
                <i class="adicon ad-download"></i>
              </template>
              <span>{{ $l('Add To Table') }}</span>
            </el-button>
          </div>
          <!-- dashed box -->
        </div>
      </div>
      <!-- left ↑ -->
      <!-- right ↓ -->
      <div class="w240 border-dark1 radius4 hover-box-shadow-dark1">
        <div class="flexMode vc p0-8 h24 fs14 txt-dark7 border-b">
          {{ $l('Hot Mode') }}
        </div>
        <div class="yscroll" style="height: 96px">
          <div
            v-for="(it, i) in state.hotMode"
            :key="i"
            class="flexMode vc hb p4-16 fs12 hover-bg-dark1"
            :class="i !== state.hotMode.length - 1 && 'border-b'"
            @click="toUseHotMode(it, i)"
          >
            <span class="pr8">{{ it.name }}</span>
            <i
              v-if="state.useHotMode === it.name"
              class="adicon ad-select fs14 txt-green"
            ></i>
          </div>
        </div>
      </div>
    </div>
    <!-- top -->
    <!-- table ↓ -->
    <Table
      ref="table"
      :loading="state.loading"
      :list="state.list"
      minus-height="134"
      @selection-change="selectionChange"
    >
      <template #actions>
        <div class="flexMode vc p0-16">
          <el-button
            :disabled="disabled"
            plain
            type="primary"
            @click="toSubmit"
          >
            <template #icon>
              <i class="adicon ad-upload"></i>
            </template>
            <span>{{ $l('Submit') }}</span>
          </el-button>
          <el-button
            :disabled="disabled"
            plain
            type="primary"
            @click="toEditBid"
          >
            {{ $l('Update Bid') }}
          </el-button>
          <el-popconfirm
            placement="top"
            :title="$l('Remove The Selection?')"
            @confirm="toRemoveSelection"
          >
            <template #reference>
              <el-button
                :disabled="disabled"
                plain
                type="primary"
              >
                {{ $l('Remove Selection') }}
              </el-button>
            </template>
          </el-popconfirm>
        </div>
      </template>
      <el-table-column
        type="selection"
        width="48"
        align="center"
        fixed="left"
      />
      <el-table-column :label="$l('Key')" prop="key" width="140" fixed="left" />
      <el-table-column
        :label="$l('Keyword')"
        prop="keyword"
        width="200"
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
      <el-table-column
        :label="$l('Match Type')"
        prop="matchType"
        width="100"
        :formatter="(row) => matchTypeObj[row.matchType]"
      />
      <el-table-column
        :label="$l('Remove Duplicate')"
        prop="removeDuplicate"
        width="140"
        :formatter="(row) => removeDuplicateObj[row.removeDuplicate]"
      />
      <el-table-column :label="$l('Status')" prop="keywordStatus" width="100">
        <template #default="{ row }">
          <Status :status="row.keywordStatus" />
        </template>
      </el-table-column>
      <el-table-column label="-" />
      <el-table-column :label="$l('Operation')" fixed="right" width="160">
        <template #default="{ row }">
          <span v-if="row.submitStatus">{{ row.submitStatus }}</span>
        </template>
      </el-table-column>
    </Table>
    <Dialog
      v-model:current="state.currentDialog"
      :dialog="state.dialog"
      @submit="dialogSubmit"
    />
  </Page>
</template>
<script setup>
import { batchMode } from '@com/batchMode.js';
import EditBid from './CreateKeyword/EditBid.vue';
defineOptions({
  name: 'CreateKeyword',
});
// 数据
const state = reactive({
  loading: false,
  form: {},
  defaultForm: {
    matchType: 'EXACT',
    removeDuplicate: 'country',
    keywordStatus: 'RUNNING',
  },
  list: [],
  keywordCount: null,
  selection: [],
  hotMode: [], // 推荐的规则
  useHotMode: '', // 使用中的规则
  stamp: 0,
  currentDialog: '',
  dialog: [
    {
      title: 'Update Bid',
      size: 500,
      cpt: markRaw(EditBid),
    },
  ],
});
const store = inject('store');
const launch = store.launch();
const { proxy } = getCurrentInstance();
// 计算属性
const lang = computed(() => {
  return launch.lang;
});
const disabled = computed(() => {
  return !state.selection.length;
});
const matchTypeObj = computed(() => {
  const obj = {};
  matchTypeMap.forEach((it) => {
    obj[it.value] = it[`label_${lang.value}`];
  });
  return obj;
});
const keywordStatusObj = computed(() => {
  const obj = {};
  keywordStatusMap.forEach((it) => {
    obj[it.value] = it[`label_${lang.value}`];
  });
  return obj;
});
const removeDuplicateObj = computed(() => {
  const obj = {};
  removeDuplicateMap.forEach((it) => {
    obj[it.value] = it[`label_${lang.value}`];
  });
  return obj;
});
const defaultFormPlaceholder = computed(() => {
  return {
    matchType: matchTypeObj.value[state.defaultForm.matchType],
    keywordStatus: keywordStatusObj.value[state.defaultForm.keywordStatus],
    removeDuplicate:
      removeDuplicateObj.value[state.defaultForm.removeDuplicate],
  };
});

// 监听

// 挂载
onMounted(() => {
  state.stamp = +new Date();
});
// 事件
const toAddToTable = () => {
  const { form, defaultForm, stamp } = state;
  if (
    form.orgId &&
    form.campaignId &&
    form.adgroupId &&
    form.keyword &&
    form.cptBid
  ) {
    const names = proxy.$refs.oca.getName();
    const arr = [...new Set(form.keyword.split('\n'))];
    const rows = [];
    arr.forEach((it, i) => {
      const keyword = it.trim();
      if (keyword) {
        const key = stamp + i + 1;
        rows.push({
          key,
          ...defaultForm,
          ...form,
          orgName: names[0],
          campaignName: names[1],
          adgroupName: names[2],
          keyword,
        });
      }
    });
    state.list = [...rows, ...state.list];
  } else {
    proxy.$message.warning(window.$l('Please Fill The Form'));
  }
};
const toSubmit = () => {
  console.info('toSubmit');
  batchMode({
    run: true,
    selection: state.selection,
    list: state.list,
    cb({ row, batch, i }) {
      clearTimeout(state.timer);
      return new Promise((resolve) => {
        state.timer = setTimeout(() => {
          const result = window.$rn(2) ? 'success' : 'fail';
          console.info(result);
          if (result === 'success') {
            batch.success++;
            batch.successList.push(row);
            proxy.$refs.table.editRow({ i, row: { submitStatus: 'Success' } });
          } else {
            batch.fail++;
            batch.failList.push(row);
            proxy.$refs.table.editRow({ i, row: { submitStatus: 'Fail' } });
          }
          resolve();
        }, window.$rn(3000, 200));
      });
    },
  });
};
const toEditBid = () => {
  state.dialog[0].title = proxy.$l(state.dialog[0].title);
  state.currentDialog = 0;
};
const toRemoveSelection = () => {
  const r = [];
  state.list.forEach((it) => {
    const has = state.selection.filter((ft) => ft.key === it.key)[0];
    if (!has) {
      r.push(it);
    }
  });
  state.list = r;
};
const dialogSubmit = (a) => {
  if (a) {
    const { type, v } = a;
    if (type === 'editBid') {
      state.selection.forEach((it) => {
        state.list.forEach((ft) => {
          if (ft.key === it.key) {
            ft.cptBid = v;
          }
        });
      });
    }
  }
};
const ocaChange = (v) => {
  state.keywordCount = window.$rn(5000);
};
const selectionChange = (v) => {
  state.selection = v;
};
const getHotModes = async () => {
  const list = window.$fd(5, (i) => {
    const id = i + 1;
    return {
      id,
      name: 'Hot Mode ' + id,
      cptBid: (
        window.$rn(window.$rn(100000, 10000), window.$rn(10000, 100)) / 100
      ).toFixed(2),
      keywordStatus: window.$rn(2) ? 'RUNNING' : 'PAUSED',
      matchType: window.$rn(2) ? 'EXACT' : 'BROAD',
      removeDuplicate: window.$rn(2) ? 'country' : 'adgroup',
    };
  });
  state.hotMode = list;
};
getHotModes();
const toUseHotMode = (it, i) => {
  state.useHotMode = it.name;
  state.form = {
    ...state.form,
    ...it,
  };
};
// maps
const matchTypeMap = window.$map.campaign.matchType;
const keywordStatusMap = [
  {
    label: 'Running',
    label_en_us: 'Running',
    label_zh_cn: '运行',
    value: 'RUNNING',
  },
  {
    label: 'Paused',
    label_en_us: 'Paused',
    label_zh_cn: '暂停',
    value: 'PAUSED',
  },
];
const removeDuplicateMap = [
  {
    label: 'By Country',
    label_en_us: 'By Country',
    label_zh_cn: '按国家地区',
    value: 'country',
  },
  {
    label: 'By Ad Group',
    label_en_us: 'By Ad Group',
    label_zh_cn: '按广告组',
    value: 'adgroup',
  },
];
// 卸载
</script>
<style lang="scss" scoped></style>
