<template>
  <div class="AFrameHeader relative">
    <div class="leftArea">
      <div class="adArea flexMode vc p0-10">
        <!-- <div class="dot6 bg-blue" />
        <el-link class="pl4 fs12 txt-dark7"
          >notice here longlonglonglonglonglonglonglonglonglong</el-link
        > -->
      </div>
      <TabPages />
    </div>

    <div class="rightArea flexMode hr vs w160 h56 pr10 bg-white9 backdrop">
      <el-dropdown
        trigger="click"
        placement="bottom-end"
        @command="avatarCommand"
      >
        <div class="flexMode vc p0-10 hover-bg-dark1">
          <div class="p4 radiusP50 bg-dark1">
            <Icon name="user" class="fs20" />
          </div>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="(it, i) in state.avatarOptions"
              :key="i"
              :command="it"
              :divided="it.divided"
              :class="[it.color, it.hover]"
            >
              <div class="w24">
                <i class="adicon" :class="it.icon" />
                <!-- <Icon :name="it.icon" class="fs16 opacity5" /> -->
              </div>
              <span>
                {{ $l(it.label) }}
              </span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- ↑ avatar ↑ -->
      <!-- ↓ setting ↓ -->
      <div class="flexMode hc vc p0-10 ml4 hover-bg-dark1" @click="toSetting">
        <i class="adicon ad-nav-system-set fs24" />
      </div>
      <div class="flexMode vc p0-10 hover-bg-dark1">
        <Lang class="flexMode vs hp100" />
      </div>
    </div>
    <Drawer v-model:current="state.currentDrawer" :drawer="state.drawer" />
  </div>
</template>
<script setup>
import AccountInfo from './AFrameHeader/AccountInfo.vue';
import Setting from './AFrameHeader/Setting.vue';
import TabPages from './AFrameHeader/TabPages.vue';
defineOptions({
  name: 'AFrameHeader',
});
// 数据
const state = reactive({
  avatarOptions: [
    {
      label: '用户中心',
      key: 'account',
      command: 0,
      color: 'txt-dark5',
      hover: '',
      icon: 'ad-userinfo',
    },
    {
      label: '设置',
      key: 'setting',
      command: 1,
      color: 'txt-dark5',
      hover: '',
      icon: 'ad-nav-system-set',
    },
    {
      label: '退出',
      color: 'txt-dark5',
      hover: 'hover-txt-red',
      key: 'logout',
      command: 99,
      icon: 'ad-logout',
      divided: true,
    },
  ],
  drawer: [
    {
      title: '',
      size: 500,
      cpt: AccountInfo,
    },
    {
      title: '设置',
      size: 500,
      cpt: Setting,
    },
  ],
  currentDrawer: '',
});
const store = inject('store');
const launch = store.launch();
const { proxy } = getCurrentInstance();
const router = useRouter();
// 计算属性

const avatarCommand = ({ command, label }) => {
  if (command === 99) {
    router.push({ name: 'Login' });
  } else {
    state.drawer[command].title = proxy.$l(label);
    state.currentDrawer = command;
  }
};

const toSetting = () => {
  state.drawer[1].title = proxy.$l(state.drawer[1].title);
  state.currentDrawer = 1;
};
// 卸载
</script>
<style lang="scss" scoped>
.AFrameHeader {
  height: 56px;
  background-color: $white;
  .topArea {
    height: 28px;
  }
  .leftArea {
    width: 100%;
    .adArea {
      height: 28px;
      width: 100%;
    }
  }
  .rightArea {
    position: absolute;
    top: 0;
    right: 0;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 100%;
      bottom: 0;
      width: 12px;
      background-image: linear-gradient(
        to right,
        rgba(255, 255, 255, 0),
        $white5 70%,
        $white9
      );
    }
  }
}
</style>
