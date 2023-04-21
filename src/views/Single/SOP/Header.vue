<template>
  <div class="SOPHeader box-shadow-dark1">
    <div class="headerArea flexMode vs hb">
      <div class="logoArea flexMode vc noShrink">
        <img :src="$getImg('d/logo_mini.png')" width="120" />
      </div>
      <!-- logo -->
      <!-- right -->
      <div class="flexMode vs hb flexGrow p0-16">
        <div class="flexMode vc">
          <div
            v-for="(it, i) in nav"
            :key="it.value"
            class="navItem hover-txt-white9"
            :class="prop.active === it.value ? 'txt-white' : 'txt-white7'"
            @click="toGoto(it, i)"
          >
            {{ $l(it.label) }}
          </div>
        </div>
        <!-- nav -->
        <!-- lang -->
        <div class="toolArea flexMode vc">
          <div
            class="fs14 txt-white9 hover-txt-orange pr16"
            @click="toShowForm"
          >
            {{ $l('Submit Your Enquiry') }}
          </div>
          <el-tooltip placement="bottom" :content="$l('Regist / Login')">
            <div
              class="mr8 mgbtn circle24 white"
              title="to login"
              @click="toLogin"
            >
              <i class="adicon ad-logo_gray txt-white7 fs20"></i>
            </div>
          </el-tooltip>
          <Lang />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// 定义
defineOptions({
  name: 'SOPHeader',
});
// 传参
const prop = defineProps({
  nav: {
    type: Array,
    default: () => [],
  },
  active: {
    type: String,
    default: '',
  },
});
// 数据
const state = reactive({});
const router = useRouter();
// 挂载

// 事件
const emit = defineEmits();
const toGoto = (it, i) => {
  emit('scroll-to', it.value);
};
const toShowForm = () => {
  emit('show-form');
};
const toLogin = () => {
  router.push({ name: 'Login' });
};
// 计算属性

// 监听

// 卸载

// Map
</script>
<style lang="scss" scoped>
.SOPHeader {
  position: sticky;
  top: 0;
  z-index: 9;
  background-color: $primary;
  .headerArea {
    max-width: 1200px;
    height: 56px;
    margin: 0 auto;
  }
  .navItem {
    padding: 8px;
  }
}
</style>
