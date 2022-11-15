<template>
  <div class="tabPagesArea">
    <el-scrollbar ref="scrollbar" class="tabScrollArea">
      <div class="tabArea flexMode vs">
        <div
          v-for="(it, i) in tabPages"
          :key="it.key"
          :id="it.key"
          class="tab flexMode vc noselect txt-nowrap noShrink"
          :class="currentPage.key === it.key && 'current'"
          @click.stop="toPage(it)"
        >
          <span class="pr2 fs12 lh12">{{ it.meta.langLabel }}</span>
          <Icon
            v-if="tabPages.length > 1"
            name="close"
            class="icon ml5 fs16 txt-shadow-white drop-shadow-red"
            @click.stop="toClose(i)"
          />
        </div>
        <div class="pl4" />
      </div>
    </el-scrollbar>
  </div>
</template>
<script setup>
defineOptions({
  name: 'TabPages',
});
// 数据
const state = reactive({
  scrollbar: {},
  mounted: false,
});
const store = inject('store');
const launch = store.launch();
const { proxy } = getCurrentInstance();

const login = computed(() => {
  return launch.login;
});
// 历史tab
const tabPages = computed(() => {
  return launch.tabPages;
});
const currentPage = computed(() => {
  return launch.currentPage;
});
const canScrollToTab = computed(() => {
  return state.mounted && currentPage.value.key ? currentPage.value.key : false;
});
// 监听
watch(
  canScrollToTab,
  (n) => {
    if (n) {
      // page变更时 进行tab定位
      nextTick(() => {
        scrollToTab(n);
      });
    }
  },
  {
    immediate: true,
  },
);
// 挂载
onMounted(() => {
  state.scrollbar = proxy.$refs.scrollbar;
  state.mounted = true;
});
// 事件
const router = useRouter();
const toPage = ({ name, key }) => {
  if (key !== currentPage.value.key) {
    router.push({ name });
  }
};
const toClose = (i) => {
  launch.closePage(i);
};
const scrollToTab = (v) => {
  // 定位到tab
  state.scrollbar.wrap$
    .querySelector(`#${v}`)
    .scrollIntoView({ behavior: 'smooth' });
};

// 卸载
</script>
<style lang="scss" scoped>
.tabScrollArea {
  height: 32px;
  width: 100%;
}
.tabArea {
  height: 32px;
  .tab {
    padding: 4px 12px;
    margin-left: 4px;
    border: 1px solid transparent;
    border-bottom: none;
    border-radius: 6px 6px 0 0;
    color: $dark9;
    transition: $trans3;
    .icon {
      opacity: .3;
      transition: $trans3;
      &:hover{
        opacity: .6;
      }
    }
    &.current {
      color: $white;
      border-color: $primary3 !important;
      background-color: $primary;
      .icon {
        opacity: 1;
      }
    }
    &:hover {
      border-color: $primary3;
      box-shadow: 0 -2px 4px $littleBlue;
    }
  }
}
</style>
