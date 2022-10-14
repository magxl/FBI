<template>
  <Page class="FakeData">
    <div class="p10">
      <el-button
        v-for="it in state.typeOptions"
        :key="it.value"
        @click="state.options.active = it.value"
        :type="state.options.active === it.value && 'primary'"
      >
        {{ it.label }}
      </el-button>
    </div>
    <div class="p10 flexMode vc">
      <div class="pr5 fs14 txt-dark5">数量</div>
      <div class="w160 pr10">
        <el-input-number
          v-model="state.options.total"
          :min="0"
          :max="2000"
          controls-position="right"
          placeholder="数量"
          class="wp100"
        />
      </div>
      <div class="pr5 fs14 txt-dark5">最大值</div>
      <div class="w160 pr10">
        <el-input-number
          v-model="state.options.max"
          :min="0"
          controls-position="right"
          placeholder="最大值"
          class="wp100"
        />
      </div>
      <div class="pr5 fs14 txt-dark5">最小值</div>
      <div class="w160 pr10">
        <el-input-number
          v-model="state.options.min"
          :min="0"
          controls-position="right"
          placeholder="最小值"
          class="wp100"
        />
      </div>
      <el-button @click='fakeData'>刷新</el-button>
    </div>
    <div class="p10">
      <el-button @click="toCopy">复制数据</el-button>
    </div>
    <div class="wp100 p10 fs14 txt-dark7 txt-wrap">
      {{ state.list }}
    </div>
  </Page>
</template>
<script setup>
defineOptions({
  name: 'FakeData',
});
// 数据
const state = reactive({
  options: {
    total: 20,
    max: 100,
    min: 0,
    active: '',
  },
  list: '',
  typeOptions: [
    {
      label: '随机数据',
      value: 'random',
    },
    {
      label: '序列数据',
      value: 'index',
    },
  ],
});

// 计算属性

// 挂载
onMounted(() => {
  state.options.active = state.typeOptions[0].value;
});
// 事件
const fakeData = () => {
  let list = [];
  const { active, total, max, min } = state.options;
  if (active === 'random') {
    list = window.$fakeData(total, (i) => {
      return window.$randomNumber(max, min);
    });
  } else if (active === 'index') {
    for (let i = min; i <= max; i++) {
      list.push(i);
    }
  }
  state.list = list.join(',');
};
const toCopy = () => {
  window.$copy(state.list);
};
// 监听
watch(
  () => state.options,
  (n) => {
    if (n) {
      fakeData();
    }
  },
  {
    immediate: true,
    deep: true,
  },
);
// 卸载
</script>
<style lang="scss" scoped></style>
