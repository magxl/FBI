<template>
  <DrawerArea
    :submiting="state.submiting"
    class="DetailTabNegativeAdd"
    @submit="toSubmit"
  >
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
          <div class="w200">
            <div class="pb8">
              <Campaign
                ref="campaign"
                v-model="state.form.campaignId"
                :org-id="orgId"
                multiple
                @change="campaignChange"
                :disabled="state.totalLoading"
              />
            </div>
            <div class="pb8">
              <AdGroup
                ref="adgroup"
                v-model="state.form.adgroupId"
                :campaign-id="state.form.campaignId"
                :org-id="orgId"
                multiple
                @change="adgroupChange"
                :disabled="state.totalLoading"
              />
            </div>
            <div class="pb8">
              <el-select
                v-model="state.form.matchType"
                placeholder=" "
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
          </div>
          <!--  -->
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
      <div class="w400 pr16">
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
      <el-table-column
        :label="$l('Campaign')"
        prop="campaignName"
        width="200"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        :label="$l('Ad Group')"
        prop="adgroupName"
        width="200"
        show-overflow-tooltip
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
  name: 'DetailTabNegativeAdd',
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
  form: {
    campaignId: [],
    adgroupId: [],
    matchType: 'EXACT',
  },
  total: 0,
  list: [],
  stamp: 0,
});
const { proxy } = getCurrentInstance();
// 挂载
onMounted(() => {
  getData();
});
// 事件
const toValidateAddToTable = () => {
  console.info(state.form);
  const { campaignId, adgroupId, negative } = state.form;
  if (!campaignId.length || !negative) {
    proxy.$message.warning({
      grouping: true,
      message: window.$l('Please Fill the Form first.'),
    });
  } else {
    toAddToTable();
  }
};
const toAddToTable = () => {
  state.stamp = +new Date();
  const { campaignId, adgroupId, matchType, negative } = state.form;
  const arr = [...new Set(negative.split('\n'))];
  const rows = [];
  if (adgroupId.length) {
    const nameObj = proxy.$refs.adgroup.getName();
    arr.forEach((it) => {
      if (it.trim()) {
        adgroupId.forEach((at) => {
          rows.push({
            id: state.stamp++,
            matchType,
            negative: it,
            adgroupName: nameObj[at],
            adgroupId: at,
          });
        });
      }
    });
  } else {
    const nameObj = proxy.$refs.campaign.getName();
    arr.forEach((it) => {
      if (it.trim()) {
        campaignId.forEach((at) => {
          rows.push({
            id: state.stamp++,
            matchType,
            negative: it,
            campaignName: nameObj[at],
            campaignId: at,
          });
        });
      }
    });
  }
  state.list = rows;
};
const getData = () => {
  state.totalLoading = true;
  window.$promise(() => {
    state.total = window.$rn(5000);
    state.totalLoading = false;
  });
};
const campaignChange = (v) => {
  state.form.adgroupId = [];
  if (v.length) {
    getData();
  }
};
const adgroupChange = (v) => {
  if (v.length) {
    getData();
  }
};
const toSubmit = () => {};
// 计算属性
const orgId = computed(() => {
  return prop.params.orginfo?.id;
});
// 监听

// 卸载

// Map
const matchTypeMap = window.$map.campaign.matchType;
</script>
<style lang="scss" scoped></style>
