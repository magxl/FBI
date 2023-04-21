<template>
  <div class="AFrameHeaderTabPages">
    <el-scrollbar ref="scrollbar" class="tabScrollArea">
      <div class="tabArea flexMode vs">
        <div
          v-for="(it, i) in tabPages"
          :key="it.key"
          :id="it.key"
          class="tab flexMode vc noselect txt-nowrap noShrink"
          :class="[currentPage.key === it.key && 'current', tabPages.length === 1 && 'onlyOne']"
          @click.stop="toPage(it)"
          @contextmenu="(e) => showRightMenu(e, i)"
        >
          <div class="tabTxt flexMode vc fs12 lh12 pr2">
            <span>{{ it.meta[`label_${lang}`] }}</span>
          </div>
          <Icon
            name="close"
            class="icon ml5 fs16"
            :class="
              currentPage.key === it.key
                ? 'txt-shadow-white drop-shadow-red'
                : 'txt-shadow-white drop-shadow-white'
            "
            @click.stop="toClose(i)"
          />
        </div>
        <div class="pl4"></div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script setup>
defineOptions({
  name: 'AFrameHeaderTabPages',
});
// 数据
const state = reactive({
  scrollbar: {},
  mounted: false,
});
const store = inject('store');
const launch = store.launch();
const { proxy } = getCurrentInstance();

// 挂载
onMounted(() => {
  state.scrollbar = proxy.$refs.scrollbar;
  state.mounted = true;
});
// 事件
const router = useRouter();
const toPage = ({ name, key, params, query }) => {
  if (key !== currentPage.value.key) {
    router.push({ name, params, query });
  }
};
const toClose = (i) => {
  launch.closePage(i);
};
const scrollToTab = (v) => {
  // 定位到tab
  if (state.scrollbar.wrapRef) {
    const scrollAim = state.scrollbar.wrapRef.querySelector(`#${v}`);
    state.scrollbar.setScrollLeft(scrollAim.offsetLeft);
  }
};
const showRightMenu = (el, i) => {
  el.preventDefault();
  if (tabPages.value.length < 2) {
    return;
  }
  launch.saveContextMenu({
    el,
    visible: true,
    list: [
      {
        label: $l('Refresh'),
        value: 'refresh',
        icon: 'refresh',
        cb: () => {
          // console.info(currentPage.value);
          // router.replace(currentPage.value);
          launch.refreshPage()
        },
      },
      {
        label: $l('Close'),
        value: 'close',
        icon: 'close',
        cb: () => {
          launch.closePage(i, 'close');
        },
      },
      {
        label: $l('Close Other'),
        value: 'closeOther',
        cb: () => {
          launch.closePage(i, 'closeOther');
        },
      },
      {
        label: $l('Close Right'),
        value: 'closeRight',
        cb: () => {
          launch.closePage(i, 'closeRight');
        },
      },
      {
        label: $l('Close Left'),
        value: 'closeLeft',
        cb: () => {
          launch.closePage(i, 'closeLeft');
        },
      },
    ],
  });
};

// 计算属性

const login = computed(() => {
  return launch.login;
});
const lang = computed(() => {
  return launch.lang;
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

// 卸载
</script>
<style lang="scss" scoped>
.tabScrollArea {
  height: 32px;
  width: 100%;
}
.tabArea {
  height: 32px;
  padding-left: 10px;
  .tab {
    position: relative;
    padding: 4px 12px;
    margin-left: 4px;
    border-radius: 6px 6px 0 0;
    color: $white9;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 12px;
      bottom: 0;
      width: 36px;
      z-index: 1;
      background-image: linear-gradient(to right, $primary1, $primary);
    }
    .tabTxt {
      max-width: 160px;
    }
    // transition: $trans3;
    .icon {
      opacity: 0.3;
      transition: $trans1;
      z-index: 2;
      &:hover {
        opacity: 0.6;
      }
    }
    &.current {
      color: $dark9;
      background-color: $white !important;
      &::after {
        background-image: linear-gradient(to right, $white1, $white) !important;
      }
      .icon {
        opacity: 1;
      }
    }
    &:hover:not(.current) {
      // color: $white;
      // background-color: #b3b6f8;
      background-image: linear-gradient(to right, $white5, $primary3);
      transition: $trans3;
      &::after {
        background-image: none;
      }
      // box-shadow: 0 -2px 4px $littleBlue;
    }
    &.onlyOne {
      &::after {
        display: none;
      }
      .icon {
        display: none;
      }
    }
  }
}
</style>
