<template>
  <div class="BlueAlpha Page">
    <el-scrollbar class="hp100">
      <Header bgtxt="COLOR" title="配色方案" sub="COLOR SCHEME" />
      <div class="flexMode vc hc p30">
        <div v-for="it in state.colors" :key="it.key" class="p30">
          <div class="colorRect" :class="it.key">
            <div class="rect"></div>
            <div class="rectbg"></div>
          </div>
          <div class="pt30 fs12">
            <p class="txt-white5 txt-c">{{ it.label }}</p>
            <p class="txt-white9 txt-c">{{ it.color }}</p>
          </div>
        </div>
      </div>
      <Header bgtxt="ICON" title="图标" sub="FONT ICON" />
      <div class="flexMode hc p30">
        <div class="iconArea flexMode flexWrap">
          <div v-for="(it, i) in state.icons" :key="i" class="icon">
            <i class="vicon" :class="it.icon"></i>
            <div class="iconbg"></div>
            <div class="iconbg bg1"></div>
          </div>
        </div>
      </div>
      <Header bgtxt="COMPONENT" title="组件" sub="LET US EASY" />
    </el-scrollbar>
  </div>
</template>
<script setup>
import Header from './BlueAlpha/Header.vue';
defineOptions({
  name: 'BlueAlpha',
  components: { Header },
});
import { reactive } from 'vue';
const state = reactive({
  colors: [
    { label: '主色', key: 'primary', color: '#3680F9' },
    { label: '红', key: 'red', color: '#F9365A' },
    { label: '橙', key: 'orange', color: '#F89638' },
    { label: '绿', key: 'green', color: '#11FB6B' },
    { label: '紫', key: 'purple', color: '#901CFD' },
    { label: '白', key: 'white', color: '#F0F0F0' },
    { label: '蓝', key: 'blue', color: '#11D4FB' },
  ],
  icons: [
    {
      label: '',
      icon: 'vite-arrows-h',
    },
    {
      label: '',
      icon: 'vite-arrows-v',
    },
    {
      label: '',
      icon: 'vite-my',
    },
    {
      label: '',
      icon: 'vite-close',
    },
    {
      label: '',
      icon: 'vite-scale',
    },
    {
      label: '',
      icon: 'vite-search',
    },
  ],
});
</script>
<style lang="scss" scoped>
.BlueAlpha {
  background-color: #191f31;
  .colorRect {
    position: relative;
    width: 48px;
    height: 48px;
    filter: contrast(120%);
    .rect {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 20px;
      z-index: 1;
    }
    .rectbg {
      position: absolute;
      top: 0;
      left: 8px;
      right: 8px;
      bottom: 0;
      border-radius: 8px;
      filter: blur(10px);
      transform: translateY(24px) scale(0.8);
      animation: rectbg 16s ease-in-out infinite;
    }
    &.primary {
      .rect {
        background-color: #3680f9;
        box-shadow: #3680f9 0 0 20px, #679ffa 0 0 2px, #679ffa 0 -6px 10px inset;
      }
      .rectbg {
        background-color: #3680f9;
        box-shadow: #3680f9 0 0 10px;
      }
    }
    &.red {
      .rect {
        background-color: #f9365a;
        box-shadow: #f9365a 0 0 20px, #fc5977 0 0 2px, #fc5977 0 -6px 10px inset;
      }
      .rectbg {
        background-color: #f9365a;
        box-shadow: #f9365a 0 0 10px;
      }
    }
    &.orange {
      .rect {
        background-color: #f89638;
        box-shadow: #f89638 0 0 20px, #f8b372 0 0 2px, #f8b372 0 -6px 10px inset;
      }
      .rectbg {
        background-color: #f89638;
        box-shadow: #f89638 0 0 10px;
      }
    }
    &.green {
      .rect {
        background-color: #11fb6b;
        box-shadow: #11fb6b 0 0 20px, #68faa0 0 0 2px, #11fb6b 0 -6px 10px inset;
      }
      .rectbg {
        background-color: #11fb6b;
        box-shadow: #11fb6b 0 0 10px;
      }
    }
    &.blue {
      .rect {
        background-color: #11d4fb;
        box-shadow: #11d4fb 0 0 20px, #60dcf5 0 0 2px, #60dcf5 0 -6px 10px inset;
      }
      .rectbg {
        background-color: #11d4fb;
        box-shadow: #11d4fb 0 0 10px;
      }
    }
    &.purple {
      .rect {
        background-color: #901cfd;
        box-shadow: #901cfd 0 0 20px, #aa58f7 0 0 2px, #aa58f7 0 -6px 10px inset;
      }
      .rectbg {
        background-color: #901cfd;
        box-shadow: #901cfd 0 0 10px;
      }
    }
    &.white {
      .rect {
        background-color: #f0f0f0;
        box-shadow: #f0f0f0 0 0 20px, #ffffff 0 0 2px, #ffffff 0 -6px 10px inset;
      }
      .rectbg {
        background-color: #f0f0f0;
        box-shadow: #f0f0f0 0 0 10px;
      }
    }
  }
  // iconArea
  .iconArea {
    width: 600px;
    filter: contrast(100%);
    .icon {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 100px;
      margin: 20px;
      color: #fff;
      text-shadow: #3680f9 0 0 10px, #679ffa 0 0 10px, #43d9f7 0 0 30px;
      background-image: radial-gradient(#3680f950, #3680f900);
      .vicon {
        font-size: 48px;
      }
      .iconbg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        &::before {
          content: '';
          position: absolute;
          top: -10px;
          left: 0;
          width: 1px;
          height: 140px;
          background-image: linear-gradient(
            to bottom,
            #3681f900,
            #3680f9,
            #3681f900
          );
        }
        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: -10px;
          width: 140px;
          height: 1px;
          background-image: linear-gradient(
            to right,
            #3681f900,
            #3680f9,
            #3681f900
          );
        }
        &.bg1 {
          &::before {
            top: auto;
            left: auto;
            right: 0;
            bottom: -10px;
          }
          &::after {
            top: auto;
            left: auto;
            right: -10px;
            bottom: 0;
          }
        }
      }
    }
  }
}
@keyframes rectbg {
  0% {
    transform: translateY(24px) scale(0.8);
  }
  50% {
    transform: translateY(8px) scale(1);
  }
  100% {
    transform: translateY(24px) scale(0.8);
  }
}
</style>
