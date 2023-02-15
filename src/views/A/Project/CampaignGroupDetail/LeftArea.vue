<template>
  <div class="CampaignGroupDetailLeftArea w200 hp100 border-r">
    <div class="flexMode vc h36 p0-8 border-b">
      <el-input
        v-model="state.filter.name"
        clearable
        :placeholder="$l('Name')"
        @input="toFilter"
      >
        <template #prefix>
          <i class="adicon ad-filter1"></i>
        </template>
      </el-input>
    </div>
    <el-scrollbar>
      <template v-for="(it, i) in orgOptions">
        <div
          v-if="!it.hide"
          :key="i"
          class="orgItem flexMode vc p8-16"
          :class="state.active === it.id && 'active'"
          @click="toActive(it, i)"
        >
          <i class="adicon" :class="it.icon"></i>
          <span class="pl8 fs14 txt-dark7">{{ it.name }}</span>
        </div>
      </template>
    </el-scrollbar>
  </div>
</template>
<script setup>
// 定义
defineOptions({
  name: 'CampaignGroupDetailLeftArea',
});
// 数据
const state = reactive({
  filter: {},
});
const store = inject('store');
const common = store.common();

// 挂载
onMounted(() => {
  common.getCampaignGroup();
});
// 事件
const toActive = (it, i) => {
  state.active = it.id;
};
// 计算属性

const orgOptions = computed(() => {
  return common.campaignGroup.map((it) => {
    if (state.filter.name && it.name.indexOf(state.filter.name) === -1) {
      it.hide = true;
    } else {
      it.hide = false;
    }
    return it;
  });
});
// 监听

// 卸载
</script>
<style lang="scss" scoped>
.orgItem {
  &.active {
    background-color: $primary1;
    .txt-dark7 {
      color: $primary;
    }
  }
}
</style>
