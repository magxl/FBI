<template>
  <div class="ChartDetailAppMain">
    <div class="p16">
      <div class="flexMode vc hb pb16">
        <div class="fs14">
          <span>{{ $l('Video') }}</span>
          <span class="p0-2 txt-dark3">|</span>
          <span>{{ $l('Image') }}</span>
        </div>
        <div>
          <el-radio-group v-model="state.model" size="small">
            <el-radio-button
              v-for="(it, i) in modelMap"
              :key="i"
              :label="it.value"
            >
              <span>{{ it.label }}({{ galleryLength[it.value] }})</span>
            </el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="pb16">
        <el-scrollbar height="160">
          <div class="relative flexMode h160">
            <template v-if="galleryLength[state.model]">
              <div
                v-for="(it, i) in gallery[state.model]"
                :key="i"
                class="galleryItem radius8 mr8 noShrink"
                :class="['bg-' + it.color, state.model]"
              ></div>
            </template>
            <div v-else class="absCenter">
              <Nodata size="48" />
            </div>
          </div>
        </el-scrollbar>
      </div>
      <!-- ↑ gallery ↑ -->
      <div class="pb16">
        <div class="fs14 pb16">{{ $l('Description') }}</div>
        <div v-html="prop.info.description"></div>
      </div>
      <!-- ↑ description ↑ -->
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue';
defineOptions({
  name: 'ChartDetailAppMain',
});
// 传参
const prop = defineProps({
  info: {
    type: Object,
    default: () => {},
  },
});
// 数据
const state = reactive({
  model: 'iPhone',
});

// 计算属性
const modelMap = computed(() => {
  return [
    {
      label: 'iPhone',
      value: 'iPhone',
    },
    {
      label: 'iPad',
      value: 'iPad',
    },
  ];
});
const gallery = computed(() => {
  return {
    iPhone: prop.info.iPhoneGallery || [],
    iPad: prop.info.iPadGallery || [],
  };
});
const galleryLength = computed(() => {
  return {
    iPhone: gallery.value.iPhone.length,
    iPad: gallery.value.iPad.length,
  };
});
// 监听

// 挂载

// 事件

// 卸载
</script>
<style lang="scss" scoped>
.galleryItem {
  &.iPhone {
    width: 100px;
    height: 160px;
  }
  &.iPad {
    width: 240px;
    height: 160px;
  }
}
</style>
