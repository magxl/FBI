<template>
  <div class="AFrameHeader">
    <div class="logoArea flexMode vc h56 pl20 noShrink noselect point">
      <el-image
        :src="$getImg('d/logo_mini.png')"
        fit="cover"
        style="height: 30px"
        @click="gotoBoard"
      />
      <el-popover placement="bottom" width="120">
        <div>
          <el-image :src="$getImg('d/qrcode.png')" fit="cover" class="w120" />
          <div class="pt4 fs12 txt-c">{{ $l('Mobile View') }}</div>
        </div>
        <template #reference>
          <i class="adicon ad-qrcode txt-white fs24 ml8"></i>
        </template>
      </el-popover>
    </div>
    <!-- Logo ↑ -->
    <div class="leftArea">
      <div class="flexMode vc h24 p0-10">
        <div class="dot6 bg-orange"></div>
        <div class="pl4 fs12 lh11 txt-white7 hover-txt-orange">
          notice here longlonglonglonglonglonglonglonglonglong
        </div>
      </div>
      <TabPages />
    </div>
    <!-- tab nav ↑ -->
    <div class="rightArea flexMode hr vc w160 h56 pr10">
      <el-dropdown placement="bottom-end" @command="avatarCommand">
        <div class="mgbtn circle30 white mr8">
          <i class="adicon ad-user-circle txt-white fs24"></i>
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
      <div class="mgbtn circle30 white mr8" @click="toSetting">
        <i class="adicon ad-nav-system-set fs24 txt-white" />
      </div>
      <!-- ↓ help ↓ -->
      <div class="mgbtn circle30 white mr8" @click="toHelp">
        <i class="adicon ad-help fs24" :class="helpVisible?'txt-littleGreen':'txt-white'" />
      </div>
      <!-- language -->
      <div class="p0-8">
        <Lang class="flexMode vs hp100" txt-color="txt-white9" />
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
      label: 'User Center',
      key: 'account',
      command: 0,
      color: 'txt-dark5',
      hover: '',
      icon: 'ad-userinfo',
    },
    {
      label: 'Setting',
      key: 'setting',
      command: 1,
      color: 'txt-dark5',
      hover: '',
      icon: 'ad-nav-system-set',
    },
    {
      label: 'Logout',
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
      title: 'Setting',
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

const toHelp = () => {
  launch.saveData('help', { visible: !launch.help.visible });
};

const gotoBoard = () => {
  router.push({
    name: 'ABoard_Main',
  });
};
// 计算属性
const helpVisible = computed(() => {
  return launch.help.visible;
 });
// 卸载
</script>
<style lang="scss" scoped>
.AFrameHeader {
  position: relative;
  display: flex;
  align-items: stretch;
  height: 56px;
  background-color: $primary;
  box-shadow: 0 5px 20px $dark1;
  z-index: 2;
  .logoArea {
    width: 200px;
    &:hover {
      filter: drop-shadow(0 0 20px $orange);
    }
  }
  .topArea {
    height: 28px;
  }
  .leftArea {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: calc(100% - 360px);
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 12px;
      z-index: 2;
      background-image: linear-gradient(
        to right,
        rgba(95, 99, 242, 0.9),
        rgba(95, 99, 242, 0.5) 70%,
        rgba(95, 99, 242, 0)
      );
    }
  }
  .rightArea {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 100%;
      bottom: 0;
      width: 12px;
      background-image: linear-gradient(
        to right,
        rgba(95, 99, 242, 0),
        rgba(95, 99, 242, 0.5) 70%,
        rgba(95, 99, 242, 0.9)
      );
    }
  }
}
</style>
