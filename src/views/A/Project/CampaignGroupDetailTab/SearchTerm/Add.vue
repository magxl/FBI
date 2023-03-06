<template>
  <DrawerArea
    :submiting="state.submiting"
    class="DetailTabSearchTermAdd"
    @submit="toValidate"
  >
    <div class="p16">
      <div class="pb8 fs14">
        {{ prop.params.orginfo.name }}
      </div>
      <el-radio-group v-model="state.tab">
        <el-radio-button
          v-for="(it, i) in radioOptions"
          :key="i"
          :label="it.value"
        >
          <span>{{ it.label }}</span>
        </el-radio-button>
      </el-radio-group>
      <!-- tab -->
      <!-- form -->
      <div class="p16-0">
        <el-form
          ref="form"
          :key="state.tab"
          :rules="rules"
          :model="state.form"
          label-width="100px"
          :validate-on-rule-change="false"
        >
          <el-form-item :label="$l('Campaign')" prop="campaignId">
            <Campaign
              v-model="state.form.campaignId"
              :org-id="orgId"
              class="wp100"
            />
          </el-form-item>
          <el-form-item :label="$l('Ad Group')" prop="adgroupId">
            <AdGroup
              v-model="state.form.adgroupId"
              :campaign-id="state.form.campaignId"
              :org-id="orgId"
              class="wp100"
            />
          </el-form-item>
          <template v-if="state.tab === 0">
            <el-form-item :label="$l('CPT Bid')" prop="cptBid">
              <el-input-number
                v-model="state.form.cptBid"
                :min="0"
                :precision="2"
                controls-position="right"
              />
              <span class="pl8 txt-dark5">{{ currency }}</span>
            </el-form-item>
            <el-form-item :label="$l('Match')" prop="match">
              <el-radio-group v-model="state.form.match">
                <el-radio
                  v-for="(it, i) in matchOptions"
                  :key="i"
                  :label="it.value"
                >
                  <span>{{ it.label }}</span>
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$l('Status')" prop="status">
              <el-select v-model="state.form.status" placeholder=" ">
                <template #prefix>
                  <Status :status="state.form.status" :label="false" />
                </template>
                <el-option
                  v-for="(it, i) in statusOptions"
                  :key="i"
                  :label="it.label"
                  :value="it.value"
                >
                  <Status :status="it.value" />
                </el-option>
              </el-select>
            </el-form-item>
          </template>
        </el-form>
      </div>
    </div>
  </DrawerArea>
</template>
<script setup>
// 定义
defineOptions({
  name: 'DetailTabSearchTermAdd',
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
  tab: 0,
  form: {
    match: 0,
    status: 'RUNNING',
  },
  submiting: false,
});
const { proxy } = getCurrentInstance();
// 挂载
onMounted(() => {
  if (prop.params.type) {
    state.tab = prop.params.type;
  }
});
// 事件
const toValidate = () => {
  proxy.$refs.form.validate((r) => {
    if (r) {
      toSubmit();
    }
  });
};
const toSubmit = () => {
  state.submiting = true;
  setTimeout(() => {
    state.submiting = false;
  }, window.$rn(3000));
};
// 计算属性
const orgId = computed(() => {
  return prop.params.orginfo?.id || 0;
});
const currency = computed(() => {
  return prop.params.orginfo?.currency || '';
});
const rules = computed(() => {
  const r = {
    campaignId: [{ required: true }],
  };
  if (state.tab === 0) {
    r.adgroupId = [{ required: true }];
    r.cptBid = [{ required: true }];
  }
  return r;
});
// 监听

// 卸载

// Map
const radioOptions = [
  {
    label: window.$l('Keyword'),
    value: 0,
  },
  {
    label: window.$l('Negative'),
    value: 1,
  },
];
const matchOptions = [
  {
    label: window.$l('Exact'),
    value: 0,
  },
  {
    label: window.$l('Broad'),
    value: 1,
  },
];
const statusOptions = [
  {
    label: window.$l('Running'),
    value: 'RUNNING',
  },
  {
    label: window.$l('Paused'),
    value: 'PAUSED',
  },
];
</script>
<style lang="scss" scoped></style>
