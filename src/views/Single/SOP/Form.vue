<template>
  <div id="Form" class="SOPForm">
    <div class="formArea absCenter flexMode flexV bg-white7">
      <div class="wp100">
        <div class="titleArea flexMode hb vc bg-white9">
          <div class="title">{{ $l('Submit Your Enquiry') }}</div>
          <i
            class="adicon ad-close fs24 hover-txt-primary"
            @click="toClose"
          ></i>
        </div>
        <el-form
          ref="form"
          :rules="state.rules"
          :model="state.form"
          size="default"
          label-width="148px"
          class="form bg-white1 backdrop"
        >
          <el-form-item :label="$l('Name')" prop="firstname">
            <div class="pb8">
              <el-input
                v-model="state.form.firstname"
                clearable
                :placeholder="$l('First Name')"
              />
            </div>
            <el-input
              v-model="state.form.lastname"
              clearable
              :placeholder="$l('Last Name')"
            />
          </el-form-item>
          <el-form-item :label="$l('Company')" prop="compay">
            <el-input v-model="state.form.compay" clearable placeholder=" " />
          </el-form-item>
          <el-form-item :label="$l('Phone Number')" prop="tel">
            <el-input v-model="state.form.tel" clearable placeholder=" " />
          </el-form-item>
          <el-form-item :label="$l('Country or Regions')" prop="coutry">
            <el-input v-model="state.form.coutry" clearable placeholder=" " />
          </el-form-item>
          <el-form-item :label="$l('Enquiry')" prop="mes">
            <el-input
              v-model="state.form.mes"
              clearable
              :rows="6"
              resize="none"
              type="textarea"
              maxlength="255"
              show-word-limit
              placeholder=" "
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="formFooter wp100 flexMode vc hr bg-white7">
        <el-button size="default" plain @click="toReset">
          {{ $l('RESET') }}
        </el-button>
        <el-button
          :loading="state.loading"
          size="default"
          plain
          type="primary"
          @click="toValidate"
          >{{ $l('SUBMIT') }}</el-button
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import gsap from 'gsap';

// 定义
defineOptions({
  name: 'SOPForm',
});
// 数据
const state = reactive({
  loading: false,
  form: {},
  rules: {
    firstname: [{ required: true }],
    compay: [{ required: true }],
    coutry: [{ required: true }],
    tel: [{ required: true }],
  },
});
const { proxy } = getCurrentInstance();
// 挂载

// 事件
const toClose = () => {
  gsap.to('#Form', { opacity: 0, scale: 0, y: '100vh' });
};
const toReset = () => {
  proxy.$refs.form.resetFields();
  // state.form = {};
};
const toValidate = () => {
  proxy.$refs.form.validate((r) => {
    if (r) {
      toSubmit();
    }
  });
};
const toSubmit = async () => {
  state.loading = true;
  const { code } = await window.$post({
    url: window.$api.single.submit,
    data: state.form,
  });
  proxy.$message.success(window.$l('Submit Success'));
  state.loading = false;

  toClose();
};
// 计算属性

// 监听

// 卸载

// Map
</script>
<style lang="scss" scoped>
.SOPForm {
  position: fixed;
  top: -10vh;
  left: -20vw;
  right: -20vw;
  bottom: -10vh;
  height: 120vh;
  opacity: 0;
  z-index: 99;
  background-color: $dark3;
  transform: translateY(120vh);
  opacity: 0;
  @include backdrop();
  .formArea {
    position: relative;
    width: 480px;
    // height: 640px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 36px 48px $dark3;
    @include backdrop(200%);
    .titleArea {
      padding: 24px;
    }
    .form {
      padding: 24px;
    }
  }
  .formFooter {
    // position: absolute;
    // left: 0;
    // right: 0;
    // bottom: 0;
    padding: 24px;
  }
}
</style>
