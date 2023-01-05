<template>
  <div class="SuperLang">
    <el-dropdown placement="bottom-end" @command="changeLang">
      <Hover>
        <div class="flexMode hc vc">
          <span class="relative areaicon point" :class="`area-${lang}`" />
          <!-- <span class="point" :class="txtColor">{{lang.toUpperCase()}}</span> -->
        </div>
      </Hover>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item disabled class="cursor-default">
            <span class="txt-dark5">{{ $l('语言') }}</span>
          </el-dropdown-item>
          <el-dropdown-item
            v-for="(it, i) in langOptions"
            :key="i"
            :command="it"
            class="fs12"
            :class="lang === it && 'txt-blue'"
            :divided="i === 0"
          >
            <Hover>
              <div class="flexMode vc">
                <span class="relative areaicon" :class="`area-${it}`" />
                <span class="pl10">{{ it }}</span>
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
  txtColor:{
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
  launch.saveLang(v);
};

// 卸载
</script>
<style lang="scss" scoped></style>
