<template>
  <div class="Navbar">
    <div v-for="it in navbar" :key="it.name" class="p0-10">
      <div v-if="it.children && it.children.length" class="lh12">
        <el-dropdown
          trigger="click"
          placement="bottom-end"
          @command="dropdownCommand"
        >
          <span
            class="fs12 point"
            :class="
              path.includes(it.path) ? 'txt-blue' : 'txt-dark5 hover-txt-blue'
            "
          >
            {{ it.meta.label }}
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(ct, i) in it.children"
                :key="i"
                :command="ct.name"
                class="fs12"
              >
                {{ ct.meta.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <router-link
        v-else
        :to="it.path"
        :class="path === it.path ? 'txt-blue' : 'txt-dark5 hover-txt-blue'"
        >{{ it.meta.label }}</router-link
      >
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'Navbar',
});
import { reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const state = reactive({});
const navbar = reactive(
  window.routes.filter((it) => it.meta.position === 'navbar'),
);
const route = useRoute();
const router = useRouter();
const path = computed(() => {
  return route.path;
});

// 路由跳转
const dropdownCommand = (name) => {
  router.push({ name });
};
</script>

<style lang="scss" scoped>
.Navbar {
  // position: sticky;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 30px;
  display: flex;
  align-items: center;
  padding: 4px 10px;
  font-size: 12px;
  z-index: 9;
  // background-image: radial-gradient(rgba(0, 0, 0, 0) 1px, #fff 1px);
  // background-size: 4px 4px;
  background-color: $white7;
  @include backdrop();
}
</style>
