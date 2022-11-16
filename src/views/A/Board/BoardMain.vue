<template>
  <Page class="BoardMain">
    <option value="7001">Game-Action</option>
                                <option value="7002">Game-Adventure</option>
                                <option value="7003">Game-Casual</option>
                                <option value="7004">Game-Board</option>
                                <option value="7005">Game-Card</option>
                                <option value="7006">Game-Casino</option>
                                <option value="7009">Game-Family</option>
                                <option value="7011">Game-Music</option>
                                <option value="7012">Game-Puzzle</option>
                                <option value="7013">Game-Racing</option>
                                <option value="7014">Game-Role Playing</option>
                                <option value="7015">Game-Simulation</option>
                                <option value="7016">Game-Sports</option>
                                <option value="7017">Game-Strategy</option>
                                <option value="7018">Game-Trivia</option>
                                <option value="7019">Game-Word</option>
                                <option value="6000">BUSINESS</option>
                                <option value="6001">THE WEATHER</option>
                                <option value="6002">TOOL</option>
                                <option value="6003">TOURISM</option>
                                <option value="6004">PHYSICAL EDUCATION</option>
                                <option value="6005">SOCIAL</option>
                                <option value="6006">REFERENCE</option>
                                <option value="6007">EFFECTIVENESS</option>
                                <option value="6008">PHOTOGRAPHY AND VIDEO</option>
                                <option value="6009">NEWS</option>
                                <option value="6010">NAVIGATION</option>
                                <option value="6011">MUSIC</option>
                                <option value="6012">LIFE</option>
                                <option value="6013">HEALTHY BODYBUILDING</option>
                                <option value="6015">FINANCE</option>
                                <option value="6016">ENTERTAINMENT</option>
                                <option value="6017">EDUCATION</option>
                                <option value="6018">BOOKS</option>
                                <option value="6020">MEDICAL</option>
                                <option value="6021">NEWSPAPERS AND MAGAZINES</option>
                                <option value="6023">GOOD FOOD</option>
                                <option value="6024">SHOPPING</option>
                                <option value="6061">CHILD</option>
                                <option value="6014">All-Games</option>
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
  const options = Array.from(proxy.$el.querySelectorAll('option'));
  let v = options.map((it) => {
    return {
      label: it.innerText,
      value: Number(it.getAttribute('value')),
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
