<template>
  <div id="Optimizing" data-id="Optimizing" class="SOPOptimizing step">
    <div class="flexMode hc flexV vc p40">
      <b class="fs48 txt-dark7 colorfulFont purple">{{ $l('OPTIMIZING') }}</b>
      <span class="pt16 txt-dark3"
        >{{ state.list.length }} {{ $l('Apps are Being Optimized') }}</span
      >
    </div>
    <div class="optimizedArea flexMode flexWrap">
      <div
        v-for="it in state.list"
        :key="it.id"
        :id="`app${it.id}`"
        class="optimizedItem p4 opacity0"
      >
        <Hover>
          <div class="item h100 radius radius8 bg-gray1" :title="it.name">
            <el-image :src="it.image" fit="contain" class="wp100 h100" />
          </div>
        </Hover>
      </div>
      <div id="optimizedEmpty" class="optimizedItem flexGrow p4 opacity0">
        <div
          class="flexMode hc vc h100 radius8 bg-gray1 txt-dark3 hover-txt-primary"
        >
          {{ $l('Optimize Your App') }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// 定义
defineOptions({
  name: 'SOPOptimizing',
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
  list: [],
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
    url: window.$api.single.optimizing,
    data: {
      type: prop.type,
    },
  });
  state.list = data
    ? data.map((it) => {
        it.image = 'https://www.ann9.com/uploads' + it.cover;
        it.bg = `bg-${window.$rc({ alpha: 3 })}`;
        return it;
      })
    : [];
  // state.active = data[0];
  state.loading = false;
  emit('loaded');
};
// 计算属性

// 监听

// 卸载

// Map
</script>
<style lang="scss" scoped>
.SOPOptimizing {
  position: relative;
  background-color: $white;
}
.optimizedArea {
  width: 1200px;
  margin: 0 auto;
  .item {
    width: 101px;
  }
}
</style>
