<template>
  <Page title="Role" class="Role" noscroll>
    <div class="flexMode vs">
      <div class="w300 border-r fs14">
        <div class="flexMode vc h36 p4-8 border-b">
          <div class="pr8">
            <el-button plain circle type="primary" @click="toCreate">
              <template #icon>
                <i class="adicon ad-plus1"></i>
              </template>
            </el-button>
          </div>
          <el-input
            v-model="state.filter.name"
            clearable
            placeholder=" "
            @input="toFilter"
          />
        </div>
        <div
          v-for="(it, i) in list"
          :key="i"
          class="vc hb border-b p8-16"
          :class="it.hide ? 'hide' : 'flexMode'"
        >
          <span>{{ it.name }}</span>
          <span class="p2-8 fs12 txt-dark5 bg-f9 radius2">{{ it.users }}</span>
        </div>
      </div>
      <!-- left -->
      <!-- right -->
      <div class="rightArea" :style="bodyStyle">
        <el-scrollbar>
          <div class="p8">
            <Card class="mb8">
              <template #header>
                <span>Router</span>
                <i
                  class="adicon ad-arrow-down hover-a"
                  :class="!state.toggle.router && 'rotateZ-90'"
                  @click="toToggleCard('router')"
                ></i>
              </template>
              <div
                class="p8-16"
                :class="!state.toggle.router && 'h160 yscroll'"
              >
                <el-tree
                  ref="router"
                  :data="state.data.routes"
                  default-expand-all
                  node-key="name"
                  show-checkbox
                ></el-tree>
              </div>
              <template #footer>
                <el-button plain @click="toReset('router')">{{
                  $l('Reset')
                }}</el-button>
                <el-button plain type="primary" @click="toSubmitRouter()">{{
                  $l('Submit')
                }}</el-button>
              </template>
            </Card>
            <Card class="mb8">
              <template #header>
                <span>Permission</span>
                <i
                  class="adicon ad-arrow-down hover-a"
                  :class="!state.toggle.permission && 'rotateZ-90'"
                  @click="toToggleCard('permission')"
                ></i>
              </template>
              <div
                class="p8-16"
                :class="!state.toggle.permission && 'h160 yscroll'"
              >
                <el-tree
                  ref="permission"
                  :data="state.data.permission"
                  default-expand-all
                  node-key="name"
                  show-checkbox
                  :props="state.props.permission"
                >
                </el-tree>
              </div>
              <template #footer>
                <el-button plain @click="toReset('permission')">{{
                  $l('Reset')
                }}</el-button>
                <el-button
                  plain
                  type="primary"
                  @click="toSubmitPermission()"
                  >{{ $l('Submit') }}</el-button
                >
              </template>
            </Card>
            <Card class="mb8">
              <template #header>
                <span>User</span>
                <i
                  class="adicon ad-arrow-down hover-a"
                  :class="!state.toggle.user && 'rotateZ-90'"
                  @click="toToggleCard('user')"
                ></i>
              </template>
              <div class="p8-16" :class="!state.toggle.user && 'h160 yscroll'">
                <el-tree
                  ref="permission"
                  :data="state.data.user"
                  default-expand-all
                  node-key="name"
                  show-checkbox
                ></el-tree>
              </div>
              <template #footer>
                <el-button plain @click="toReset('user')">{{
                  $l('Reset')
                }}</el-button>
                <el-button plain type="primary" @click="toSubmitUser()">{{
                  $l('Submit')
                }}</el-button>
              </template>
            </Card>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </Page>
</template>
<script setup>
// 定义
defineOptions({
  name: 'Role',
});
// 数据
const state = reactive({
  list: [],
  data: {},
  filter: {},
  router: [],
  user: [],
  permission: [],
  routes: [],
  props: {
    router: {},
    permission: {},
  },
  toggle: {},
});
const { proxy } = getCurrentInstance();
const store = inject('store');
const launch = store.launch();
const common = store.common();
// 挂载
onMounted(() => {
  init();
  initRoute();
  initPermission();
  initUser();
});
// 事件
const init = async () => {
  const list = await common.getRoleMap();
  state.list = JSON.parse(JSON.stringify(list));
};
const toCreate = () => {};

const dgRouter = (v) => {
  const aim = [];
  v.forEach((it) => {
    if (!it.meta.hide) {
      it.label = it.meta.label;
      aim.push(it);
    }
    if (it.children) {
      it.children = dgRouter(it.children);
    }
  });
  return aim;
};
const initRoute = () => {
  const module = [];
  window.routes.forEach((it) => {
    if (it.meta.label.indexOf('404') === -1 && !it.meta.hide) {
      module.push(it);
    }
  });
  const routes = dgRouter(module);
  state.data.routes = routes;
};
const initPermission = () => {
  const routes = JSON.parse(JSON.stringify(state.data.routes));
  state.data.permission = routes.map((it) => {
    if (it.children) {
      it.children.map((ct) => {
        if (ct.children) {
          ct.children.map((cct) => {
            cct.children = window.$fd(window.$rn(100), (i) => {
              const id = i + 1;
              return {
                id,
                name: id,
                label: 'Permission ' + id,
                description: 'Description ' + id,
              };
            });
          });
        }
      });
    }
    return it;
  });
};
const initUser = () => {
  state.data.user = window.$fd(window.$rn(100), (i) => {
    const id = i + 1;
    return {
      id,
      name: 'Name ' + id,
      label: 'Name ' + id,
    };
  });
};
const toFilter = () => {
  const name = state.filter.name || '';
  state.list = state.list.map((it) => {
    if (it.name.indexOf(name) > -1) {
      it.hide = false;
    } else {
      it.hide = true;
    }
    return it;
  });
};
const toToggleCard = (v) => {
  state.toggle[v] = !state.toggle[v];
};
const toCheck = (v, type) => {
  const keys = proxy.$refs[type].getCheckedKeys(true);
  state[type] = keys;
};
const toReset = (v) => {
  state[v] = [];
};
const toSubmitRouter = () => {};
const toSubmitPermission = () => {};
const toSubmitUser = () => {};
// 计算属性
const lang = computed(() => {
  return launch.lang;
});
const pageHeight = computed(() => {
  return launch.options.pageHeight;
});
const bodyStyle = computed(() => {
  return {
    height: pageHeight.value + 'px',
  };
});
// 监听

// 卸载
</script>
<style lang="scss" scoped>
.rightArea {
  width: calc(100% - 300px);
}
</style>
