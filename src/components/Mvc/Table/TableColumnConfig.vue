<template>
  <div class="TableColumnConfig">
    <div v-for='(it) in state.columns' :key='it.prop' class="p5-10 hover-bg-littleBlue">
      <el-switch
        v-model='it.visible'
        class='mgswitch'
        active-text='开启'
        inactive-text='关闭'
      />
      <span class="pl10 txt-dark9">{{it.props.label}}</span>
    </div>
    <div class="flexMode hr">
      <el-button @click='toSubmit'>{{$l('提交')}}</el-button>
    </div>
  </div>
</template>
<script setup>
defineOptions({
  name: 'TableColumnConfig',
});
// 传参
const prop = defineProps({
  columnOptions: {
    type: Array,
    default: () => [],
  },
});
import { reactive } from 'vue';
// 数据
const state = reactive({
  columns: []
});
console.info(prop.columnOptions);
state.columns = JSON.parse(JSON.stringify(prop.columnOptions));
// 计算属性

// 监听

// 挂载

// 事件
const emit = defineEmits();
const toSubmit = () => {
  console.info(state.columns);
  emit('configSubmit', state.columns);
};
// 卸载
</script>
<style lang="scss" scoped></style>
