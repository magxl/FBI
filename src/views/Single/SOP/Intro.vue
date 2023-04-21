<template>
  <div id="Intro" data-id="Intro" class="SOPIntro step">
    <div class="flexMode hc flexV vc p40">
      <b class="fs48 txt-dark7 colorfulFont blue">{{ $l('INTRO') }}</b>
      <span class="pt16 txt-dark3">{{ $l('What We Can Do') }}</span>
    </div>
    <div class="introArea flexMode hb vs p16-0">
      <div
        v-for="(it, i) in state.list"
        :key="i"
        class="wp24 h300 opacity0"
        :class="`card${i}`"
      >
        <Card :title="it.name" class="hp100 hover-box-shadow-dark1" noshadow>
          <div class="p16">
            <div>{{ it.content }}</div>
            <div v-html="it.contents" class="pt16 fs14 txt-dark5"></div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>
<script setup>
// 定义
defineOptions({
  name: 'SOPIntro',
});
// 传参
const prop = defineProps({
  type: {
    type: Number,
    default: 1,
  },
});
// 数据
const state = reactive({
  loading: true,
  list: [{}, {}, {}, {}],
});

// 挂载
onMounted(() => {
  getData();
});
// 事件
const emit = defineEmits();
const getData = async () => {
  state.loading = true;
  const { code, data } = await window.$get({
    url: window.$api.single.intro,
    data: {
      type: prop.type,
    },
  });
  state.list = data || [];
  // state.active = data[0];
  state.loading = false;
  emit('loaded');
};
// 计算属性
const list = computed(() => {
  return listMap[`list_${window.$getLang()}`];
});
// 监听

// 卸载

// Map
const list_en_us = [
  {
    name: 'Data Driven',
    title: 'Intelligent Platform Based on Massive Data',
    description:
      'Integrate massive insights from marketing analytics to create a data-driven intelligent platform',
  },
  {
    name: 'Intelligent Management',
    title: 'Bulk and Automation Project Management',
    description:
      'Provide advanced automation functions to realize bulk editing, intelligent keywords expansion, intelligent bid adjustment, warning monitoring and more features',
  },
  {
    name: 'Industry Insights',
    title: 'Insights into Industry Trending Based on Large Sample Data',
    description:
      'Share the industry benchmark, measure the current effect, and indicate the direction of optimization',
  },
  {
    name: 'Professional Team',
    title: 'Experienced Professional Team Provides Services',
    description:
      'First time response, provide professional customized solutions',
  },
];
const list_zh_cn = [
  {
    name: '数据驱动',
    title: '基于数据洞察的智能平台',
    description: '整合了移动营销海量数据洞察，打造智能投放平台',
  },
  {
    name: '智能管理',
    title: '批量与自动化的项目管理',
    description:
      '提供高级的自动化功能，实现批量编辑、智能拓词、智能调价、预警监测等功能',
  },
  {
    name: '行业洞察',
    title: '大样本数据洞察行业趋势',
    description: '分享行业 Benchmark ，衡量现状，揭示机会与空间',
  },
  {
    name: '强大的团队',
    title: '资深的专业团队为项目保驾护航',
    description: '行业资深服务团队，第一时间的响应，提供专业的定制化解决方案',
  },
];

const listMap = {
  list_en_us,
  list_zh_cn,
};
</script>
<style lang="scss" scoped>
.SOPIntro {
  .introArea {
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>
