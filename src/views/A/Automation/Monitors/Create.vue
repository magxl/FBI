<template>
  <div class="MonitorsCreate DrawerBody">
    <el-form
      ref="form"
      :rules="state.rules"
      :model="state.form"
      label-width="160px"
    >
      <div class="border-b hover-box-shadow-dark1">
        <div class="p16">{{ $l('Setting') }}</div>
        <div class="p0-16">
          <el-form-item :label="$l('Name')" prop="name">
            <el-input
              v-model="state.form.name"
              clearable
              placeholder=" "
              maxlength="50"
              show-word-limit
            />
          </el-form-item>
        </div>
        <div class="p0-16">
          <el-form-item :label="$l('Type')" prop="type">
            <el-select v-model="state.form.type" placeholder=" ">
              <el-option
                v-for="(it, i) in typeMap"
                :key="i"
                :label="it.label"
                :value="it.value"
              />
            </el-select>
          </el-form-item>
        </div>
        <div class="p0-16">
          <el-form-item :label="$l('Campaign Group')" prop="orgId">
            <div class="wp100">
              <Org
                v-model="state.form.orgId"
                v-model:currency="state.currency"
              />
            </div>
          </el-form-item>
        </div>
        <div class="p0-16">
          <el-form-item :label="$l('Campaign')" prop="campaignId">
            <div class="wp100">
              <Campaign
                v-model="state.form.campaignId"
                :org-id="state.form.orgId"
              />
            </div>
          </el-form-item>
        </div>
        <div class="p0-16">
          <el-form-item :label="$l('Ad Group')" prop="adgroupId">
            <div class="wp100">
              <AdGroup
                v-model="state.form.adgroupId"
                :org-id="state.form.orgId"
                :campaign-id="state.form.campaignId"
              />
            </div>
          </el-form-item>
        </div>
        <div class="p0-16">
          <el-form-item :label="$l('Logic')" prop="logic">
            <el-radio-group v-model="state.form.logic">
              <el-radio v-for="(it, i) in logicMap" :key="i" :label="it.value">
                <span>{{ it.label }}</span>
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="p0-16">
          <el-form-item :label="$l('Timezone')" prop="timezone_name">
            <Timezone
              v-model="state.form.timezone"
              v-model:timezone_name="state.form.timezone_name"
              default-local
            />
          </el-form-item>
        </div>
      </div>
      <!--  -->
      <div class="border-b hover-box-shadow-dark1">
        <div class="p16">{{ $l('Conditions') }}</div>
        <div class="p0-16">
          <div
            v-for="(it, i) in state.form.condition"
            :key="i"
            class="relative p16 pl40 mb16 border-dark3-dashed radius12 hover-box-shadow-dark1"
          >
            <div class="indexArea">{{ i + 1 }}</div>
            <el-form-item :label="$l('Metric')" prop="">
              <el-select
                v-model="it.type"
                placeholder=" "
                @change="metricChange(it, i)"
              >
                <el-option
                  v-for="(it, i) in conditionMetricMap"
                  :key="i"
                  :label="it.label"
                  :value="it.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="" prop="">
              <div
                v-if="['impressions', 'taps', 'installs'].indexOf(it.type) > -1"
                class="flexMode vc"
              >
                <el-input-number
                  v-model="it.min"
                  :min="0"
                  controls-position="right"
                />
                <div class="pl8">
                  <el-select
                    v-model="it.compare_min"
                    placeholder=" "
                    class="w64"
                  >
                    <el-option
                      v-for="(it, i) in compareMinMap"
                      :key="i"
                      :label="it.label"
                      :value="it.value"
                    />
                  </el-select>
                </div>
                <div class="p0-8 txt-dark5">~</div>
                <el-select v-model="it.compare_max" placeholder=" " class="w64">
                  <el-option
                    v-for="(it, i) in compareMaxMap"
                    :key="i"
                    :label="it.label"
                    :value="it.value"
                  />
                </el-select>
                <div class="pl8">
                  <el-input-number
                    v-model="it.max"
                    :min="0"
                    controls-position="right"
                  />
                </div>
              </div>
              <!-- ↑ 整数 -->
              <!-- ↓ 金额 -->
              <div
                v-else-if="['spend', 'cpa', 'cpt'].indexOf(it.type) > -1"
                class="flexMode vc"
              >
                <el-input-number
                  v-model="it.min"
                  :min="0"
                  :precision="2"
                  controls-position="right"
                />
                <div class="pl8">
                  <el-select
                    v-model="it.compare_min"
                    placeholder=" "
                    class="w64"
                  >
                    <el-option
                      v-for="(it, i) in compareMinMap"
                      :key="i"
                      :label="it.label"
                      :value="it.value"
                    />
                  </el-select>
                </div>
                <div class="p0-8 txt-dark5">~</div>
                <el-select v-model="it.compare_max" placeholder=" " class="w64">
                  <el-option
                    v-for="(it, i) in compareMaxMap"
                    :key="i"
                    :label="it.label"
                    :value="it.value"
                  />
                </el-select>
                <div class="pl8">
                  <el-input-number
                    v-model="it.max"
                    :min="0"
                    :precision="2"
                    controls-position="right"
                  />
                </div>
                <span class="pl8 txt-dark5">({{ state.currency }})</span>
              </div>
              <!-- ↑ 金额 -->
              <!-- ↓ 百分比 -->
              <div
                v-else-if="['ttr', 'cr'].indexOf(it.type) > -1"
                class="flexMode vc"
              >
                <el-input-number v-model="it.min" controls-position="right" />
                <div class="pl8">
                  <el-select
                    v-model="it.compare_min"
                    placeholder=" "
                    class="w64"
                  >
                    <el-option
                      v-for="(it, i) in compareMinMap"
                      :key="i"
                      :label="it.label"
                      :value="it.value"
                    />
                  </el-select>
                </div>
                <div class="p0-8 txt-dark5">~</div>
                <el-select v-model="it.compare_max" placeholder=" " class="w64">
                  <el-option
                    v-for="(it, i) in compareMaxMap"
                    :key="i"
                    :label="it.label"
                    :value="it.value"
                  />
                </el-select>
                <div class="pl8">
                  <el-input-number v-model="it.max" controls-position="right" />
                </div>

                <span class="pl8 txt-dark5">(%)</span>
              </div>
              <!-- ↑ 百分比 -->
            </el-form-item>
            <!--  -->
            <div class="toolArea flexMode hr vc">
              <el-button
                v-if="state.form.condition.length > 1"
                plain
                circle
                type="danger"
                size="mini"
                @click="toConditionDel(it, i)"
              >
                <template #icon>
                  <i class="adicon ad-minus fs20"></i>
                </template>
              </el-button>
              <el-button
                v-if="i === 0"
                plain
                circle
                type="success"
                size="mini"
                @click="toConditionAdd(it, i)"
              >
                <template #icon>
                  <i class="adicon ad-plus fs20"></i>
                </template>
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <!-- ↑ condition -->

      <div class="border-b hover-box-shadow-dark1">
        <div class="p16">{{ $l('Operations') }}</div>
        <div class="p0-16">
          <div
            v-for="(it, i) in state.form.operation"
            :key="i"
            class="relative p16 pl40 mb16 border-dark3-dashed radius12 hover-box-shadow-dark1"
          >
            <div class="indexArea">{{ i + 1 }}</div>
            <el-form-item :label="$l('Type')" prop="">
              <el-select v-model="it.type" placeholder=" ">
                <el-option
                  v-for="(it, i) in operationMap"
                  :key="i"
                  :label="it.label"
                  :value="it.value"
                />
              </el-select>
            </el-form-item>
            <!--  -->
            <div class="toolArea flexMode hr vc">
              <el-button
                v-if="state.form.operation.length > 1"
                plain
                circle
                type="danger"
                size="mini"
                @click="toOperationDel(it, i)"
              >
                <template #icon>
                  <i class="adicon ad-minus fs20"></i>
                </template>
              </el-button>
              <el-button
                v-if="i === 0"
                plain
                circle
                type="success"
                size="mini"
                @click="toOperationAdd(it, i)"
              >
                <template #icon>
                  <i class="adicon ad-plus fs20"></i>
                </template>
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <!-- ↑ operation -->
    </el-form>
    <div class="h160"></div>
  </div>
  <div class="DrawerFooter">
    <el-button
      type="primary"
      :loading="state.submiting"
      round
      @click="toValidate"
      >Submit</el-button
    >
  </div>
