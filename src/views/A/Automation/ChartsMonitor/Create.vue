<template>
  <div class="ChartsMonitorCreate DrawerBody">
    <el-form
      ref="form"
      :rules="state.rules"
      :model="state.form"
      label-width="160px"
    >
      <div class="border-b hover-box-shadow-dark1">
        <div class="p16 pb0">{{ $l('Country or Regions') }}</div>
        <div class="p16">
          <el-form-item label="" label-width="0" prop="regions">
            <el-checkbox-group v-model="state.form.regions">
              <el-checkbox
                v-for="(it, i) in regionsOptions"
                :key="i"
                :label="it.value"
                class="w160 vl mb16"
              >
                <div class="lh12">{{ it.label }}</div>
                <div class="pt8 fs12 txt-dark5">{{ it.value }}</div>
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
      </div>
      <!-- ↑ Regions -->
      <div class="border-b hover-box-shadow-dark1">
        <div class="flexMode vr p16 pb0">
          <span>{{ $l('Category Setting') }}</span>
          <span class="pl16 fs12 txt-orange7"
            >Select up to {{ state.maxCategory }} at the same time</span
          >
        </div>
        <div class="p16">
          <el-form-item label="" label-width="0" prop="category">
            <el-checkbox-group
              v-model="state.form.category"
              :max="state.maxCategory"
            >
              <template v-for="(it, i) in categoryOptions">
                <el-checkbox
                  v-if="it.value"
                  :key="i"
                  :label="it.value"
                  class="w160"
                >
                  <span :class="it.label.length > 20 && 'fs12'">
                    {{ it.label }}
                  </span>
                </el-checkbox>
                <div v-else class="pt4 mb4 border-b"></div>
              </template>
            </el-checkbox-group>
          </el-form-item>
        </div>
      </div>
      <!-- ↑ Category -->
      <div class="p16 pt0 border-b hover-box-shadow-dark1">
        <div class="p16-0">
          {{ $l('Ad Group Setting') }}
        </div>
        <el-form-item :label="$l('Campaign Group')" prop="orgId">
          <div class="wp100">
            <Org v-model="state.form.orgId" />
          </div>
        </el-form-item>
        <el-form-item :label="$l('Campaign')" prop="campaignId">
          <div class="wp100">
            <Campaign
              v-model="state.form.campaignId"
              :org-id="state.form.orgId"
            />
          </div>
        </el-form-item>
        <el-form-item :label="$l('Ad Group')" prop="adgroupId">
          <div class="wp100">
            <AdGroup
              v-model="state.form.adgroupId"
              :org-id="state.form.orgId"
              :campaign-id="state.form.campaignId"
            />
          </div>
        </el-form-item>
        <el-form-item :label="$l('Keyword Bid')" prop="keyword_bid">
          <el-input-number
            v-model="state.form.keyword_bid"
            :min="0"
            :precision="2"
            controls-position="right"
          />
        </el-form-item>
      </div>
      <!-- ↑ Ad Group -->
      <div class="h160">
        <!-- 占位留白 -->
      </div>
    </el-form>
  </div>
  <div class="DrawerFooter">
    <el-button
      :loading="state.submiting"
      round
      type="primary"
      @click="toValidate"
    >
      {{ $l('Submit') }}
    </el-button>
  </div>
</template>
<script setup>
defineOptions({
  name: 'ChartsMonitorCreate',
});
import { reactive } from 'vue';
// 数据
const state = reactive({
  submiting: false,
  form: {
    regions: [],
    category: [],
    orgId: '',
    campaignId: '',
    adgroupId: '',
  },
  rules: {
    orgId: [{ required: true }],
    campaignId: [{ required: true }],
    adgroupId: [{ required: true }],
    keyword_bid: [{ required: true }],
    regions: [{ required: true }],
    category: [{ required: true }],
  },
  maxCategory: 3,
});
const { proxy } = getCurrentInstance();
const store = inject('store');
const launch = store.launch();
// 计算属性
const regionsOptions = computed(() => {
  return window.$map.automation.chartsMonitorRegions;
});
const categoryOptions = computed(() => {
  return window.$map.automation.chartsMonitorCategory;
});
const lang = computed(() => {
  return launch.lang;
 });
// 监听

// 挂载

// 事件
const emit = defineEmits();
const toValidate = () => {
  proxy.$refs.form.validate((r) => {
    if (r) {
      toSubmit();
    }
  });
};
const toSubmit = () => {
  state.submiting = true;
  proxy.$setTimeout(() => {
    state.submiting = false;
    emit('close');
  }, window.$randomNumber(2000, 300));
};
// 卸载
</script>
<style lang="scss" scoped></style>
