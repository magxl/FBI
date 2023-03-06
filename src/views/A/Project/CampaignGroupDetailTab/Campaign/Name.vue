<template>
  <div class="TabCampaignName">
    <div v-if="state.edit" class="flexMode vc">
      <el-input
        ref="input"
        v-model="state.v"
        clearable
        :placeholder="placeholder"
        class="round"
      />
      <div class="pl2">
        <el-button :loading="state.loading" plain circle @click="toSubmit">
          <template #icon>
            <i class="adicon ad-select"></i>
          </template>
        </el-button>
      </div>
      <div class="pl2">
        <el-button plain circle @click="toCancel">
          <template #icon>
            <i class="adicon ad-close"></i>
          </template>
        </el-button>
      </div>
    </div>
    <div v-else class="p0-8 txt-nowrap hover-edit-txt" @click="toEdit">
      {{ placeholder }}
    </div>
  </div>
</template>
<script setup>
// 定义
defineOptions({
  name: 'TabCampaignName',
});
// 传参
const prop = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  row: {
    type: Object,
    default: () => {},
  },
});
// 数据
const state = reactive({
  loading: false,
  edit: false,
  v: '',
});
const { proxy } = getCurrentInstance();
// 挂载
onMounted(() => {});
// 事件
const emit = defineEmits();
const toEdit = () => {
  state.edit = true;
  nextTick(() => {
    proxy.$refs.input.focus();
  });
};
const toSubmit = async () => {
  if (state.v) {
    state.loading = true;
    await new Promise((resolve) => {
      setTimeout(() => {
        proxy.$message.success('Update Success');
        state.loading = false;
        emit('update:modelValue', state.v);
        resolve();
      }, window.$rn(3000, 300));
    });
  }
  toCancel();
};
const toCancel = () => {
  state.edit = false;
};
// 计算属性
const placeholder = computed(() => {
  return prop.modelValue;
});
// 监听
// watchEffect(() => {
//   if (state.v) {
//     return;
//   }
//   state.v = prop.modelValue;
// });
// 卸载

// Map
</script>
<style lang="scss" scoped></style>
