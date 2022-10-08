<template>
  <div class="ZhuCeJiZhang">
    <div class="">
      <div class="p10-0">
        <div class="p20">合计价格</div>
        <div class="p20 border-green3-dashed radius8">
          <p>
            <span class="pr10">总　价：</span>
            <span class="pr10 txt-blue">{{ price.totalAmount }}</span>
            <span class="pr10 txt-dark5">[{{ price.totalAmountNumber }}]</span>
          </p>
          <p>
            <span class="pr10">已付款：</span>
            <span class="pr10 txt-blue">{{ price.paiedAmount }}</span>
            <span class="pr10 txt-dark5">[{{ price.paiedAmountNumber }}]</span>
          </p>
          <p>
            <span class="pr10">未付款：</span>
            <span class="pr10 txt-blue">{{ price.unpaiedAmount }}</span>
            <span class="pr10 txt-dark5"
              >[{{ price.unpaiedAmountNumber }}]</span
            >
          </p>
        </div>
      </div>
      <SubjectAccount :type="type" />
      <!-- <div class="txt-blue dark7">
        记账服务 传值选中项目：{{ state.jizhang }}
      </div> -->
      <Service
        v-for="(it, i) in detail"
        :key="i"
        v-model="detail[i]"
        :dt="it"
        v-bind="$attrs"
      />
    </div>
  </div>
</template>
<script setup>
// 注册记账 合同
defineOptions({
  name: 'ZhuCeJiZhang',
});
const prop = defineProps({
  type: {
    type: String,
    default: '',
  },
  service: {
    type: Object,
    default: () => {},
  },
});
import { reactive, computed } from 'vue';
const state = reactive(prop.service);
const detail = reactive(prop.service.detail);
const price = computed(() => {
  return prop.service.price;
});
console.info('Body ZhuCeJiZhang', state);
</script>
<style lang="scss" scoped></style>
