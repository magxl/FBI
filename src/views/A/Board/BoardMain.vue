<template>
  <Page class="BoardMain">
    \
  </Page>
</template>
<script setup>
defineOptions({
  name: 'BoardMain',
});
// 数据
const state = reactive({});
const { proxy } = getCurrentInstance();
onMounted(() => {
  const options = Array.from(proxy.$el.querySelectorAll('dd'));
  let v = options.map((it) => {
    return {
      label: it.innerText,
      value: Number(it.getAttribute('lay-value')),
    };
  });
  console.info(v);
});
// 计算属性

// 监听

// 挂载

// 事件

// 卸载
</script>
<style lang="scss" scoped></style>
