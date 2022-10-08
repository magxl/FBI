<template>
  <div class="Navbar">
    <div class="flexMode vc">
      <template v-for="it in state.menu">
        <div v-if="it.meta.position === 'navbar'" :key="it.name" class="p0-10">
          <div v-if="it.children && it.children.length" class="lh12">
            <el-dropdown placement="bottom-end" @command="dropdownCommand">
              <span
                class="fs12 point"
                :class="
                  path.includes(it.path)
                    ? 'txt-blue'
                    : 'txt-dark5 hover-txt-blue'
                "
              >
                {{ it.langLabel }}
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <template v-for="(ct, i) in it.children">
                    <el-dropdown-item
                      v-if="ct.meta.position === 'navbar'"
                      :key="i"
                      :command="ct.name"
                      class="fs12"
                      :class="
                        path === ct.path
                          ? 'txt-blue'
                          : 'txt-dark5 hover-txt-blue'
                      "
                    >
                      {{ ct.langLabel }}
                    </el-dropdown-item>
                  </template>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <router-link
            v-else-if="it.meta.position === 'navbar'"
            :to="it.path"
            :class="path === it.path ? 'txt-blue' : 'txt-dark5 hover-txt-blue'"
          >
            {{ it.langLabel }}
          </router-link>
        </div>
      </template>
    </div>
    <!-- ↑ MENU ↑ -->
    <!-- ↓ DROPDOWN ↓ -->
    <div>
      <el-dropdown placement="bottom-end" @command="changeLang">
        <span class="fs12 point txt-dark5 hover-txt-blue">
          {{ $t('navbar.语言') }} {{ lang }}
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="(it, i) in langOptions"
              :key="i"
              :command="it"
              class="fs12"
              :class="lang === it && 'txt-blue'"
            >
              {{ it }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'Navbar',
});
import {
  reactive,
  computed,
  inject,
  getCurrentInstance,
  watch,
  onMounted,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
const state = reactive({
  navbar: [],
  mounted: false,
});
const store = inject('store');
const launch = store.launch();

const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance();

onMounted(() => {
  state.mounted = true;
});
// 计算属性
const path = computed(() => {
  return route.path;
});
const langOptions = computed(() => {
  return window.$langs;
});
const lang = computed(() => {
  return launch.lang;
});
const langWatch = computed(() => {
  return launch.lang && state.mounted ? launch.lang : false;
});
// 监听
// 监听语言变化
watch(
  langWatch,
  (n) => {
    if (n) {
      proxy.$i18n.locale = n;
      state.menu = initMenu(window.routes);
    }
  },
  { immediate: true },
);

// 路由跳转
const dropdownCommand = (name) => {
  router.push({ name });
};
// 切换语言
const changeLang = (v) => {
  launch.saveLang(v);
};
// 初始化路由
const initMenu = (v) => {
  return v.map((it) => {
    it.langLabel = proxy.$t(`navbar.${it.meta.label}`);
    if (it.children) {
      it.children = initMenu(it.children);
    }
    return it;
  });
};
</script>

<style lang="scss" scoped>
.Navbar {
  // position: sticky;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 10px;
  font-size: 12px;
  z-index: 9;
  // background-image: radial-gradient(rgba(0, 0, 0, 0) 1px, #fff 1px);
  // background-size: 4px 4px;
  background-color: $white7;
  @include backdrop();
}
</style>
