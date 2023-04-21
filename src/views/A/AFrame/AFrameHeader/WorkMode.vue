<template>
  <DrawerArea :loading="state.loading" loading-type="loading" nofooter>
    <div class="AFrameHeaderWorkMode">
      <div class="partArea">
        <div class="pb16">{{ $l('Favorite') }}</div>
        <div class="flexMode flexWrap">
          <div
            v-for="(it, i) in state.favorite"
            :key="it.id"
            class="workItem relative flexMode wp33 p8 radius4 hover-box-shadow-dark1"
          >
            <div class="toolArea">
              <i class="adicon ad-remove hover-txt-red" @click="toRemove(it, i)"></i>
            </div>
            <div class="iconArea noShrink">
              <i class="adicon ad-home fs24 txt-dark5"></i>
            </div>
            <div class="pl8 flexGrow">
              <div class="fs12 txt-dark9">{{ it.name }}</div>
              <div class="fs12 txt-dark5">Intro the Work Item</div>
              <div class="flexMode hr">
                <div class="inline-block p2-4 radius4 bg-gray3 txt-dark3 fs10">{{ it.count }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="partArea">
        <div class="pb16">{{ $l('Work Item') }}</div>
        <div class="flexMode flexWrap">
          <div
            v-for="(it, i) in state.items"
            :key="it.id"
            class="workItem relative flexMode wp25 p8 radius4 hover-box-shadow-dark1"
          >
            <div class="toolArea">
              <i class="adicon ad-plus-circle hover-txt-green" @click="toAdd(it, i)"></i>
            </div>
            <div class="iconArea noShrink">
              <i class="adicon ad-home fs24 txt-dark5"></i>
            </div>
            <div class="pl8 flexGrow">
              <div class="fs12 txt-dark9">{{ it.name }}</div>
              <div class="fs12 txt-dark5">Intro the Work Item</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DrawerArea>
</template>
<script setup>
// 定义
defineOptions({
  name: 'AFrameHeaderWorkMode',
});
// 数据
const state = reactive({
  favorite: [],
  items: [],
});

// 挂载
onMounted(() => {
  init();
});
// 事件
const init = async () => {
  state.loading = true;
  const list = [];
  await window.$promise(() => {
    window.$fd(40, (i) => {
      const id = window.$rn(88888, 11111);
      list.push({
        id,
        name: `name${id}`,
        favorite: Boolean(window.$rn(2)),
        count: window.$rn(1000),
      });
    });
  });
  const favorite = [];
  const items = [];
  list.forEach((it) => {
    if (it.favorite) {
      favorite.push(it);
    } else {
      items.push(it);
    }
  });
  state.favorite = favorite;
  state.items = items;
  state.loading = false;
};
const toAdd = (it, i) => {};
const toRemove = (it, i) => {};
// 计算属性

// 监听

// 卸载

// Map
</script>
<style lang="scss" scoped>
.toolArea {
  display: none;
  position: absolute;
  right: 4px;
  top: 8px;
}
.workItem {
  &:hover {
    .toolArea {
      display: flex;
    }
  }
}
</style>
