<template>
  <div class="Edit Page flexMode vs">
    <div class="formArea ml10 p20-10 flexGrow bg-white5 radius4 radius">
      <el-form
        ref="form"
        :rules="state.rules"
        :model="state.form"
        label-width="100px"
      >
        <div class="border-blue1 pt20 pr10 mb10 radius4 hover-bg-white7">
          <div class="pl10 pb20 fs14 txt-dark5">Banner信息</div>
          <el-form-item label="企业名称" prop="">
            <el-input
              v-model="state.form.companyName"
              maxlength="24"
              clearable
            />
          </el-form-item>
          <el-form-item label="一级标题" prop="">
            <el-input
              v-model="state.form.banner.title"
              maxlength="42"
              clearable
            />
          </el-form-item>
          <el-form-item label="二级标题" prop="">
            <el-input
              v-model="state.form.banner.subTitle"
              maxlength="100"
              clearable
            />
          </el-form-item>
        </div>
        <div class="border-blue1 pt20 pr10 radius4 hover-bg-white7">
          <div class="pl10 pb20 fs14 txt-dark5">联系方式</div>
          <el-form-item
            v-for="(it, i) in state.form.contact"
            :key="i"
            :label="it.label"
            prop=""
          >
            <el-input v-model="it.value" maxlength="12" clearable />
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import Body from './Body.vue';
defineOptions({
  name: 'Edit',
  components: { Body },
});
const prop = defineProps({
  dt: {
    type: Object,
    default: () => {},
  },
});
import { reactive } from 'vue';
const state = reactive({
  form: {},
  rules: {},
});
state.form = JSON.parse(JSON.stringify(prop.dt));
</script>
<style lang="scss" scoped></style>
