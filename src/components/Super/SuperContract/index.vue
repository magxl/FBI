<template>
  <div class="SuperContract">
    <ContractHeader v-bind="$attrs" :subject="subject" />
    <ContractBody
      v-for="(it, i) in info"
      v-bind="$attrs"
      :dt="it"
      :type="subject.type"
      @updateService="(v) => updateService(v, i)"
    />
    <ContractFooter v-bind="$attrs" :subject="subject" :seal="seal" />
    <div class="submitArea flexMode hr">
      <el-button size="large" round @click="toSubmit">提交</el-button>
      <el-button size="large" round @click="toPdf">转PDF</el-button>
    </div>
    <WaterMark v-bind="$attrs" el=".SuperContract" />
  </div>
</template>
<script setup>
// 合同 壳
import h2c from 'html2canvas';
// import { downloadPDF } from 'html2pdf';
defineOptions({
  name: 'SuperContract',
});

import { reactive, inject, getCurrentInstance } from 'vue';
import ContractHeader from './ContractHeader.vue';
import ContractBody from './ContractBody.vue';
import ContractFooter from './ContractFooter.vue';

const store = inject('store');
const { contract } = store;
const { info } = contract();
// const seal = () => import(`./img/contract/${subject.type}.png`);
const subject = reactive(info[0].main.subject);
const copyInfo = reactive(info);

const seals = import.meta.glob('/src/assets/img/contract/*.png');
let sealArray = [];
Object.keys(seals).forEach((it) => {
  sealArray.push(it);
});
const seal = sealArray.filter((it) => {
  return it.includes(subject.type);
})[0];

// 更新合同信息 store contract info
const updateService = (v, i) => {
  let index = 0;
  copyInfo[i].main.service.detail.forEach((it, ix) => {
    if (it.name === v.name) {
      index = ix;
    }
  });
  copyInfo[i].main.service.detail[index] = {
    ...copyInfo[i].main.service.detail[index],
    ...v.value,
  };
  // store.contract.saveData('info', copyInfo);
};

//
const toSubmit = () => {
  console.info('toSubmit');
};
const toPdf = async () => {
  const { proxy } = getCurrentInstance();
  const el = proxy.$el;
  // const img = await convertToImage(el);
  downloadPDF(el, 'contract');
};

const convertToImage = (container, options = {}) => {
  // 设置放大倍数
  const scale = window.devicePixelRatio;

  // 传入节点原始宽高
  const _width = container.offsetWidth;
  const _height = container.offsetHeight;

  let { width, height } = options;
  width = width || _width;
  height = height || _height;

  // html2canvas配置项
  const ops = {
    scale,
    // width,
    // height,
    useCORS: true,
    allowTaint: false,
    ...options,
  };

  return h2c(container, ops).then((canvas) => {
    // 返回图片的二进制数据
    return canvas.toDataURL('image/png');
  });
};
</script>
<style lang="scss" scoped>
.SuperContract {
  position: relative;
  background-color: $white9;
  max-width: 1024px;
  padding: 10px 20px;
  margin: 10px auto;
  border-radius: 8px;
  box-shadow: $blue1 0 0 20px, $blue1 0 0 10px;
  overflow: hidden;
  .submitArea {
    position: fixed;
    right: 20px;
    bottom: 30px;
    width: 100px;
    filter: drop-shadow(0 0 10px $blue3);
    .submitBtn {
      width: 100px;
      height: 100px;
      background-color: $blue;
    }
  }
}
</style>
