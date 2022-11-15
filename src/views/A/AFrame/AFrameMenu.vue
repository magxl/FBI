<template>
  <div class="AFrameMenu">
    <el-scrollbar class="scrollbarArea">
      <el-menu
        :default-active="state.active"
        :default-openeds="state.openeds"
        :collapse="collapseMenu"
      >
        <template v-for="it in prop.menu">
          <el-sub-menu
            v-if="it.children && it.children.length"
            :key="it.name"
            :index="it.name"
          >
            <template #title>
              <em class="w24 noShrink">
                <i class="adicon" :class="it.meta.icon" />
              </em>
              <span class="txt-nowrap" :title="it.meta.langLabel">
                {{ it.meta.langLabel }}
              </span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="ct in it.children"
                :key="ct.name"
                :index="ct.name"
                @click="goto(ct.name)"
                :title="ct.meta.langLabel"
              >
                <span class="pl4 txt-nowrap">{{ ct.meta.langLabel }}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item
            v-else
            :key="it.name"
            :index="it.name"
            @click="goto(it.name)"
            :title="it.meta.langLabel"
            class="hover-txt-shadow-blue3"
          >
            <em class="w24 noShrink">
              <i class="adicon" :class="it.meta.icon" />
            </em>
            <span class="txt-nowrap">{{ it.meta.langLabel }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
    <div class="collaspeArea" @click="toCollaspeMenu">
      <div class="collaspe" :class="{ collapseMenu }"></div>
    </div>
  </div>
</template>
<script setup>
defineOptions({
  name: 'AFrameMenu',
});
const prop = defineProps({
  menu: {
    type: Array,
    default: () => [],
  },
});
const route = useRoute();
const router = useRouter();
const store = inject('store');
const launch = store.launch();
const state = reactive({
  active: '',
  openeds: '',
});

const miniMenu = localStorage.getItem('miniMenu');
if (miniMenu) {
  toCollaspeMenu(miniMenu);
}

// 计算
const currentPage = computed(() => {
  return launch.currentPage;
});
const collapseMenu = computed(() => {
  return launch.collapseMenu;
});
// 监听
watch(
  () => currentPage.value.key,
  (n) => {
    if (n) {
      let path = currentPage.value.path.replace(state.alias, '');
      let pathArr = path.split('/');
      // 去除参数，纯净路由name
      pathArr[pathArr.length - 1] = pathArr[pathArr.length - 1].split('?')[0];
      state.openeds = [pathArr[0]];
      state.active = currentPage.value.name;
    }
  },
  {
    immediate: true,
  },
);

// 事件
const goto = (name) => {
  if (name === route.name) {
    return;
  }
  router.push({ name });
};
const toCollaspeMenu = (miniMenu) => {
  if(miniMenu) {
    
  }
  const v = !collapseMenu.value;
  if (v) {
    miniMenu = false;
  } else {
    v = true;
  }

  launch.saveData('collapseMenu', v);
  localStorage.setItem('miniMenu', miniMenu);
};
</script>
<style lang="scss" scoped>
.AFrameMenu {
  position: relative;
  flex-shrink: 0;
  height: calc(100vh - 56px);
  width: 200px;
  padding: 10px 0;
  border-radius: 0 0 4px 0;
  overflow: hidden;
  background: $white9;
  user-select: none;
  transition: $trans3;
  .scrollbarArea {
    height: calc(100% - 56px);
  }
  .collaspeArea {
    position: absolute;
    top: 50%;
    right: -20px;
    height: 30px;
    width: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    transition: $trans3;
    background-color: $littleBlue;
    border-radius: 3px 0 0 3px;
    cursor: pointer;
    .collaspe {
      width: 6px;
      height: 6px;
      border-top: 1px solid $dark5;
      border-left: 1px solid $dark5;
      transform: translateX(2px) rotate(-45deg);
      transition: $trans3;
      &.collapseMenu {
        transform: translateX(-1px) rotate(135deg);
      }
    }
    &:hover {
      width: 24px;
      background-color: $blue;
      .collaspe {
        border-color: $white9;
      }
    }
  }
  &:hover {
    .collaspeArea {
      right: 0;
    }
  }
}
</style>
