<template>
  <div class='UpdateCptBid'>
    <component :is="cpt" v-bind="$attrs" :params="prop.params" />
  </div>
</template>
<script setup>
import SetNewBid from './UpdateCptBid/SetNewBid.vue';
  // 定义
  defineOptions({
    name: 'UpdateCptBid',
    components: { SetNewBid },
  });
  // 传参
  const prop = defineProps({
    params:{
      type: Object,
      default: ()=>{},
    },
  });
  // 数据
  const state = reactive({});
  
  // 挂载
  
  // 事件
  
  // 计算属性
  const cpt = computed(() => {
    return prop.params.type?prop.params.type:'SetNewBid';
   });
  // 监听
  
  // 卸载
</script>
<style lang='scss' scoped>
  
</style>