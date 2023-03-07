<template>
  <DrawerArea class="DetailTabKeywordCreate">
    <div class="flexMode vs hb h160 pt12 border-b">
      <div class="flexMode vs">
        <div class="w240 pl16">
          <Textarea
            v-model="state.form.negative"
            :rows="7"
            :max="state.total"
            :placeholder="$l('Negative: One per line.')"
          />
        </div>
        <div class="flexMode flexV hb vs pl16 pb12">
          <div class="w240 pb8">
            <Org v-model="state.form.orgId" :disabled="state.totalLoading" />
          </div>
          <div class="w240 pb8">
            <Campaign
              v-model="state.form.campaignId"
              :org-id="state.form.orgId"
              :disabled="state.totalLoading"
            />
          </div>
          <div class="w240 pb8">
            <AdGroup
              v-model="state.form.adgroupId"
              :org-id="state.form.orgId"
              :campaign-id="state.form.campaignId"
              :disabled="state.totalLoading"
            />
          </div>
          <div class="w240 pb8">
            <el-input-number
              v-model="state.form.cptBid"
              :min="0"
              placeholder="CPT Bid"
              class="wp100"
            />
          </div>
        </div>
        <div class="flexMode flexV hb vs pl16 pb12">
          <div class="w200 pb8">
            <el-select
              v-model="state.form.matchType"
              :placeholder="matchTypePlaceholder"
              class="wp100"
            >
              <el-option
                v-for="(it, i) in matchTypeMap"
                :key="i"
                :label="it[`label_${lang}`]"
                :value="it.value"
              />
            </el-select>
          </div>
          <div class="w200 pb8">
            <el-select
              v-model="state.form.status"
              :placeholder="statusPlaceholder"
              class="wp100"
            >
              <el-option
                v-for="(it, i) in statusMap"
                :key="i"
                :label="it"
                :value="it"
              >
                <Status :status="it" />
              </el-option>
            </el-select>
          </div>
          <div class="w200 pb8">
            <el-select
              v-model="state.form.status"
              :placeholder="removeDuplicatePlaceholder"
              class="wp100"
            >
              <el-option
                v-for="(it, i) in removeDuplicateMap"
                :key="i"
                :label="it.label"
                :value="it.value"
              >
              </el-option>
            </el-select>
          </div>
          <!-- add btn -->
          <div
            class="flexMode hc vc w200 p8 border-dark1-dashed bg-white9 radius4"
          >
            <el-button
              plain
              type="primary"
              @click="toValidateAddToTable"
              class="wp100"
            >
              {{ $l('Add to Table') }}
            </el-button>
          </div>
        </div>
      </div>
      <!-- left -->
      <!-- right -->
      <div class="w400 p0-16">
        <el-input
          v-model="state.result"
          :rows="7"
          readonly
          resize="none"
          type="textarea"
          :placeholder="$l('Submit Result')"
        />
      </div>
    </div>
    <!-- form -->
    <!-- table -->
    <VsTable
      :loading="state.loading"
      :list="state.list"
      minus-height="160"
      border-top
    >
      <template #actions>
        <div class="flexMode vc p0-16">
          <el-button plain type="primary" @click="toSubmit">
            <template #icon>
              <i class="adicon ad-sourceimport fs14"></i>
            </template>
            <span class="pl4">{{ $l('Submit') }}</span>
          </el-button>
          <el-button plain type="primary" @click="toEditCptBid">{{
            $l('Edit CPT Bid')
          }}</el-button>
          <el-button plain type="primary" @click="toRemoveSelection">{{
            $l('Remove Selection')
          }}</el-button>
        </div>
      </template>
      <el-table-column label="ID" prop="id" width="120"></el-table-column>
      <el-table-column
        :label="$l('Keyword')"
        prop="negative"
        width="200"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        :label="$l('Match Type')"
        prop="matchType"
        width="100"
      ></el-table-column>
      <el-table-column label="-"></el-table-column>
      <el-table-column :label="$l('Operation')" fixed="right" width="100">
        <template #default="{ row }">
          <div class="mgbtn circle24 red">
            <i class="adicon ad-remove"></i>
          </div>
        </template>
      </el-table-column>
    </VsTable>
  </DrawerArea>
</template>
<script setup>
// 定义
defineOptions({
  name: 'DetailTabKeywordCreate',
});
// 传参
const prop = defineProps({
  params: {
    type: Object,
    default: Object.create(null),
  },
});
// 数据
const state = reactive({
  loading: false,
  totalLoading: true,
  form: {},
  rules: {},
  defaultForm: {
    matchType: 'EXACT',
    status: 'RUNNING',
    removeDuplicate: 0,
  },
  list: [],
  result: '',
  total: 0,
});

// 挂载
onMounted(() => {
  state.form.orgId = prop.params.orginfo?.id || 0;
  getTotal();
});
// 事件
const getTotal = () => {
  state.totalLoading = true;
  window.$promise(() => {
    state.total = window.$rn(5000);
    state.totalLoading = false;
  });
};
// 计算属性
const lang = computed(() => {
  return window.$getLang();
});
const statusPlaceholder = computed(() => {
  return (
    'Status: ' + statusAllMap[state.defaultForm.status][`label_${lang.value}`]
  );
});
const matchTypePlaceholder = computed(() => {
  return (
    'Match Type: ' +
    matchTypeMap.filter((ft) => ft.value === state.defaultForm.matchType)[0][
      `label_${lang.value}`
    ]
  );
});
const removeDuplicatePlaceholder = computed(() => {
  return (
    'Remove Duplicate: ' +
    removeDuplicateMap.filter(
      (ft) => ft.value === state.defaultForm.removeDuplicate,
    )[0][`label_${lang.value}`]
  );
});
// 监听

// 卸载

// Map
const statusMap = ['RUNNING', 'PAUSED'];
const statusAllMap = window.$map.statusMap;
const matchTypeMap = window.$map.campaign.matchType;
const removeDuplicateMap = [
  {
    label: 'By Country',
    label_en_us: 'By Country',
    label_zh_cn: '按国家',
    value: 0,
  },
  {
    label: 'By Ad Group',
    label_en_us: 'By Ad Group',
    label_zh_cn: '按广告组',
    value: 1,
  },
];
</script>
<style lang="scss" scoped></style>
