<template>
  <div class="AFrameHeaderAccountInfo">
    <div class="p16">
      <el-descriptions border :column="1" width="140px">
        <el-descriptions-item :label="$l('User Name')" width="140px"
          >Name
        </el-descriptions-item>
        <el-descriptions-item :label="$l('Mobile')"
          >15718845548
        </el-descriptions-item>
        <el-descriptions-item :label="$l('Role')"
          >Developer
        </el-descriptions-item>
        <el-descriptions-item :label="$l('Mobile')"
          >15718845548
        </el-descriptions-item>
        <el-descriptions-item :label="$l('Email')"
          >luowenzheng@ann9.com
        </el-descriptions-item>
        <el-descriptions-item :label="$l('Create At')"
          >2022-10-08
        </el-descriptions-item>
      </el-descriptions>
      <div class="p16-0">
        <el-form
          ref="form"
          :rules="state.rules"
          :model="state.form"
          hide-required-asterisk
          label-width="100px"
        >
          <el-form-item :label="$l('Old Password')" prop="oldPassword">
            <el-input
              v-model="state.form.oldPassword"
              clearable
              placeholder=" "
            />
          </el-form-item>
          <el-form-item :label="$l('New Password')" prop="newPassword">
            <el-input
              v-model="state.form.newPassword"
              clearable
              placeholder=" "
            />
          </el-form-item>
          <el-form-item :label="$l('Repassword')" prop="repassword">
            <el-input
              v-model="state.form.repassword"
              clearable
              placeholder=" "
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="flexMode hr">
        <el-button plain type="primary" @click="toSubmit">{{
          $l('Update Password')
        }}</el-button>
      </div>
    </div>
  </div>
</template>
<script setup>
defineOptions({
  name: 'AFrameHeaderAccountInfo',
});
// 数据
const state = reactive({
  form: {},
  rules: {
    oldPassword:[{required: true}],
    newPassword:[{required: true}],
    repassword:[{required: true}],
  },
});

// 计算属性

// 监听

// 挂载

// 事件

// 卸载
</script>
<style lang="scss" scoped></style>
