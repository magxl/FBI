<template>
  <div class='MvcTable'>
    <component :is="cpt" v-bind="$attrs" />
  </div>
</template>
<script setup>
  defineOptions({
    name: 'MvcTable'
  });
  // 传参
  const prop = defineProps({
    type:{
      type: String,
      default: '',
      validate:(v)=>{
        return ['','long'].indexOf(v)>-1
      }
    },
  });
  import {reactive} from 'vue';
  // 数据
  const state = reactive({});
  
  // 计算属性
  const cpuTest = computed(() => {
    return 
   });
  // 监听
  
  // 挂载
  
  // 事件
  
  // 卸载
</script>
<style lang='scss' scoped>
  
</style>