</template>
<script setup>
defineOptions({
  name: 'MonitorsCreate',
});
import { reactive } from 'vue';
const { proxy } = getCurrentInstance();
// 数据
const state = reactive({
  form: {
    logic: 'or',
    condition: [{}],
    operation: [{}],
  },
  rules: {
    name: [{ required: true }],
    type: [{ required: true }],
    orgId: [{ required: true }],
  },
  currency: '',
});

// 计算属性
const timezoneOptions = computed(() => {
  return window.$map.common.timezoneOptions;
});
// 监听

// 挂载
const store = inject('store');
const launch = store.launch();
onMounted(() => {
  const { timezone, timezone_name } = launch.localTimezone;
  state.form.timezone = timezone;
  state.form.timezone_name = timezone_name;
});
// 事件
const metricChange = (it, i) => {
  console.info(state.currency);
};
const toConditionAdd = (it, i) => {
  if (it.type) {
    state.form.condition.unshift({});
  } else {
    proxy.$message.warning(window.$l('Please select the Metric type of the current item before adding'));
  }
};
const toConditionDel = (it, i) => {
  state.form.condition.splice(i, 1);
};
const toOperationAdd = (it, i) => {
  state.form.operation.unshift({});
};
const toOperationDel = (it, i) => {
  state.form.operation.splice(i, 1);
};
const toValidate = () => {
  proxy.$refs.form.validate((r) => {
    if (r) {
      toSubmit();
    }
  });
};
const toSubmit = () => {
  console.info('toSubmit', state.form);
};

