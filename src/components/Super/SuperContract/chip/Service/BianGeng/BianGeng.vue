<template>
  <div class="BianGeng">
    <div class="flexMode vc p20-10">
      <span class="fs20 txt-blue pr30">变更服务</span>
      <el-button type="primary" size="mini" plain round @click="toReset">
        重置
      </el-button>
    </div>
    <div class="p10">
      <div class="flexMode vc p10">
        <span>变更区域：</span>
        <el-input v-model="state.info.biangengquyu" clearable class="maxw300" />
      </div>
      <div class="flexMode vc p10">
        <span>费　　用：</span>
        <el-input v-model="state.info.feiyong" clearable class="maxw300" />
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
      <p>注：每年续费的价格以当年政策和市场行情为准</p>
      <div class="flexMode vc p10">
        <span>自有地址变更区域：</span>
        <el-input v-model="state.info.ziyoudizhi" clearable class="maxw300" />
        <span class="pl10"></span>
      </div>
      <div class="flexMode vc p10">
        <span>变更服务费　　　：</span>
        <el-input v-model="state.info.fuwufei" clearable class="maxw300" />
        <span class="pl10">元</span>
      </div>
    </div>
  </div>
</template>
<script setup>
// 变更 服务
defineOptions({
  name: 'BianGeng',
});
import { reactive, watch } from 'vue';
const oinfo = {
  biangengquyu: '',
  feiyong: '',
  shouwfeifangshi: '',
  ziyoudizhi: '',
  fuwufei: '',
};
let state = reactive({ info: { ...oinfo } });
const emit = defineEmits();
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
  state.info = { ...oinfo };
};
</script>
<style lang="scss" scoped></style>
