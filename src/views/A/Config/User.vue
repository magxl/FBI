<template>
  <Page title="User" class="User">
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
        <el-scrollbar :style="scrollbarStyle">
          <div
            v-for="(it, i) in state.list"
            :key="i"
            class="vc hb border-b p8-16"
            :class="[
              it.hide ? 'hide' : 'flexMode',
              state.info.id === it.id && 'bg-primary1',
            ]"
            @click="toSelect(it)"
          >
            <span>{{ it.name }}</span>
            <div class="flexMode vc p2-4 fs12 radius2 bg-f9">
              <span class="pr2 txt-dark3">org x</span>
              <span class="txt-dark7">
                {{ it.orgs.length }}
              </span>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <!-- left -->
      <!-- right -->
      <div class="rightArea" :style="bodyStyle">
        <el-scrollbar>
          <div class="p8">
            <Card class="mb8">
              <template #header>
                <span>Info</span>
              </template>
              <div class="p8-16">
                <el-descriptions v-if="state.info.id" border :column="3">
                  <el-descriptions-item :label="$l('Account')" :width="90">
                    {{ state.info.account }}
                  </el-descriptions-item>
                  <el-descriptions-item :label="$l('Name')">
                    {{ state.info.name }}
                  </el-descriptions-item>
                  <el-descriptions-item :label="$l('Mobile')" :width="90">
                    {{ state.info.mobile }}
                  </el-descriptions-item>
                  <el-descriptions-item :label="$l('Email')">
                    {{ state.info.email }}
                  </el-descriptions-item>
                  <el-descriptions-item
                    :label="$l('Reset Password')"
                    :width="120"
                    :span="2"
                  >
                    <el-radio-group v-model="state.resetPassword">
                      <el-radio
                        v-for="(it, i) in resetOptions"
                        :key="i"
                        :label="it.value"
                      >
                        <span>{{ it.label }}</span>
                      </el-radio>
                    </el-radio-group>
                    <span class="pl16 txt-dark5">Default:</span>
                    <span class="pl4 txt-dark7">yingyongleida</span>
                  </el-descriptions-item>
                  <el-descriptions-item :label="$l('Role')" :span="3">
                    <el-radio-group v-model="state.info.role">
                      <el-radio
                        v-for="(it, i) in roleMap"
                        :key="i"
                        :label="it.id"
                        class="w160"
                      >
                        <span>{{ it.name }}</span>
                      </el-radio>
                    </el-radio-group>
                  </el-descriptions-item>
                </el-descriptions>
                <div v-else class="minh200 flexMode hc vc">
                  <Nodata />
                </div>
              </div>
              <template #footer>
                <el-button plain @click="toReset('router')">
                  {{ $l('Reset') }}
                </el-button>
                <el-button
                  plain
                  type="primary"
                  @click="toSubmitRouter()"
                  >{{ $l('Submit') }}</el-button
                >
              </template>
            </Card>
            <Card class="mb8">
              <template #header>
                <div class="flexMode vc">
                  <span class="pr16 noShrink">{{ $l('Campaign Group') }}</span>
                  <div class="w240">
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
                </div>

                <el-button plain type="primary" @click="toSubmitOrg">
                  {{ $l('Submit') }}
                </el-button>
              </template>
              <div class="p8-16">
                <div v-if="state.info.orgs" class="flexMode" :style="orgStyle">
                  <div class="noaccessArea wp50 hp100 pr4 yscroll radius">
                    <div
                      v-for="(it, i) in state.orgs.noaccess"
                      :key="i"
                      class="orgItem relative p8-16 mb8 border-dark1-dashed radius4 hover-box-shadow-dark1"
                      :class="it.hide && 'hide'"
                    >
                      <div class="rightTop abs r t">
                        <span v-if="it.permission.read && it.permission.write" class="rtBtn none point" @click="toCheckOrgNonePermission(i,'noaccess')">
                          {{ checkNoneTxt }}
                        </span>
                        <span v-else class="rtBtn all point" @click="toCheckOrgAllPermission(i,'noaccess')">
                          {{ checkAllTxt }}
                        </span>
                      </div>
                      <div class="fs12 pb8">{{ it.id }} - {{ it.name }}</div>
                      <div class="flexMode vc">
                        <el-checkbox
                          v-model="it.permission.read"
                          :label="readTxt"
                          :true-label="1"
                          :false-label="0"
                        />
                        <el-checkbox
                          v-model="it.permission.write"
                          :label="writeTxt"
                          :true-label="1"
                          :false-label="0"
                        />
                      </div>
                    </div>
                  </div>
                  <!-- noaccess -->
                  <!-- permission -->
                  <div class="permissionArea wp50 hp100 pl4 yscroll radius">
                    <div
                      v-for="(it, i) in state.orgs.permission"
                      :key="i"
                      class="orgItem relative p8-16 mb8 border-dark1-dashed radius4 hover-box-shadow-dark1"
                      :class="it.hide && 'hide'"
                    >
                      <div class="rightTop abs r t">
                        <span v-if="it.permission.read && it.permission.write" class="rtBtn none point" @click="toCheckOrgNonePermission(i,'permission')">
                          {{ checkNoneTxt }}
                        </span>
                        <span v-else class="rtBtn all point" @click="toCheckOrgAllPermission(i, 'permission')">
                          {{ checkAllTxt }}
                        </span>
                      </div>
                      <div class="fs12 pb8">{{ it.id }} - {{ it.name }}</div>
                      <div class="flexMode vc">
                        <el-checkbox
                          v-model="it.permission.read"
                          :label="readTxt"
                          :true-label="1"
                          :false-label="0"
                        />
                        <el-checkbox
                          v-model="it.permission.write"
                          :label="writeTxt"
                          :true-label="1"
                          :false-label="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <Nodata />
                </div>
              </div>
              <template #footer>
                <el-popconfirm
                  placement="top"
                  title="Clear Org Selection?"
                  confirm-button-text="Clear"
                  confirm-button-type="danger"
                  @confirm="toClearOrg"
                >
                  <template #reference>
                    <el-button plain @click="toReset">
                      {{ $l('Reset') }}
                    </el-button>
                  </template>
                </el-popconfirm>
                <el-button plain type="primary" @click="toSubmitOrg">
                  {{ $l('Submit') }}
                </el-button>
              </template>
            </Card>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <Drawer v-model:current="state.currentDrawer" :drawer="state.drawer" />
  </Page>
