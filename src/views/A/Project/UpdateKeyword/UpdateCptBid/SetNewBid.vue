<template>
  <DialogArea
    v-bind="$attrs"
    class="SetNewBid"
    :submiting="state.submiting"
    @submit="toSubmit"
  >
    <div class="flexMode hc vc minh120 p16">
      <div class="p16 radius4 border-dark3-dashed">
        <div class="flexMode vc">
          <el-input-number
            v-model="state.v"
            :min="0"
            :precision="2"
            size="normal"
          />
          <el-tooltip placement="top" raw-content>
            <i class="adicon ad-help ml8 fs20"></i>
            <template #content>
              <div class="fs12 txt-white9">
                <div class="txt-white7">Tips</div>
                <div>1. {{ $l('More Than 0') }}</div>
                <div>2. {{ $l('Lower Than Daily Budget or Life Budget') }}</div>
              </div>
            </template>
          </el-tooltip>
        </div>
        <div v-if="error" class="fs12 txt-red pt16">
          {{ $l('Valid Forbidden') }}
        </div>
      </div>
    </div>
  </DialogArea>
</template>
<script setup>
// 定义
defineOptions({
  name: 'SetNewBid',
});
// 传参
const prop = defineProps({
  params: {
    type: Object,
    default: () => {},
  },
});
// 数据
const state = reactive({
  submiting: false,
});

// 挂载

// 事件
const toSubmit = (v) => {};
// 计算属性
const max = computed(() => {
  let r = Infinity;
  params.selection.forEach((it) => {
    if (it.cptBid < r) {
      r = it.cptBid;
    }
  });
  return r;
});
const error = computed(() => {
  return state.v > max.value;
});
// 监听

// 卸载
</script>
<style lang="scss" scoped></style>
