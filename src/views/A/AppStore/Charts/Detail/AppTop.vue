<template>
  <div class="ChartDetailAppTop">
    <div class="flexMode vs hb border-b p16">
      <div class="flexMode">
        <div class="w64 h64 radius8 bg-primary5"></div>
        <div class="pl16">
          <div class="pb8">{{ prop.info.title }}</div>
          <div class="fs12 txt-dark3">{{ prop.info.subTitle }}</div>
          <div class="fs12 txt-dark7">{{ prop.info.developer }}</div>
        </div>
      </div>
      <!-- ↑ icon header ↑ -->
      <div class="flexMode">
        <Country
          v-model="state.country"
          type="diy"
          size="small"
          :options="countryOptions"
        />
        <!-- <div class="pl10">
          <el-radio-group v-model="prop.type" size="small">
            <el-radio
              v-for="(it, i) in typeMap"
              :key="i"
              :label="it.value"
            >
              <span>{{ it.label }}</span>
            </el-radio>
          </el-radio-group>
        </div> -->
      </div>
    </div>
    <!--  -->
    <div class="flexMode vs p8 border-b fs12">
      <div class="p8 border-r">
        <div class="flexMode h24 txt-dark3">
          <span>APP ID</span>
          <div class="flexMode vc pl16 hover-a" @click="$copy(prop.info.appid, true)">
            <i class="adicon ad-copy fs14"></i>
            <span class="">Copy</span>
          </div>
        </div>
        <div class="flexMode vc h24">
          {{ prop.info.appid }}
        </div>
      </div>
      <div class="p8 border-r">
        <div class="h24 txt-dark3">{{ $l('Category') }}</div>
        <div class="flexMode vc h24">
          {{ prop.info.category }}
        </div>
      </div>
      <div class="p8 border-r">
        <div class="h24 txt-dark3">{{ $l('Price') }}</div>
        <div
          class="flexMode vc h24"
          :class="prop.info.price ? 'txt-orange' : 'txt-green'"
        >
          {{ prop.info.price }}
        </div>
      </div>
      <div class="p8 border-r">
        <div class="h24 txt-dark3">
          <span class="txt-dark7 pr8">{{ prop.info.scores }}</span>
          <span>{{ $l('评分') }}</span>
        </div>
        <div class="flexMode vc h24">
          <el-rate
            :model-value="prop.info.rate"
            size="small"
            disabled
          ></el-rate>
          <span class="fs12 txt-dark5">{{ prop.info.rate }}</span>
        </div>
      </div>
      <div class="p8 border-r">
        <div class="h24 txt-dark3">{{ $l('Purchase') }}</div>
        <div class="flexMode vc h24">
          {{ prop.info.purchase }}
        </div>
      </div>
      <div class="p8 border-r">
        <div
          class="h24"
          :class="prop.info.rankingName === 'Free' ? 'txt-green' : 'txt-orange'"
        >
          {{ $l(prop.info.rankingName) }}
        </div>
        <div class="flexMode vc h24">
          {{ prop.info.ranking }}
        </div>
      </div>
      <div class="p8 border-r">
        <div class="h24 txt-dark3">{{ $l('Refresh Date') }}</div>
        <div class="flexMode vc h24">
          {{ prop.info.refreshDate }}
        </div>
      </div>
      <div class="p8 border-r">
        <div class="h24 txt-dark3">{{ $l('Release Date') }}</div>
        <div class="flexMode vc h24">
          {{ prop.info.releaseDate }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue';
defineOptions({
  name: 'ChartDetailAppTop',
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
  country: '',
});

// 计算属性
const countryOptions = computed(() => {
  const { countryAllMap } = window.$map.country;
  const r = [];
  prop.info.country.split(',').forEach((it) => {
    const has = countryAllMap.filter((ft) => ft.value === it)[0];
    if (has) {
      r.push(has);
    }
  });
  return r;
});
// 监听

// 挂载
onMounted(() => {
  const countryInfo = countryOptions.value[0];
  countryInfo && (state.country = countryInfo.value);
});
// 事件

// 卸载
</script>
<style lang="scss" scoped></style>
