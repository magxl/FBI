<template>
  <div class="ZhuCe">
    <div class="flexMode vc p20-10">
      <span class="fs20 txt-blue pr30">注册服务</span>
      <el-button type="primary" size="mini" plain round @click="toReset">
        重置
      </el-button>
    </div>
    <div class="p10">
      <div class="flexMode vc p10">
        <span>注册区域：</span>
        <el-input
          v-model="state.info.zhucequyu"
          class="maxw300"
          clearable
          placeholder=""
        />
      </div>
      <div class="flexMode vc p10">
        <span>主营业务：</span>
        <el-input
          v-model="state.info.zhuyingyewu"
          class="maxw300"
          clearable
          placeholder=""
        />
      </div>
      <div class="flexMode vc p10">
        <span>费　　用：</span>
        <el-input
          v-model="state.info.feiyong"
          class="maxw300"
          clearable
          placeholder=""
        />
      </div>
      <div class="p10">
        <el-radio-group v-model="state.info.shoufeifangshi">
          <el-radio
            v-for="(it, i) in shoufeiOptions"
            :key="i"
            :label="it.value"
          >
            <span>{{ it.label }}</span>
          </el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="p10">
      <p>注：1.地址价格以当年政策和市场行情为准；</p>
      <p class="indent2">
        2.注册交付：五章（公章、合同章、财务章、发票章、法人章）一照（营业执照正副本）。
      </p>
    </div>
  </div>
</template>
<script setup>
// 注册 服务
defineOptions({
  name: 'ZhuCe',
});
import { reactive, watch } from 'vue';
const emit = defineEmits();
const state = reactive({
  info: {},
});
watch(
  () => state.info,
  (n) => {
    emit('updateService', n);
  },
  {
    deep: true,
  },
);
const shoufeiOptions = [
  {
    label: '每年续费',
    value: 'meinian',
  },
  {
    label: '一次性收费',
    value: 'yicixing',
  },
];

const toReset = () => {
  state.info = {};
};
</script>
<style lang="scss" scoped></style>
