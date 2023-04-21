<template>
  <div class="SuperLang">
    <el-dropdown
      placement="bottom-end"
      popper-class="w100"
      @command="changeLang"
    >
      <Hover>
        <div class="flexMode hc vc">
          <el-image
            :src="$getImg(`country/${lang}.png`)"
            class="w24 h24 radiusP50 border-white3"
            fit="cover"
          />
          <!-- <span class="point" :class="txtColor">{{lang.toUpperCase()}}</span> -->
        </div>
      </Hover>
      <template #dropdown>
        <el-dropdown-menu>
          <!-- <el-dropdown-item disabled class="cursor-default">
            <span class="txt-dark5">{{ $l('Language') }}</span>
          </el-dropdown-item> -->
          <el-dropdown-item
            v-for="(it, i) in langOptions"
            :key="i"
            :command="it"
            class="fs12"
          >
            <Hover>
              <div class="flexMode vc" :class="lang === it && 'txt-primary'">
                <el-image
                  :src="$getImg(`country/${it}.png`)"
                  class="w16 h16"
                  fit="cover"
                />
                <span class="pl8">{{ langMap[it] }}</span>
              </div>
            </Hover>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup>
defineOptions({
  name: 'SuperLang',
});
// 传参
const prop = defineProps({
  txtColor: {
    type: String,
    default: '',
  },
});
// 数据
const state = reactive({});
const store = inject('store');
const launch = store.launch();
// 计算属性
const langOptions = computed(() => {
  return window.$langs;
});
const lang = computed(() => {
  return launch.lang;
});

// 监听

// 挂载

// 事件
const changeLang = (v) => {
  if (v === lang.value) {
    return;
  }
  launch.saveLang(v);
};

// 卸载

// Maps
const langMap = {
  zh_cn: '中文',
  en_us: 'English',
};
</script>
<style lang="scss" scoped></style>
