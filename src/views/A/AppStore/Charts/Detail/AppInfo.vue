<template>
  <div class="ChartDetailAppInfo">
    <div class="p16 border-b">
      <div class="fs14 pb16">{{ $l('App Info') }}</div>
      <div class="fs12">
        <div class="flexMode pb8">
          <div class="w120 txt-dark5 noShrink">{{$l('Developer')}}</div>
          <div>{{prop.info.developer}}</div>
        </div>
        <div class="flexMode pb8">
          <div class="w120 txt-dark5 noShrink">{{$l('Seller')}}</div>
          <div>{{prop.info.seller}}</div>
        </div>
        <div class="flexMode pb8">
          <div class="w120 txt-dark5 noShrink">{{$l('Release Date')}}</div>
          <div>{{prop.info.releaseDate}}</div>
        </div>
        <div class="flexMode pb8">
          <div class="w120 txt-dark5 noShrink">{{$l('Refresh Date')}}</div>
          <div>{{prop.info.refreshDate}}</div>
        </div>
        <div class="flexMode pb8">
          <div class="w120 txt-dark5 noShrink">Bundle ID</div>
          <div>{{prop.info.bundleId}}</div>
        </div>
        <div class="flexMode pb8">
          <div class="w120 txt-dark5 noShrink">{{$l('Version')}}</div>
          <div>{{prop.info.version}}</div>
        </div>
        <div class="flexMode pb8">
          <div class="w120 txt-dark5 noShrink">{{$l('File Size')}}</div>
          <div>{{prop.info.fileSize}}MB</div>
        </div>
        <div class="flexMode pb8">
          <div class="w120 txt-dark5 noShrink">{{$l('Watch Support')}}</div>
          <div>{{prop.info.watchSupport}}</div>
        </div>
        <div class="flexMode pb8">
          <div class="w120 txt-dark5 noShrink">{{$l('Family Sharing')}}</div>
          <div>{{prop.info.familySharing}}</div>
        </div>
        <div class="flexMode pb8">
          <div class="w120 txt-dark5 noShrink">{{$l('Price')}}</div>
          <div>{{prop.info.price}}</div>
        </div>
        <div class="flexMode pb8">
          <div class="w120 txt-dark5 noShrink">{{$l('Category')}}</div>
          <div>{{prop.info.category}}</div>
        </div>
        <div class="flexMode pb8">
          <div class="w120 txt-dark5 noShrink">{{$l('Compatibility')}}</div>
          <div>
            <div v-for='(it,i) in prop.info.compatibility' :key='i'>
              <span class="pr8">{{it.Term}}</span>
              <span>{{it.Definition}}</span>
            </div>
          </div>
        </div>
        <div class="flexMode pb8">
          <div class="w120 txt-dark5 noShrink">{{$l('Language')}}</div>
          <div>{{prop.info.language}}</div>
        </div>
        <div class="flexMode pb8">
          <div class="w120 txt-dark5 noShrink">{{$l('Issuing Region')}}</div>
          <div>{{prop.info.issueRegion}}</div>
        </div>
        <div class="flexMode pb8">
          <div class="w120 txt-dark5 noShrink">{{$l('Age')}}</div>
          <div>{{prop.info.age}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue';
defineOptions({
  name: 'ChartDetailAppInfo',
});
// 传参
const prop = defineProps({
  info: {
    type: Object,
    default: () => {},
  },
});
// 数据
const state = reactive({});

// 计算属性

// 监听

// 挂载

// 事件

// 卸载
</script>
<style lang="scss" scoped></style>
