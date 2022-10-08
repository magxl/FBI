<template>
  <div class="JiZhang p10">
    <div class="flexMode vc p20-10">
      <span class="fs20 txt-blue pr30">记账服务</span>
      <el-button type="primary" size="mini" plain round @click="toReset">
        重置
      </el-button>
    </div>
    <div class="p20-0">1.价款</div>
    <div class="p10 radius8 border-blue3-dashed">
      <div v-for="(it, i) in options" :key="i" class="p10">
        <div class="p10-0">{{ it.title }} {{ it.price }}</div>
        <el-checkbox-group
          v-model="state.amount"
          :max="1"
          @change="checkChange"
        >
          <el-checkbox
            v-for="(item, j) in it.items"
            :key="j"
            :label="item.value"
          >
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="p20-0">2.履行因素</div>
    <div class="p0-10">
      <p>
        注：1.新注册客户代理记账服务按营业执照成立日期的次月开始计算，纯记账客户具体记账日期以我司会计下发的记账服务合同补充条款记账日期为准。
      </p>
      <p class="indent2">
        2.次年记账续费无需另行签订合同，本协议对双方继续有效。
      </p>
    </div>
    <div class="p10">
      <el-descriptions
        border
        :column="2"
        direction="vertical"
        :labelStyle="{ width: '100px' }"
      >
        <el-descriptions-item label="会员服务项目"
          >记账服务</el-descriptions-item
        >
        <el-descriptions-item label="基础服务内容">
          <div>
            <p>1、账套初始化建立，日常账务处理；</p>
            <p>2、出具资产负债表、利润表、现金流量表；</p>
            <p>3、国地税综合申报及明细申报（进出口企业不负责出口退税）；</p>
            <p>
              4、通过企业信用信息公示系统向工商行政管理部门报送上年度报告(其他日常信息变更由企业自行公示)；
            </p>
            <p>5、企业所得税年度汇算清缴；</p>
            <p>6、配合协助税务调查。</p>
          </div>
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="p10-0">3.违约责任</div>
    <div class="p0-10">
      <p>记账违约责任描述1</p>
      <p>记账违约责任描述1</p>
      <p>记账违约责任描述1</p>
      <p>记账违约责任描述1</p>
      <p>记账违约责任描述1</p>
      <p>记账违约责任描述1</p>
    </div>
  </div>
</template>
<script setup>
// 记账 服务
import data from './data/index.js';
defineOptions({
  name: 'JiZhang',
});
const prop = defineProps({
  name: {
    type: String,
    default: 'xiaomiao',
  },
});
const emit = defineEmits();

import { reactive } from 'vue';
let state = reactive({
  amount: [],
});
const options =
  ['xiaomiao', 'houqi'].indexOf(prop.name) > -1
    ? data[prop.name]
    : data.xiaomiao;
const checkChange = (v) => {
  emit('updateService', { jizhang: v[0] });
};

const toReset = () => {
  state.amount = [];
  emit('updateService', { jizhang: null });
};
</script>
<style lang="scss" scoped></style>
