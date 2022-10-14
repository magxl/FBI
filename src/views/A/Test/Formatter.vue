<template>
  <div class="Formatter">
    <div class="p10">
      <el-input
        v-model="state.text"
        clearable
        resize="vertical"
        type="textarea"
        show-word-limit
        placeholder="多行文本"
        @change="initTxt"
      />
    </div>
    <div class="p10">
      <div class="fleMode vc p10">
        <span class="pr10 fs12 txt-dark9">格式化国家地区数据</span>
        <el-button size='small' @click='toCopy'>复制</el-button>
      </div>
      <div v-for="(it, i) in state.result" :key="i" class="flexMode vc p5 fs12">
        <span class="areaicon" :class="it.icon" />
        <span class="pl10 txt-blue">{{ it.addr }}</span>
        <span class="pl10 txt-dark7">{{ it.label }}</span>
        <span class="pl10 txt-dark7">{{ it.name }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
// 格式化国家地区数据

defineOptions({
  name: 'Formatter',
});
import { reactive } from 'vue';
// 数据
const state = reactive({
  result: [],
  text: `<li class="countrylist-item">
            <a href="#" sf="143537" cc="ug" class="block">
              <figure class="flag flag-ug"></figure>
              <span class="countrylist-caption block-link">UG 乌干达 Uganda</span>
            </a>
          </li>
          <li class="countrylist-item">
            <a href="#" sf="143581" cc="td" class="block">
              <figure class="flag flag-td"></figure>
              <span class="countrylist-caption block-link">TD 乍得 Chad</span>
            </a>
          </li>`,
});

// 计算属性

// 监听

// 挂载
onMounted(() => {
  initTxt();
});
// 事件
const initTxt = () => {
  const { text } = state;
  const textArr = text.split('\n');
  const icons = [];
  const infos = [];
  const result = {};
  textArr.forEach((it) => {
    if (it.includes('flag')) {
      const icon = it.match(/flag-(\S*)">/)[1];
      result[icon] = {icon:`area-${icon}`};
    }
    if (it.includes('countrylist-caption')) {
      const info = it.match(/(?<=>).+(?=<)/)[0].split(' ');
      const addrlower = info[0].toLowerCase();
      result[addrlower] = {
        addr: info[0],
        name: info[1],
        label: info[2],
        addrlower,
      }
    }
  });
  const keys = Object.keys(result);
  state.result = keys.map(it=>{
    return {
      icon: `area-${it}`,
      ...result[it],
    }
  });
};

const toCopy = ()=>{
  window.$copy(JSON.stringify(state.result))
}
// 卸载
</script>
<style lang="scss" scoped></style>
