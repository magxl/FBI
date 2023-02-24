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
      <div class="PageAfter">
        <template v-for="(it, i) in orgOptions">
          <div
            v-if="!it.hide"
            :key="i"
            :id="`orgItem${it.id}`"
            class="orgItem flexMode vc p8-16 hover-bg-blue1"
            :class="prop.info.id === it.id && 'active'"
            @click="toActive(it, i)"
          >
            <i class="adicon" :class="it.icon"></i>
            <span class="pl8 fs12 txt-dark7">{{ it.name }}</span>
          </div>
        </template>
        <div v-if="!orgOptions.length" class="flexMode hc p20">
          <Nodata />
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script setup>
import { nextTick } from 'vue';
// 定义
defineOptions({
  name: 'CampaignGroupDetailLeftArea',
});
// 传参
const prop = defineProps({
  info: {
    type: Object,
    default: () => {},
  },
});
// 数据
const state = reactive({
  filter: {},
});
const { proxy } = getCurrentInstance();
const store = inject('store');
const launch = store.launch();
const common = store.common();

// 挂载
onMounted(async () => {
  await common.getCampaignGroup();
});
// 事件
const emit = defineEmits();
const initCampaignScrollIntoView = () => {
  // 滚动到目标org
  const id = prop.info.id;
  const dom = `#orgItem${id}`;
  proxy.$el.querySelector(dom).scrollIntoView({ behavior: 'smooth' });
};
const toActive = (it, i) => {
  // state.active = it.id;
  emit('change', { id: it.id });
};
const toShowMenu = (el, it) => {
  el.preventDefault();
  if (it.id === prop.info.id) {
    return;
  }
  launch.saveContextMenu({
    el,
    visible: true,
    list: [
      {
        label: $l('Open'),
        cb: () => {
          toActive(it);
        },
      },
      {
        label: $l('Open in New Tab'),
        cb: () => {
          emit('change', { id: it.id, mode: 'newTab' });
        },
      },
    ],
  });
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
const canInit = computed(() => {
  return orgOptions.value.length && prop.info.id;
});

// 监听
watch(
  () => canInit.value,
  (n) => {
    if (n) {
      nextTick(() => {
        initCampaignScrollIntoView();
      });
    }
  },
);
// 卸载
</script>
<style lang="scss" scoped>
.orgItem {
  cursor: point;
  &.active,
  &:focus {
    background-color: $primary1;
    .txt-dark7 {
      color: $primary;
    }
  }
}
</style>
