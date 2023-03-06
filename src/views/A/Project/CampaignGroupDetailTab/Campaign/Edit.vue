<template>
  <DrawerArea class="DetailTabCampaignEdit">
    <div v-loading="state.loading" class="p16">
      <el-form
        ref="form"
        :rules="state.rules"
        :model="state.form"
        label-width="120px"
      >
        <el-form-item :label="$l('Name')" prop="name">
          <el-input
            v-model="state.form.name"
            clearable
            placeholder=" "
            maxlength="200"
            show-word-limit
          />
        </el-form-item>
        <el-form-item :label="$l('Daily Cap')" prop="dailyCap">
          <el-input-number
            v-model="state.form.dailyCap"
            :min="0"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item :label="$l('Budget')" prop="budget">
          <el-input-number
            v-model="state.form.budget"
            :min="0"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item :label="$l('Country or Region')" prop="country">
          <Country
            v-model="state.form.country"
            multiple
            default-first-option
            class="wp100"
          />
        </el-form-item>
      </el-form>
    </div>
  </DrawerArea>
</template>
<script setup>
// 定义
defineOptions({
  name: 'DetailTabCampaignEdit',
});
// 传参
const prop = defineProps({
  params: {
    type: Object,
    default: () => {},
  },
});
// 数据
const state = reactive({
  loading: true,
  rules: {},
  form: {},
});

// 挂载
onMounted(() => {
  getData();
});
// 事件
const getData = async () => {
  const { id } = prop.params.row;
  if (id) {
    state.loading = true;
    window.$promise(() => {
      state.form = {
        name: 'Name ' + id,
        dailyCap: window.$rn(100000, 100).toFixed(2),
        budget: window.$rn(100000, 100).toFixed(2),
      };
      state.loading = false;
    });
  }
};
// 计算属性

// 监听

// 卸载

// Map
</script>
<style lang="scss" scoped></style>
