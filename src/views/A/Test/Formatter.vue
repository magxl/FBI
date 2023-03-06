<template>
  <div class="Formatter">
    <!-- 格式化Lang -->
    <div class="p16">
      <div class="p10">
        <el-input
          v-model="state.lang"
          clearable
          resize="vertical"
          type="textarea"
          show-word-limit
          placeholder="多行文本"
          @blur="initLang"
        />
      </div>
      <div class="p10">
        <div class="fleMode vc p10">
          <span class="pr10 fs12 txt-dark9">格式化Lang</span>
          <el-button @click="$copy(state.langFormat)"
            >复制</el-button
          >
        </div>
        <div v-html="state.langFormat"></div>
      </div>
    </div>
    <!-- 格式化国家地区数据 -->
    <div class="p16">
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
          <el-button @click="toCopy">复制</el-button>
        </div>
        <div
          v-for="(it, i) in state.result"
          :key="i"
          class="flexMode vc p5 fs12"
        >
          <span class="areaicon" :class="it.icon"></span>
          <span class="pl10 txt-blue">{{ it.addr }}</span>
          <span class="pl10 txt-dark7">{{ it.label }}</span>
          <span class="pl10 txt-dark7">{{ it.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// 格式化数据
import { reactive } from 'vue';

defineOptions({
  name: 'Formatter',
});
// 数据
const state = reactive({
  result: [],
  text: '',
  lang: '',
  langFormat: '',
});

// 计算属性

// 监听

// 挂载
onMounted(() => {
  // initTxt();
  // initCountry();
  // initLang();
  // initCountryLang();
  // initCategory();
});
// 事件
const initCategory = () => {
  const { category } = window.$map;
  const children = {};
  const App = [
    'All',
    'Business',
    'Weather',
    'Tools',
    'Tourism',
    'Sports',
    'Social',
    'Reference',
    'Efficiency',
    'Photography and video',
    'News',
    'Navigation',
    'Music',
    'Life',
    'Health and fitness',
    'Finance',
    'Entertainment',
    'Education',
    'Books',
    'Medical care',
    'Newspapers and magazines',
    'Food and drink',
    'Shopping',
    'Software development tools',
    'Graphics and design',
    'Children',
  ];
  const Game = [
    'All',
    'Action',
    'Adventure',
    'Leisure',
    'Desktop',
    'Card',
    'Casino game',
    'Family gathering',
    'Music',
    'Puzzle solving',
    'Race',
    'Role playing',
    'Simulation',
    'Sports',
    'Strategy',
    'Question and answer',
    'Crossword puzzle',
  ];
  const keys = { App, Game };
  const r = category.map((it) => {
    if (it.children) {
      it.children = it.children.map((ct, c) => {
        ct.label = keys[it.label][c];
        ct.label_en_us = ct.label;
        return ct;
      });
    }
    return it;
  });
  console.info(r);
};
const initTxt = () => {
  const { text } = state;
  const textArr = text.split('\n');
  const icons = [];
  const infos = [];
  const result = {};
  textArr.forEach((it) => {
    if (it.includes('flag')) {
      const icon = it.match(/flag-(\S*)">/)[1];
      result[icon] = { icon: `area-${icon}` };
    }
    if (it.includes('countrylist-caption')) {
      const info = it.match(/(?<=>).+(?=<)/)[0].split(' ');
      const addrlower = info[0].toLowerCase();
      result[addrlower] = {
        addr: info[0],
        name: info[1],
        label: info[2],
        addrlower,
      };
    }
  });
  const keys = Object.keys(result);
  state.result = keys.map((it) => {
    return {
      icon: `area-${it}`,
      ...result[it],
    };
  });
};
const initCountry = () => {
  const { countryAppStore, countryAllMap } = window.$map.country;
  let r = [];
  let no = [];
  countryAppStore.forEach((it) => {
    const has = countryAllMap.filter((ft) => ft.value === it.value)[0];
    if (has) {
      r.push(has);
    } else {
      no.push(it);
    }
  });
  console.info(r);
  console.info(no);
};
const initLang = () => {
  let { lang } = state;
  if (lang) {
    lang = lang.split('\n');
    const r = {};
    lang.forEach((it) => {
      it = it.trim();
      if (it.indexOf(':') > -1) {
        const arr = it.split(':');
        const key = arr[0];
        let value = arr[1].replace(/'/g, '').replace(',', '').trim();
        r[value] = key;
      }
    });
    console.info(r);
    state.langFormat = JSON.stringify(r);
  }
};
const initCountryLang = () => {
  const { countryLang, countryAllMap } = window.$map.country;
  const r = [];
  countryLang.forEach((it) => {
    const has = countryAllMap.filter((ft) => ft.value_lower === it.value)[0];
    if (has) {
      r.push({
        ...has,
        lang: it.lang,
      });
    }
  });
  console.info(r);
};
const toCopy = () => {
  window.$copy(JSON.stringify(state.result));
};
// 卸载
</script>
<style lang="scss" scoped></style>
