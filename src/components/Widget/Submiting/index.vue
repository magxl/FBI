<template>
  <div class="WidgetSubmiting">
    <component :is="cpt" />
    <span class="fs12 txt-dark3">{{ txt }}</span>
  </div>
</template>
<script setup>
import Lost from './chip/Lost.vue';
import Beone from './chip/BeOne.vue';
// 定义
defineOptions({
  name: 'WidgetSubmiting',
  components: { Lost, Beone },
});
// 传参
const prop = defineProps({
  txt: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'submit',
  },
  ani: {
    type: String,
    default: 'lost',
  },
});
// 数据
const state = reactive({});

// 计算属性
const hasCpt = computed(() => {
  return typeMap[prop.type];
});
const cpt = computed(() => {
  const cpt = window.$toUpperCamel(prop.ani);
  if (['Lost', 'Beone'].indexOf(cpt) > -1) {
    return cpt;
  } else {
    return 'Lost';
  }
});
const txt = computed(() => {
  return prop.txt ? prop.txt : hasCpt.value ? hasCpt.value : '- -';
});
// 监听

// 挂载

// 事件

// 卸载

// Maps
const typeMap = {
  submit: '... SUBMITING ...',
  loading: '... LOADING ...',
};
</script>
<style lang="scss" scoped>
.WidgetSubmiting {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9;
  background-color: $white7;
  @include backdrop();
}
</style>
