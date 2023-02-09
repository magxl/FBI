<template>
  <div class="SuperAvatarApp flexMode vc h32">
    <div
      v-for="(it, i) in state.options"
      :key="i"
      @click="toClick(it)"
      class="w32 h32 mr2 radiusP50 radius box-shadow-dark1 border-dark1 hover-y-8 point transition3"
    >
      <el-image :src="it" lazy fit="cover">
        <template #error>
          <div class="flexMode hc vc wp100 hp100">
            <span class="txt-dark3 fs12 lh12">FAIL</span>
          </div>
        </template>
      </el-image>
    </div>
    <el-tooltip v-if="state.more.length" placement="top" raw-content>
      <span class="hover-a">+{{ state.more.length }}More</span>
      <template #content>
        <div class="flexMode flexWrap vc" style="max-width: 304px">
          <div
            v-for="(it, i) in state.more"
            :key="i"
            @click="toClick(it)"
            class="w32 h32 mr2 radiusP50 radius box-shadow-white1 border-white1 hover-y-8 point transition3"
          >
            <el-image :src="it" lazy fit="cover">
              <template #error>
                <div class="flexMode hc vc wp100 hp100">
                  <span class="txt-dark3 fs12 lh12">FAIL</span>
                </div>
              </template>
            </el-image>
          </div>
        </div>
      </template>
    </el-tooltip>
  </div>
</template>
<script setup>
// 定义
defineOptions({
  name: 'SuperAvatarApp',
});
// 传参

const prop = defineProps({
  list: {
    type: [Array, String],
    default: () => [],
  },
});
// 数据
const state = reactive({
  options: [],
  more: [],
});

// 计算属性

// 挂载

// 事件
const emit = defineEmits();
const initOptions = (v) => {
  state.more = v.slice(4, v.length);
  state.options = v.splice(0, 4);
};

const toClick = (v) => {
  emit('toClick', v);
};

// 监听
watch(
  () => prop.list,
  (n) => {
    if (n) {
      const type = window.$getType(n);
      let options = [];
      if (type === 'String') {
        options = n.split(',');
      } else if (type === 'Array') {
        options = n;
      }
      initOptions(options);
    } else {
      state.more = [];
      state.options = [];
    }
  },
  {
    immediate: true,
  },
);
// 卸载
</script>
<style lang="scss" scoped></style>
