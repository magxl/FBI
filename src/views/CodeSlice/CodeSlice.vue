<template>
  <div class="CodeSlice">
    <div class="p10">
      <el-input
        v-model="state.originCode"
        clearable
        :rows="30"
        resize="vertical"
        type="textarea"
        placeholder="源数据"
        @change="originChange"
      />
    </div>
    <div class="">
      <div v-for="(it, i) in state.code" :key="i" class="p10">
        {{ it }}
      </div>
    </div>
  </div>
</template>
<script setup>
defineOptions({
  name: 'CodeSlice',
});
import { reactive } from 'vue';
const state = reactive({
  originCode: '',
  code: [],
});
const originChange = (v) => {
  v = v.split('</symbol>');
  const code = {};
  v.forEach((it) => {
    const id = it.match(/id="(\S*)"/);
    if (it) {
      code[id[1]] = it + '</symbol>';
    }
  });
  window.$copy(JSON.stringify(code), false);
  state.code = code;
};
</script>
<style lang="scss" scoped>
.CodeSlice {
  height: 100%;
  overflow-y: auto;
  padding-bottom: 20px;
}
</style>
