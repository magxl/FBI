<template>
  <div class="PasteBoard Page">
    <div ref="pasteHistory" class="pasteHistory">
      <div class="searchArea flexMode hc vc h48 p0-10 bg-white7 backdrop">
        <el-input
          v-model="state.search"
          size="mini"
          clearable
          placeholder="单行文本"
        />
      </div>
      <div class="hp100">
        <el-scrollbar class="hp100">
          <div class="scrollArea">
            <div v-for="(it, i) in state.list" :key="i" class="historyArea">
              <div
                class="header flexMode hb vc h36 p10"
                :class="`${it.txt} ${it.bg} ${it.hover}`"
              >
                <span>{{ it.i }}</span>
                <span v-if="i < 9" class="txt-dark3 fs12"
                  >COMMAND+{{ i + 1 }}</span
                >
              </div>
              <div class="p10 bg-white5 txt-dark5">PASTE CONTENT HERE</div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>
<script setup>
defineOptions({
  name: 'PasteBoard',
});
import { reactive, getCurrentInstance, onMounted } from 'vue';
const { proxy } = getCurrentInstance();
onMounted(() => {
  state.pasteHistory = proxy.$refs.pasteHistory;
});
const state = reactive({ pasteHistory: {}, search: '', list: [] });

const list = window.$fakeData(20, (i) => {
  return {
    i,
    bg: `bg-` + window.$randomColor({ alpha: 1 }),
    hover: `hover-bg-` + window.$randomColor({ alpha: 3 }),
    txt: `txt-` + window.$randomColor({ alpha: 5 }),
  };
});
state.list = list;
</script>
<style lang="scss" scoped>
.PasteBoard {
  background-image: linear-gradient(to top, $orange, $blue5);
  .pasteHistory {
    height: 100%;
    width: 240px;
    background-color: $white7;
    @include backdrop();
    border-radius: 0 12px 12px 0;
    box-shadow: 10px 0 10px $dark1, 0 0 2px #fff inset;
    overflow: hidden;
  }
  .searchArea {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }
  .scrollArea {
    padding-top: 48px;
    .historyArea {
      margin: 8px 12px 8px 0;
      background-color: $blue1;
      border-radius: 0 4px 4px 0;
      overflow: hidden;
    }
  }
}
</style>
