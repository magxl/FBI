<template>
  <div class="SuperSign flexMode hc vc flexV">
    <div class="signBox p20">
      <div class="signArea" :style="signAreaStyle">
        <vue-esign ref="esign" v-bind="toptions" />
      </div>
    </div>
    <div class="flexMode hb p10">
      <el-button @click="toCancel">取消</el-button>
      <el-button type="danger" @click="toClear">清空</el-button>
      <el-button type="primary" @click="toSave">保存</el-button>
    </div>
  </div>
</template>
<script setup>
import vueEsign from 'vue-esign';
defineOptions({
  name: 'SuperSign',
  components: { vueEsign },
});
const prop = defineProps({
  options: {
    type: Object,
    default: () => {},
  },
});
import { computed, getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance();
const toptions = computed(() => {
  return {
    width: 440,
    height: 260,
    isCrop: false,
    ...prop.options,
  };
});
const signAreaStyle = computed(() => {
  return {
    width: toptions.width + 'px',
    height: toptions.height + 'px',
  };
});
const emit = defineEmits();
const toSave = () => {
  proxy.$refs.esign
    .generate()
    .then((res) => {
      emit('update:sign', res);
      emit('close');
    })
    .catch((err) => {
      console.info('NO SIGNED');
    });
};
const toClear = () => {
  proxy.$refs.esign.reset();
  emit('update:sign', '');
};
const toCancel = () => {
  emit('close');
};
</script>
<style lang="scss" scoped>
.SuperSign {
  width: 100%;
  height: 100%;
  .signBox {
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 5px,
      $dark1 5px,
      $dark1 10px
    );
    border: 1px $dark1 solid;
  }
  .signArea {
    border: 1px $dark1 solid;
    background-color: #fff;
  }
}
</style>
