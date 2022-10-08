<template>
  <div class="Moban Page">
    <el-scrollbar class="hp100">
      <div class="wrap" :style="wrap.style">
        <div class="header flexMode vc" :style="header.style">
          <div class="content wp100" :style="header.content.style">
            <div class="title" :style="header.content.title.style">
              {{ header.content.title.text }}
            </div>
            <div class="subTitle" :style="header.content.subTitle.style">
              {{ header.content.subTitle.text }}
            </div>
          </div>
        </div>
        <div class="body" :style="body.style">
          <div class="content flexMode" :style="body.content.style">
            <div class="flexMode vs p0-30">
              <div
                class="flexMode hc vc w64 h64 noShrink"
                :style="{ color: state.color.primary, opacity: 0.3 }"
              >
                <i class="vicon vite-my fs48" />
              </div>
              <div class="flexMode flexV hb p10">
                <div class="fs20" :style="{ color: state.color.primary }">
                  TEL: {{ state.tel }}
                </div>
                <div class="txt-dark3 fs14">联系电话</div>
              </div>
            </div>
            <div class="flexMode vs p0-30">
              <div
                class="flexMode hc vc w64 h64 noShrink"
                :style="{ color: state.color.primary, opacity: 0.3 }"
              >
                <i class="vicon vite-my fs48" />
              </div>
              <div class="flexMode flexV hb p10">
                <div class="fs20" :style="{ color: state.color.primary }">
                  TEL: {{ state.tel }}
                </div>
                <div class="txt-dark3 fs14">联系电话</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script setup>
defineOptions({
  name: 'Moban',
});
import { reactive } from 'vue';
const state = reactive({
  tel: '10086',
  color: {
    primary: '#31ae31',
  },
});
const wrap = reactive({
  style: {},
});
const header = reactive({
  style: {
    background: 'rgba(240,240,240,.5)',
    width: '100%',
    height: '500px',
  },
  content: {
    title: {
      text: 'Get Business Solution With Boseo.',
      style: {
        font: '48px blod',
        color: '#111',
        maxWidth: '600px',
        margin: '0 auto',
      },
    },
    subTitle: {
      text: 'A SUBTITLE HERE FOR DOUBLE LINES THROGHT THE BANNER & UNDER THE TITLE',
      style: {
        font: '20px lighter',
        color: '#777',
        maxWidth: '600px',
        margin: '0 auto',
      },
    },
    style: {
      maxWidth: '1200px',
    },
  },
});

const body = reactive({
  style: {},
  content: {
    style: {
      margin: '0 auto',
      maxWidth: '1200px',
      padding: '50px 0',
    },
  },
});
</script>
<style lang="scss" scoped>
a {
  color: #31ae31;
}
</style>
