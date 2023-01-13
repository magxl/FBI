<template>
  <div class="ChartsMonitorCreate DrawerBody">
    <el-form
      ref="form"
      :rules="state.rules"
      :model="state.form"
      label-width="160px"
    >
      <div class="border-b hover-box-shadow-dark1">
        <div class="p16 pb0">{{ $l('国家或地区') }}</div>
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
          <span>{{ $l('分类设置') }}</span>
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
          {{ $l('广告组设置') }}
        </div>
        <el-form-item :label="$l('广告系列组')" prop="org_id">
          <div class="wp100">
            <Org v-model="state.form.org_id" />
          </div>
        </el-form-item>
        <el-form-item :label="$l('广告系列')" prop="campaign_id">
          <div class="wp100">
            <Campaign
              v-model="state.form.campaign_id"
              :org-id="state.form.org_id"
            />
          </div>
        </el-form-item>
        <el-form-item :label="$l('广告组')" prop="adgroup_id">
          <div class="wp100">
            <AdGroup
              v-model="state.form.adgroup_id"
              :org-id="state.form.org_id"
              :campaign-id="state.form.campaign_id"
            />
          </div>
        </el-form-item>
        <el-form-item :label="$l('关键词出价')" prop="keyword_bid">
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
      {{ $l('提交') }}
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
    org_id: '',
    campaign_id: '',
    adgroup_id: '',
  },
  rules: {
    org_id: [{ required: true }],
    campaign_id: [{ required: true }],
    adgroup_id: [{ required: true }],
    keyword_bid: [{ required: true }],
    regions: [{ required: true }],
    category: [{ required: true }],
  },
  maxCategory: 3,
});
const { proxy } = getCurrentInstance();
// 计算属性
const regionsOptions = computed(() => {
  return window.$map.automation.chartsMonitorRegions;
});
const categoryOptions = computed(() => {
  return window.$map.automation.chartsMonitorCategory;
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
    emit('closeDrawer');
  }, window.$randomNumber(2000, 300));
};
// 卸载
</script>
<style lang="scss" scoped></style>
