<template>
  <div class="Login flexMode hc vc absCenter" :key="lang">
    <div class="lottieArea">
      <div class="lottie">
        <Lottie :options="state.options" src="@/assets/lottie/loginbg.json" />
      </div>
    </div>
    <div class="loginArea flexMode flexV hb backdrop">
      <div class="langArea"><Lang /></div>
      <div class="loginForm wp100">
        <div class="p0-20">
          <h1 class="fs24 txt-dark9 mb10">{{ $l('title') }}</h1>
          <div class="fs14 txt-dark3">{{ $l('slogen') }}</div>
        </div>
        <div class="formArea">
          <el-form ref="form" :rules="rules" :model="form" size="large">
            <div class="pb10 fs14 txt-dark5">{{ $l('帐户') }}</div>
            <el-form-item label="" prop="account">
              <el-input
                v-model="state.form.account"
                clearable
                :placeholder="$l('帐户')"
              >
                <template #prefix>
                  <Icon name="address-card" class="fs20" />
                </template>
              </el-input>
            </el-form-item>
            <div class="pb10 fs14 txt-dark5">{{ $l('密码') }}</div>
            <el-form-item label="" prop="password">
              <el-input
                v-model="state.form.password"
                clearable
                type="password"
                :placeholder="$l('密码')"
              >
                <template #prefix>
                  <Icon name="lock" class="fs20" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="" prop="password" class="pt30">
              <el-button @click="toLogin" type="primary" class="wp100">{{
                $l('登录')
              }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="wp100 flexMode flexV hc vc fs12 txt-dark3">
        <div>北京阳光伟烨网络技术有限公司</div>
        <div>© 2012－2022 Ann9.com,All Rights Reserved.</div>
        <div>
          <a href="https://beian.miit.gov.cn/" class="txt-blue5 hover-txt-blue"
            >京ICP备15044084号-2</a
          >
          <span class="pl5">京公网安110105012193号</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Lottie from '@cpt/Onload/Lottie/index.vue';
import * as loginbg from '@/assets/lottie/loginbg.json';
// console.info(loginbg);
defineOptions({
  name: 'Login',
});
import { reactive } from 'vue';
// 数据
const state = reactive({
  rules: {},
  form: {},
  options: {
    animationData: loginbg.default,
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
    router.push({ name: 'ABoardMain' });
  } else {
    launch.Login(state.form);
  }
  clearLocal();
};
const clearLocal = ()=>{
  localStorage.removeItem('tabPages');
}
// 卸载
</script>
<style lang="scss" scoped>
.Login {
  height: 640px;
  width: 1024px;
  border-radius: 16px;
  overflow: hidden;
  // background-color: $littleBlue;
  box-shadow: 0 80px 100px $dark1;
  background-image: radial-gradient($white 50%, $littleBlue);
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
    width: 614px;
    height: 100%;
    padding: 50px;
    background-color: $white9;
    .langArea {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .formArea {
      padding: 50px 20px;
    }
  }
}
</style>
