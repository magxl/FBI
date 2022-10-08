<template>
  <Navbar />
  <div class="PAGE">
    <router-view />
  </div>
</template>
<script setup>
import Navbar from './views/Launch/Navbar.vue';
import Launch from './views/Launch/Launch.vue';
// const HelloWorld = import.meta.glob('./components/HelloWorld.vue');
// const HelloWorld = () => import('./components/HelloWorld.vue').default;
// const HelloWorld = getCurrentInstance().appContext.components(
//   './components/HelloWorld.vue',
// );
</script>
<style lang="scss" scoped>
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.PAGE {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 30px;
  overflow: hidden;
  z-index: 1;
}
</style>
