<template>
  <div
    class="Avatar flexMode flexWrap hc vc bg-blue1 radius radius4 noShrink"
    :class="prop.type"
  >
    <template v-if="prop.avatar.length === 1">
      <div
        v-for="(at, a) in prop.avatar"
        :key="a"
        class="full radius4"
        :class="at.bg"
      ></div>
    </template>
    <template v-else-if="prop.avatar.length === 2">
      <div
        v-for="(at, a) in prop.avatar"
        :key="a"
        class="double"
        :class="at.bg"
      ></div>
    </template>
    <template v-else-if="prop.avatar.length === 3">
      <div class="half1" :class="prop.avatar[0].bg"></div>
      <div>
        <div class="half2" :class="prop.avatar[1].bg"></div>
        <div class="half2" :class="prop.avatar[2].bg"></div>
      </div>
    </template>
    <template v-else-if="prop.avatar.length == 4">
      <div
        v-for="(at, a) in prop.avatar"
        :key="a"
        class="half2 radius4"
        :class="at.bg"
      ></div>
    </template>
    <template v-else>
      <div
        v-for="(at, a) in prop.avatar"
        :key="a"
        class="nyx radius4"
        :class="at.bg"
      ></div>
    </template>
  </div>
</template>
<script setup>
defineOptions({
  name: 'Avatar',
});
const prop = defineProps({
  avatar: {
    type: Array,
    default: () => [],
  },
  type: {
    type: String,
    default: 'normal',
  },
});
import { reactive } from 'vue';
const state = reactive({});
</script>
<style lang="scss" scoped>
.normal {
  width: 48px;
  height: 48px;
  .full {
    width: 46px;
    height: 46px;
  }
  .double {
    width: 48px;
    height: 24px;
  }
  .half1 {
    width: 24px;
    height: 48px;
  }
  .half2 {
    width: 24px;
    height: 24px;
  }
  .nyx {
    width: 16px;
    height: 16px;
  }
}
.small {
  width: 36px;
  height: 36px;
  .full {
    width: 34px;
    height: 34px;
  }
  .double {
    width: 36px;
    height: 18px;
  }
  .half1 {
    width: 18px;
    height: 36px;
  }
  .half2 {
    width: 18px;
    height: 18px;
  }
  .nyx {
    width: 12px;
    height: 12px;
  }
}
</style>
