<template>
  <div class="Login flexMode hc vc absCenter z2" :key="lang">
    <div class="loginArea flexMode flexV hb backdrop">
      <div class="langArea"><Lang /></div>
      <div class="loginForm wp100">
        <div class="logoArea p0-20">
          <!-- <h1 class="fs24 txt-dark9 mb10">{{ $l('title') }}</h1> -->
          <div class="flexMode hb vc">
            <el-image
              :src="$getImg('d/logo_alpha.png')"
              fit="cover"
              class="w140"
            />
            <span class="fs14 txt-dark9">{{ $l('slogen2') }}</span>
          </div>
          <div class="fs14 txt-dark3 p10-4">{{ $l('slogen') }}</div>
          <div class="pl4">
            <el-image :src="$getImg('svg/ads.svg')" fit="cover" class="w120" />
          </div>
        </div>
        <div class="formArea">
          <el-form ref="form" :rules="rules" :model="form" size="large">
            <div class="pb10 fs14 txt-dark5">{{ $l('Account') }}</div>
            <el-form-item label="" prop="account">
              <el-input
                v-model="state.form.account"
                clearable
                :placeholder="$l('Account')"
              >
                <template #prefix>
                  <Icon name="address-card" class="fs20" />
                </template>
              </el-input>
            </el-form-item>
            <div class="pb10 fs14 txt-dark5">{{ $l('Password') }}</div>
            <el-form-item label="" prop="password">
              <el-input
                v-model="state.form.password"
                clearable
                type="password"
                :placeholder="$l('Password')"
              >
                <template #prefix>
                  <Icon name="lock" class="fs20" />
                </template>
                <!-- <template #append>
                  <i class="adicon ad-idea"></i>
                </template> -->
              </el-input>
            </el-form-item>
            <el-form-item label="" prop="password" class="pt30">
              <el-button @click="toLogin" type="primary" class="wp100">{{
                $l('Login')
              }}</el-button>
            </el-form-item>
            <div class="flexMode hr pt16">
              <div class="flexMode vc hover-a" @click="toSOP">
                <span class="pr4 fs12">
                  {{ $l('Station of Portal') }}
                </span>
                <i class="adicon ad-arrow-right fs14 txt-dark5"></i>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <div class="wp100 flexMode flexV hc vc fs12 txt-dark3">
        <div>北京阳光伟烨网络技术有限公司</div>
        <div>© 2022－Now Ann9.com, All Rights Reserved.</div>
        <div>
          <a href="https://beian.miit.gov.cn/" class="txt-blue5 hover-txt-blue"
            >京ICP备15044084号-2</a
          >
          <span class="pl5">京公网安110105012193号</span>
        </div>
      </div>
    </div>
  </div>
  <div class="absCenter wp100 hp100 blur8">
    <el-image
      :src="$getImg('d/login_bg.webp')"
      fit="cover"
      class="wp100 hp100"
    />
  </div>
</template>
<script setup>
// import Lottie from '@cpt/Onload/Lottie/index.vue';
// import * as loginbg from '@/assets/lottie/loginbg.json';
defineOptions({
  name: 'Login',
});

const { proxy } = getCurrentInstance();
// 数据
const state = reactive({
  rules: {},
  form: {},
  options: {
    // animationData: loginbg.default,
  },
});
const store = inject('store');
const launch = store.launch();

const router = useRouter();
// 计算属性
const lang = computed(() => {
  return launch.lang;
});

// 监听

// 挂载

// 事件
const toLogin = () => {
  if (window.global.config.dev) {
    launch.saveData('login', window.global.config.login);
    router.push({ name: window.global.config.defaultPage });
  } else {
    launch.Login(state.form);
  }
  clearLocal();
};
const clearLocal = () => {
  localStorage.removeItem('tabPages');
  launch.saveData('tabPages', []);
};
// 进入门户站
const toSOP = () => {
  router.push({ name: 'SOP' });
};
// 卸载
</script>
<style lang="scss" scoped>
.Login {
  height: 580px;
  // width: 1024px;
  border-radius: 16px;
  overflow: hidden;
  // background-color: $littleBlue;
  box-shadow: 0 80px 100px $dark1;
  .lottieArea {
    position: relative;
    width: 410px;
    height: 100%;
    padding-top: 100px;
    z-index: 2;
    .lottie {
      width: 500px;
    }
  }
  .loginArea {
    position: relative;
    width: 500px;
    height: 100%;
    padding: 32px 16px;
    background-color: $white9;
    background-image: linear-gradient($white 50%, $littleBlue);
    z-index: 2;
    .langArea {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .logoArea {
      // margin: -20px 0 0 -40px;
    }
    .formArea {
      padding: 30px 20px;
    }
  }
}
</style>
