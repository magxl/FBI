<template>
  <div class='MonitorsLogs'>
    MonitorsLogs
  </div>
</template>
<script setup>
  defineOptions({
    name: 'MonitorsLogs'
  });
  // 传参
  const prop = defineProps({
    row:{
      type: Object,
      default: ()=>{},
    },
  });
  import {reactive} from 'vue';
  // 数据
  const state = reactive({});
  
  // 计算属性
  
  // 监听
  
  // 挂载
  
  // 事件
  
  // 卸载
</script>
<style lang='scss' scoped>
  
</style>