<template>
  <div class="DingDingHeader flexMode vs hb h48 bg-blue">
    <div class="flexMode vs">
      <div class="flexMode vc hb w100 p10-20">
        <div
          class="w12 h12 bg-red hover-bg-red7 radiusP50 box-shadow-dark3"
        ></div>
        <div
          class="w12 h12 bg-orange hover-bg-orange7 radiusP50 box-shadow-dark3"
        ></div>
        <div
          class="w12 h12 bg-green hover-bg-green7 radiusP50 box-shadow-dark3"
        ></div>
      </div>
      <div class="flexMode vc">
        <el-popover placement="bottom" trigger="click" width="340">
          <template #reference>
            <div
              class="flexMode hc vc w32 h32 radius4 bg-white1 hover-bg-white3"
            >
              <span class="fs12 txt-white">Mag</span>
            </div>
          </template>
          <div>
            <div class="flexMode">
              <div class="flexMode hc vc txt-white w48 h48 radius8 bg-blue">
                Mag
              </div>
              <div class="pl10">
                <div class="fs18">Magxl</div>
                <div class="fs12 txt-dark5">
                  <span class="pr10">北京小苗财税服务有限公司</span>
                  <span>✅</span>
                </div>
              </div>
            </div>
            <div class="flexMode vc p10 mt10 border-dark1 radius6">
              <span>😉</span>
              <span class="pl10 txt-dark5">学习中</span>
            </div>
            <div class="pt10">
              <div
                v-for="(it, i) in state.avatarBtns"
                class="flexMode vc p10 radius6 hover-bg-littleGray"
              >
                {{ it.label }}
              </div>
            </div>
          </div>
        </el-popover>
      </div>
      <div class="flexMode vc w400 pl30">
        <el-popover placement="bottom" trigger="click" width="400px">
          <template #reference>
            <el-input
              v-model="state.search"
              size="mini"
              clearable
              class="wp100 dingSearch"
              placeholder="搜索"
            >
              <template #prefix>
                <i class="vicon vite-search" />
              </template>
            </el-input>
          </template>
          <div>
            <el-scrollbar width="400">
              <div class="tabArea flexMode pb5 border-b-littleGray">
                <div
                  v-for="(it, i) in state.searchTabs"
                  :key="i"
                  class="tab p10 radius6"
                  :class="
                    state.activeTab === it
                      ? 'active  hover-bg-dark1'
                      : 'hover-bg-littleGray'
                  "
                >
                  <span class="txt-nowrap">{{ it }}</span>
                </div>
              </div>
            </el-scrollbar>
            <div class="h400 p10-0"></div>
          </div>
        </el-popover>
      </div>
    </div>
    <!-- left ↑ -->
    <!-- right ↓ -->
    <div class="flexMode vs p10">
      <el-popover
        placement="bottom"
        trigger="click"
        width="320"
        popper-class="bg-littleGray"
      >
        <template #reference>
          <div
            class="flexMode hc vc w64 fs20 lh20 radius4 bg-white5 txt-white9 hover-bg-white3"
          >
            +
          </div>
        </template>
        <div class="plusArea flexMode flexWrap">
          <div v-for="(it, i) in state.plusBtns" :key="i" class="m10">
            <div class="flexMode hc vc h48 w48 radius6 bg-white hover-bg-dark3">
              <i class="vicon fs30" :class="it.icon" />
            </div>
            <div class="txt-c fs12 txt-dark5">{{ it.label }}</div>
          </div>
        </div>
      </el-popover>
    </div>
  </div>
</template>
<script setup>
defineOptions({
  name: 'DingDingHeader',
});
import { reactive } from 'vue';
const state = reactive({
  search: '',
  activeTab: '综合',
  avatarBtns: [],
  plusBtns: [],
});

// user dropdown
const dropdownCommand = (v) => {
  console.info('dropdownCommand', v);
};

const searchTabTxt =
  '综合,联系人,群组,聊天记录,文档,日志,标签,功能,公开群组,应用,外部联系人,待办,日程,百科,商机';
state.searchTabs = searchTabTxt.split(',');
state.avatarBtns = [
  {
    label: '私人盘',
    command: 'pan',
  },
  {
    label: '偏好设置',
    command: 'favorite',
    divided: true,
  },
  {
    label: '修改密码',
    command: 'password',
  },
  {
    label: '机器人管理',
    command: 'robot',
  },
  {
    label: '客服与帮助',
    command: 'help',
    divided: true,
  },
  {
    label: '下载手机版',
    command: 'download',
  },
  {
    label: '关于',
    command: 'about',
  },
  {
    label: '退出登录',
    command: 'logout',
    divided: true,
  },
];
const plusLabel =
  '发起群聊,添加好友,投屏,在线课堂,发起会议,新建日程,新建待办,新建DING,新建文档,新建表格';
const plusIcon = '';
state.plusBtns = plusLabel.split(',').map((it) => {
  return {
    label: it,
    icon: 'vite-home',
  };
});
</script>
<style lang="scss" scoped>
.tab {
  position: relative;
  &.active {
    &::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: 0;
      height: 4px;
      width: 30px;
      transform: translateX(-50%);
      background-color: #111;
    }
  }
}
.plusArea {
  width: 272px;
}
</style>
