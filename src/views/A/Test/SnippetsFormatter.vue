<template>
  <Page class="SnippetsFormatter">
    <el-input
      v-model="state.origin"
      size="small"
      clearable
      :rows="4"
      resize="vertical"
      type="textarea"
      show-word-limit
      placeholder="多行文本"
    />

    <div class="p10">
      <div class="fleMode vc p10">
        <span class="pr10 fs12 txt-dark9">Snippets 格式化</span>
        <el-radio-group v-model="state.mode" size="small">
          <el-radio v-for="(it, i) in radioOptions" :key="i" :label="it.value">
            <span>{{ it.label }}</span>
          </el-radio>
        </el-radio-group>
        <el-button @click="toCopy">复制</el-button>
      </div>
      <div class="p10 h300 yscroll">
        <div v-for="(it, i) in state.text" :key="i">
          {{ it }}
        </div>
      </div>
    </div>
  </Page>
</template>
<script setup>
defineOptions({
  name: 'SnippetsFormatter',
});
// 数据
const state = reactive({
  origin: '',
  text: '',
  mode: 'js',
});
const radioOptions = [
  {
    label: 'js',
    value: 'js',
  },
  {
    label: 'html',
    value: 'html',
  },
];

watch(
  () => state.origin,
  (n) => {
    if (n) {
      formatSnippets(n);
    }
  },
);
// 计算属性

// 监听

// 挂载

// 事件
const formatSnippets = (v) => {
  if (state.mode === 'js') {
    state.text = v.split('\n').map((it) => {
      it = it.replace(/\"/g, "'");
      it = it.replace(/\$/g,"$$$");
      return `"${it}",`;
    });
  } else if (state.mode === 'html') {
    state.text = v.split('\n').map((it) => {
      it = it.replace(/\"/g, "\\\"");
      return `"${it}",`;
    });
  }
};

const toCopy = () => {
  window.$copy(state.text.join('\n'));
};
// 卸载
</script>
<style lang="scss" scoped></style>