// 字典
const typeMap = computed(() => {
  return [
    {
      label: 'Keywords',
      value: 'keywords',
    },
    {
      label: 'Search Term',
      value: 'searchTerm',
    },
    {
      label: 'CPA',
      value: 'cpa',
    },
    {
      label: 'CPT',
      value: 'cpt',
    },
  ];
});

const logicMap = computed(() => {
  return [
    {
      label: 'Or',
      value: 'or',
    },
    {
      label: 'And',
      value: 'and',
    },
  ];
});
const compareMinMap = computed(() => {
  return [
    {
      label: '<',
      value: '>',
    },
    {
      label: '≤',
      value: '>=',
    },
  ];
});
const compareMaxMap = computed(() => {
  return [
    {
      label: '<',
      value: '<',
    },
    {
      label: '≤',
      value: '<=',
    },
  ];
});
const conditionMetricMap = computed(() => {
  const dt = [
    {
      label: 'Spends',
      value: 'spend',
    },
    {
      label: 'Impressions',
      value: 'impressions',
    },
    {
      label: 'Taps',
      value: 'taps',
    },
    {
      label: 'Installs',
      value: 'installs',
    },
    {
      label: 'TTR',
      value: 'ttr',
    },
    {
      label: 'CR',
      value: 'cr',
    },
    {
      label: 'Avg CPT',
      value: 'cpt',
    },
    {
      label: 'Avg CPA',
      value: 'cpa',
    },
  ];
  const { condition } = state.form;
  return dt.map((it) => {
    const has = condition.filter((ft) => ft.value === it.value)[0];
    if (has) {
      it.disabled = true;
    } else {
      it.disabled = false;
    }
    return it;
  });
});
const operationMap = computed(() => {
  return [
    {
      label: 'Mail',
      value: 'email',
      visible: ['keywords', 'searchTerm', 'price', 'cpt', 'cpa', 'daily'],
    },
    {
      label: 'Paused',
      value: 'pause',
      visible: ['keywords', 'price', 'cpt', 'daily', 'cpa'],
    },
    // {
    //   label: 'Increase bids',
    //   value: 'changePriceOn',
    //   visible: ['keywords'],
    // },
    {
      label: 'Adjust bids',
      value: 'changePrice',
      visible: ['keywords'],
    },
    {
      label: 'Decrease bids',
      value: 'changePriceDown',
      visible: ['cpt', 'cpa', 'price'],
    },
    {
      label: 'Add Keyword',
      value: 'keyword',
      visible: ['searchTerm'],
    },
    {
      label: 'Add Negative Keyword',
      value: 'negative',
      visible: ['searchTerm', 'keywords'],
    },
  ];
});
const operationMethodMap = computed(() => {
  return [
    {
      label: 'Avg CPT',
      value: 'cpt',
    },
    {
      label: 'Current Bid',
      value: 'bid',
    },
  ];
});
// 卸载
</script>
<style lang="scss" scoped>
.indexArea {
  position: absolute;
  top: 0;
  left: 0%;
  padding: 6px 12px;
  font-size: 12px;
  border-radius: 12px 0 12px 0;
  border-right: 1px $dark3 dashed;
  border-bottom: 1px $dark3 dashed;
}
</style>