</template>
<script setup>
import Create from './User/Create.vue';
// 定义
defineOptions({
  name: 'User',
});
// 数据
const state = reactive({
  filter: {},
  list: [],
  info: {},
  toggle: {},
  resetPassword: 0,
  orgs: {
    noaccess: [],
    permission: [],
  },
  drawer: [
    {
      title: 'Create User',
      size: 600,
      cpt: markRaw(Create),
    },
  ],
  currentDrawer: '',
});
const store = inject('store');
const launch = store.launch();
const common = store.common();
// 挂载
onMounted(() => {
  init();
  getData();
});
// 事件
const init = async () => {
  common.getRoleMap();
};
const getData = async () => {
  state.list = window.$fd(window.$rn(100), (i) => {
    const id = i + 1;
    return {
      id,
      name: 'Name ' + id,
      account: 'Account ' + id,
      mobile: 15718845548 + id,
      email: id + 'email@email.com',
      role: 'Role ' + window.$rn(20),
      orgs: window.$fd(window.$rn(2000), (o) => {
        const oid = o + 1;
        return {
          id: oid,
          name: 'Org ' + oid,
          permission: {
            read: window.$rn(2),
            write: window.$rn(2),
          },
        };
      }),
    };
  });
};
const toCreate = () => {
  state.currentDrawer = 0;
};
const toSelect = (it, i) => {
  state.info = it;
  initOrgs();
};
const toToggleCard = (type) => {
  state.toggle[type] = !state.toggle[type];
};
const toFilter = () => {
  const { name } = state.filter;
  const { noaccess, permission } = state.orgs;
  if (name) {
    noaccess.forEach((it) => {
      if (it.name.indexOf(name) > -1) {
        it.hide = false;
      } else {
        it.hide = true;
      }
    });
    permission.forEach((it) => {
      if (it.name.indexOf(name) > -1) {
        it.hide = false;
      } else {
        it.hide = true;
      }
    });
  } else {
    noaccess.forEach((it) => {
      it.hide = false;
    });
    permission.forEach((it) => {
      it.hide = false;
    });
  }
};
const initOrgs = () => {
  const { orgs } = state.info;
  const noaccess = [];
  const permission = [];
  orgs.forEach((it) => {
    if (it.permission.read || it.permission.write) {
      permission.push(it);
    } else {
      noaccess.push(it);
    }
  });
  state.orgs = {
    noaccess,
    permission,
  };
};
const toClearOrg = () => {
  const { noaccess, permission } = state.orgs;
  permission.forEach((it) => {
    it.permission.read = 0;
    it.permission.write = 0;
    noaccess.push(it);
  });
  state.orgs.permission = [];
};

