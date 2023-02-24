<template>
  <Page class="CampaignGroupDetail" noscroll>
    <template #header>
      <!-- <Org v-model="state.search.orgId" /> -->
      <span>{{ state.orgInfo.name }}</span>
      <div v-if="state.orgInfo.id" class="flexMode vc">
        <div
          v-for="it in state.tabs"
          :key="it.value"
          @click="toChangeActiveTab(it)"
        >
          <span
            class="fs12 p0-8 drop-shadow-primary3"
            :class="state.activeTab === it.value && 'txt-primary'"
            >{{ it.label }}</span
          >
        </div>
      </div>
    </template>
    <div class="flexMode" :style="mainStyle">
      <LeftArea @change="toChangeOrg" :info="state.orgInfo" />
      <div
        v-loading="state.loading"
        class="CampaignGroupDetailRightArea relative hp100"
      >
        <RightArea
          v-if="state.orgInfo.id"
          ref="rightArea"
          :key="state.orgInfo.id"
          :info="state.orgInfo"
          :active-tab="state.activeTab"
          :tabs="state.tabs"
          @change-tab="toChangeTab"
        />
        <div v-else class="absFull emptyBg">
          <Nodata class="absCenter" />
        </div>
      </div>
    </div>
  </Page>
</template>
<script setup>
import { nextTick } from 'vue';
import LeftArea from './CampaignGroupDetail/LeftArea.vue';
import RightArea from './CampaignGroupDetail/RightArea.vue';
// 定义
defineOptions({
  name: 'CampaignGroupDetail',
  components: { LeftArea, RightArea },
});
// 传参
const prop = defineProps({
  orgId: {
    type: Number,
    default: 0,
  },
});
// 数据
const state = reactive({
  loading: false,
  orgName: 0,
  search: {},
  active: null,
  orgInfo: {},
  activeTab: 'Statistics',
  tabs: [
    {
      label: 'Statistics',
      value: 'Statistics',
    },
    {
      label: 'Campaign',
      value: 'Campaign',
    },
    {
      label: 'AdGroup',
      value: 'AdGroup',
    },
    {
      label: 'Keyword',
      value: 'Keyword',
    },
    {
      label: 'Search Term',
      value: 'SearchTerm',
    },
    {
      label: 'Ads',
      value: 'Ads',
    },
    {
      label: 'SOV',
      value: 'Sov',
    },
  ],
});
const { proxy } = getCurrentInstance();
const store = inject('store');
const launch = store.launch();
const route = useRoute();
const router = useRouter();
// 挂载

// 事件
const toChangeOrg = ({ id, mode }) => {
  if (mode) {
    // 新Tab
    router.replace({
      name: 'A_CampaignGroupDetail',
      params: {
        orgId: id,
      },
    });
  } else {
    // 跳转新页面并删除旧页面
    try {
      launch.tabPages.forEach((ft, i) => {
        if (ft.key === launch.currentPage.key) {
          launch.tabPages.splice(i, 1);
          nextTick(() => {
            router.push({
              name: 'A_CampaignGroupDetail',
              params: {
                orgId: id,
              },
            });
            // getData({ id });
          });
          throw new Error();
        }
      });
    } catch (error) {}
  }
};
const getData = (it) => {
  state.loading = true;
  state.orgInfo.id = it.id;
  setTimeout(() => {
    state.loading = false;
    state.orgInfo = it;
  }, window.$rn(3000, 200));
};
const toChangeActiveTab = async (it) => {
  state.activeTab = it.value;
  proxy.$refs.rightArea.scrollIntoView(it);
};
const toChangeTab = (v) => {
  state.activeTab = v;
};
// 计算属性
const mainStyle = computed(() => {
  return {
    height: `calc(100vh - ${
      window.global.config.frame.header +
      window.global.config.page.paddingTop +
      window.global.config.page.paddingBottom +
      window.global.config.page.header +
      36
    }px)`,
  };
});
// 监听
watch(
  () => prop.orgId,
  (n) => {
    if (n) {
      const orgId = Number(n);
      state.search.orgId = orgId;
      getData({ id: orgId, name: 'Org From Params ' + orgId });
    }
  },
  {
    immediate: true,
  },
);
// 卸载
</script>
<style lang="scss" scoped>
.CampaignGroupDetailRightArea {
  width: calc(100% - 200px);
}
</style>
