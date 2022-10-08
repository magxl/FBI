<template>
  <div class="DingDingUser w240 pl8 noShrink border-l-dark1">
    <div class="flexMode vc hb h56 p10 pl0 border-b-dark1">
      <div class="flexMode">
        <div
          v-for="(it, i) in state.icons"
          :key="i"
          class="flexMode hc vc h32 w32 radius4 hover-bg-littleGray"
        >
          <el-tooltip :content="it.label">
            <i class="vicon txt-dark3" :class="it.icon" />
          </el-tooltip>
        </div>
      </div>
      <div class="flexMode hc vc h32 w32 radius4 hover-bg-littleGray">
        <el-tooltip content="效率套件设置">
          <i class="vicon txt-dark3 vite-home" />
        </el-tooltip>
      </div>
    </div>
    <div class="scrollArea">
      <el-scrollbar>
        <div class="p10-0">
          <div
            v-for="(it, i) in state.list"
            :key="i"
            class="diaList relative flexMode wp100 mb2 pl12 pt8 pb8 radius6"
            :class="state.active === i ? 'bg-littleGray' : ''"
            @click="toChangeUser(i)"
          >
            <div v-if="it.top" class="topIcon"></div>
            <Avatar :avatar="it.avatar" />
            <div class="diaBody pl8 pt4 flexGrow">
              <div class="flexMode vc pb4">
                <span class="fs14 txt-nowrap pr8">{{ it.name }}</span>
                <span
                  v-if="it.tag"
                  class="p0-4 lh14 radius12 txt-blue border-dark3"
                >
                  <text class="fs10 txt-nowrap">{{ it.tag }}</text>
                </span>
              </div>
              <div class="fs12 txt-dark3 txt-nowrap">
                <span>{{ it.last }}</span>
              </div>
            </div>
            <div class="w48 pt5 pr8 noShrink">
              <div class="txt-dark3 lh14 txt-r">
                <span class="fs10">{{ it.time }}</span>
              </div>
            </div>
            <div class="closeArea">
              <i class="vicon vite-close txt-dark3 hover-txt-dark5"></i>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>
<script setup>
import Avatar from './chip/Avatar.vue';
defineOptions({
  name: 'DingDingUser',
  components: { Avatar },
});
import { reactive, defineEmits, onMounted, inject } from 'vue';
const store = inject('store');
const state = reactive({
  icons: [],
  list: [],
  active: 0,
});
const emit = defineEmits();
onMounted(() => {
  saveHeaderInfo();
});
const saveHeaderInfo = () => {
  store.dingding().saveData('dialogHeaderInfo', state.list[state.active]);
};
const toChangeUser = (i) => {
  state.active = i;
  emit('changeUser', i);
  saveHeaderInfo();
};
state.icons = [
  {
    label: '@我',
    icon: 'vite-home',
  },
  {
    label: '特别关注',
    icon: 'vite-home',
  },
  {
    label: '稍后处理',
    icon: 'vite-home',
  },
  {
    label: '红包',
    icon: 'vite-home',
  },
];
import userData from './chip/userData.js';
state.list = userData;
</script>
<style lang="scss" scoped>
.diaBody {
  width: calc(100% - 96px);
}
.diaList {
  transition: $trans3;
  .closeArea {
    display: none;
    position: absolute;
    top: 50%;
    left: 0;
    width: 12px;
    align-items: center;
    justify-content: center;
    transform: translateY(-50%);
  }
  &:hover {
    background-color: $littleBlue;
    .closeArea {
      display: flex;
    }
  }
}
.topIcon {
  position: absolute;
  top: 0;
  right: 0;
  border: 5px solid transparent;
  border-top-color: $blue3;
  border-right-color: $blue3;
}
.scrollArea {
  height: calc(100% - 50px);
}
</style>
