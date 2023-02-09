<template>
  <div class="AppStoreChartsDetail">
    <el-scrollbar class="hp100">
      <AppTop :info="state.info" />
      <!-- ↓ body ↓ -->
      <div class="flexMode vs">
        <div class="border-r" style="width: calc(100% - 360px)">
          <AppMain :info="state.info" />
        </div>
        <div style="width: 360px">
          <AppInfo :info="state.info" />
          <AppPurchase :info="state.info" />
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script setup>
import AppTop from './Detail/AppTop.vue';
import AppInfo from './Detail/AppInfo.vue';
import AppMain from './Detail/AppMain.vue';
import AppPurchase from './Detail/AppPurchase.vue';
defineOptions({
  name: 'AppStoreChartsDetail',
  components: { AppTop, AppInfo, AppMain, AppPurchase },
});
// 传参
const prop = defineProps({
  params: {
    type: Object,
    default: () => {},
  },
});
const store = inject('store');
const launch = store.launch();
// 数据
const state = reactive({
  info: {},
  country: '',
  type: '',
});

// 计算属性
const countryMap = computed(() => {
  const { countryAllMap } = window.$map.country;
  const { country = [] } = state.info;
  const r = [];
  country.forEach((it) => {
    const has = countryAllMap.filter((ft) => ft.value === it)[0];
    if (has) {
      r.push(has);
    }
  });
  return r;
});
// 监听

// 挂载

// 事件
const getInfo = async () => {
  console.info('Get App Info', prop.params.info);
  const purchase = window.$rn(20);
  state.info = {
    title: '爱奇艺-《狂飙》开年必看',
    subTitle: '浮图缘、我们民谣2022全网独播',
    appid: window.$rn(999999999, 100000000),
    category: '娱乐,工具',
    price: (window.$rn(99999,100)/100).toFixed(2),
    scores: window.$rn(999999),
    rate: (window.$rn(50,0)/10).toFixed(1),
    purchase,
    ranking: window.$rn(10000),
    rankingName: window.$rn(10) > 5 ? 'Free' : 'Paid',
    refreshDate: '2023-01-31',
    releaseDate: '2010-09-26',
    country: ['HK', 'MO', 'CN'],
    iPhoneGallery: window.$fakeData(window.$rn(10), (i) => {
      return {
        color: window.$randomColor(),
      };
    }),
    iPadGallery: window.$fakeData(window.$rn(10), (i) => {
      return {
        color: window.$randomColor(),
      };
    }),
    description: `
        description1
        description2
        description3
        description4

        description5-1
      `,
    developer: 'QIYI',
    seller: 'Beijing Qiyi Century Science & Technology Co.,LTD.',
    bundleId: 'com.qiyi.iphone',
    version: '14.1.0',
    fileSize: '325.77',
    watchSupport: 'No',
    familySharing: 'No',
    compatibility: [
      {
        Term: 'iPhone',
        Definition: '设备需装有 iOS 11.0 或更高版本。',
      },
      {
        Term: 'iPod touch',
        Definition: '设备需装有 iOS 11.0 或更高版本。',
      },
    ],
    language: '中文,英文',
    issueRegion: '中国香港,中国澳门,中国',
    country: 'CN,US,HK',
    age: '17+',
    purchaseList: window.$fakeData(purchase, (i) => {
      return {
        name: 'purchase' + i,
        price: (window.$randomNumber(10000, 0) / 100).toFixed(2),
      };
    }),
  };
};
getInfo();
// 卸载
</script>
<style lang="scss" scoped></style>
