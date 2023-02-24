<template>
  <DrawerArea
    class="UserCreate"
    noscroll
    :submiting="state.submiting"
    @submit="toSubmit"
  >
    <div class="p16">
      <el-form
        ref="form"
        :rules="state.rules"
        :model="state.form"
        label-width="100px"
        size="normal"
      >
        <el-form-item :label="$l('User Name')" prop="name">
          <el-input
            v-model="state.form.name"
            clearable
            placeholder=" "
            maxlength="20"
            show-word-limit
          />
        </el-form-item>
        <el-form-item :label="$l('Mobile')" prop="mobile">
          <el-input
            v-model="state.form.mobile"
            clearable
            placeholder=" "
            maxlength="11"
            show-word-limit
          />
        </el-form-item>
        <el-form-item :label="$l('Email')" prop="email">
          <el-input v-model="state.form.email" clearable placeholder=" " />
        </el-form-item>
        <el-form-item :label="$l('Role')" prop="role">
          <el-radio-group v-model="state.form.role">
            <el-radio v-for="(it, i) in roleMap" :key="i" :label="it.id">
              <span>{{ it.name }}</span>
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$l('Password')" prop="password">
          <el-input
            v-model="state.form.password"
            clearable
            :placeholder="`Default: ${state.defaultpPassword}`"
          >
            <template #prepend>
              <el-button plain @click="toCopy">
                <template #icon>
                  <i class="adicon ad-copy"></i>
                </template>
              </el-button>
            </template>
            <template #append>
              <el-button plain type="primary" @click="toGeneratePassword"
                >Generate</el-button
              >
            </template>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
  </DrawerArea>
</template>
<script setup>
// 定义
defineOptions({
  name: 'UserCreate',
});
// 数据
const state = reactive({
  submiting: false,
  form: {},
  rules: {
    name: [{ required: true }],
    mobile: [{ required: true }],
    email: [{ required: true }],
    role: [{ required: true }],
  },
  defaultpPassword: 'yingyongleida',
});
const store = inject('store');
const common = store.common();
// 挂载

// 事件
const toSubmit = () => {
  state.submiting = true;
};
const toGeneratePassword = () => {
  const CHARCODE_A_LC = 97;
  const lowerCaseArr = new Array(26)
    .fill(null)
    .map((v, i) => String.fromCharCode(CHARCODE_A_LC + i));
  const CHARCODE_A_UC = 65;
  const upperCaseArr = new Array(26)
    .fill(null)
    .map((v, i) => String.fromCharCode(CHARCODE_A_UC + i));
  const numberArr = new Array(10).fill(null).map((v, i) => i);
  // total
  const total = 16;
  const lowerTotal = window.$rn(total / 2, 2);
  const upperTotal = window.$rn(total / 2, 2);
  const numberTotal = total - lowerTotal - upperTotal;
  // generate
  const lowerWord = window
    .$fd(lowerTotal, (i) => lowerCaseArr[window.$rn(26)])
    .join('');
  const upperWord = window
    .$fd(upperTotal, (i) => upperCaseArr[window.$rn(26)])
    .join('');
  const numberWord = window
    .$fd(numberTotal, (i) => numberArr[window.$rn(10)])
    .join('');
  const allWord = [...lowerWord, ...upperWord, ...numberWord];
  const arr = [];
  const len = allWord.length;
  for (let i = 0; i < len; i++) {
    const index = window.$rn(allWord.length);
    arr.push(allWord[index]);
    allWord.splice(index, 1);
  }
  state.form.password = arr.join('');
};
const toCopy = () => {
  if (state.form.password) {
    window.$copy(state.form.password, true);
  } else {
    window.$copy(state.defaultpPassword, true);
  }
};
// 计算属性
const roleMap = computed(() => {
  return common.roleMap;
});
// 监听

// 卸载
</script>
<style lang="scss" scoped></style>