const toCheckOrgAllPermission = (i, type) => {
  state.orgs[type][i].permission = { read: 1, write: 1 };
};
const toCheckOrgNonePermission = (i, type) => {
  state.orgs[type][i].permission = { read: 0, write: 0 };
};
// 计算属性
const lang = computed(() => {
  return launch.lang;
});
const checkAllTxt = computed(() => {
  return allTxtMap[`label_${lang.value}`];
 });
const checkNoneTxt = computed(() => {
  return noneTxtMap[`label_${lang.value}`];
 });
const roleMap = computed(() => {
  return common.roleMap;
});
const pageHeight = computed(() => {
  return launch.options.pageHeight;
});
const bodyStyle = computed(() => {
  return {
    height: pageHeight.value + 'px',
  };
});
const orgStyle = computed(() => {
  return {
    height: pageHeight.value - 96 - 32 + 'px',
  };
});
const scrollbarStyle = computed(() => {
  return {
    height: pageHeight.value - 36 + 'px',
  };
});
const readTxt = computed(() => {
  return window.$l('Read');
});
const writeTxt = computed(() => {
  return window.$l('Write');
});
// 监听

// 卸载

// map
const allTxtMap = {
  label_en_us: 'Check All',
  label_zh_cn: '全选'
}
const noneTxtMap = {
  label_en_us: 'Check None',
  label_zh_cn: '取消'
}
const resetOptions = [
  {
    label: 'Yes',
    label_en_us: 'Yes',
    label_zh_cn: '是',
    value: 1,
  },
  {
    label: 'No',
    label_en_us: 'No',
    label_zh_cn: '否',
    value: 0,
  },
];
const permissionMap = [
  {
    label: 'Read',
    label_en_us: 'Read',
    label_zh_cn: '读',
    value: 0,
  },
  {
    label: 'Write',
    label_en_us: 'Write',
    label_zh_cn: '写',
    value: 1,
  },
];
</script>
<style lang="scss" scoped>
.leftScrollbar {
  height: calc(100% - 36px);
}
.orgItem{
  .rightTop {
    display: none;
  }
  &:hover {
    .rightTop{
      display: block;
    }
  }
  .rtBtn{
    padding: 2px 4px;
    border-radius: 0 4px 0 4px;
    font-size: 12px;
    color: $white;
    &.all {
      background-color: $green;
    }
    &.none {
      background-color: $orange;
    }
  }
}
.rightArea {
  width: calc(100% - 300px);
}
</style>
