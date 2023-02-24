<template>
  <div
    v-if="loading"
    class="OnloadLoading"
    :class="{ preventStop: loading.preventStop }"
  >
    <div class="loadingArea backdrop" :class="{ loading: state.visible }">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="48"
        height="48"
        viewBox="0 0 40 40"
        enable-background="new 0 0 48 48"
        xml:space="preserve"
      >
        <path
          opacity=".8"
          fill="#fff"
          d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
      s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
      c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
        ></path>
        <rect x="12" y="18" width="4" height="4" fill="RGBA(86, 162, 253, 1)">
          <animate
            attributeType="xml"
            attributeName="opacity"
            values="0.2;1;0.2"
            begin="0"
            dur="0.9s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="18" y="18" width="4" height="4" fill="RGBA(96, 184, 112, 1)">
          <animate
            attributeType="xml"
            attributeName="opacity"
            values="0.2;1;0.2"
            begin="0.3s"
            dur="0.9s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="24" y="18" width="4" height="4" fill="RGBA(255, 176, 45, 1)">
          <animate
            attributeType="xml"
            attributeName="opacity"
            values="0.2;1;0.2"
            begin="0.6s"
            dur="0.9s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
    </div>
  </div>
</template>
<script setup>
defineOptions({
  name: 'OnloadLoading',
});
// 数据
const state = reactive({
  visible: true,
});
const store = inject('store');
const launch = store.launch();
let timer = null;
// 计算属性
const loading = computed(() => {
  return launch.loading;
});
watch(
  () => loading.value.visible,
  (n) => {
    if (n === false) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        state.visible = false;
      }, 800);
    } else if (n === true) {
      clearTimeout(timer);
      state.visible = true;
    }
  },
);
// 监听

// 挂载

// 事件

// 卸载
</script>
<style lang="scss" scoped>
.OnloadLoading {
  position: fixed;
  left: 50%;
  bottom: 0;
  right: 50%;
  top: 0;
  z-index: 19910608;
  &.preventStop {
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
  }
  .loadingArea {
    position: absolute;
    top: 0.5rem;
    left: 50%;
    transform: translate(-50%, -100px);
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 16px $blue3, 0 0 8px $green3, 0 0 2px $red3;
    background-color: $dark5;
    transition: $trans1;
    &.loading {
      transform: translate(-50%, 0);
    }
  }
  .btnArea {
    position: absolute;
    top: 160px;
    left: 32px;
  }
  path {
    transition: $trans3;
  }
}
</style>
