<template>
  <DrawerArea
    :submiting="state.submiting"
    class="RouterCreate"
    @submit="toValidate"
  >
    <div class="p16">
      <el-form
        ref="form"
        :rules="state.rules"
        :model="state.form"
        label-width="100px"
        size="normal"
      >
        <el-form-item :label="$l('Parent')" prop="parent">
          <el-tree-select
            v-model="state.form.parent"
            :data="routes"
            check-strictly
            render-after-expand
            :prop="{ value: 'name' }"
          >
            <template #default="{ data: { meta } }">
              <div class="flexMode vc">
                <i class="adicon" :class="meta.icon"></i>
                <span class="pl8">{{ meta.label }}</span>
              </div>
            </template>
          </el-tree-select>
        </el-form-item>
        <el-form-item :label="$l('Name')" prop="name">
          <el-input
            v-model="state.form.name"
            clearable
            placeholder=" "
            maxlength="20"
            show-word-limit
          />
        </el-form-item>
        <el-form-item :label="$l('Path')" prop="path">
          <el-input v-model="state.form.path" clearable placeholder=" " />
        </el-form-item>
        <el-form-item :label="$l('Component')" prop="component">
          <el-input v-model="state.form.component" clearable placeholder=" " />
        </el-form-item>
        <el-form-item :label="$l('Hide')" prop="hide">
          <el-switch v-model="state.form.hide" />
        </el-form-item>
        <el-form-item :label="$l('Valid')" prop="valid">
          <el-switch v-model="state.form.valid" />
        </el-form-item>
        <div class="border-dark1-dashed radius8 mb16">
          <div class="p8 pl20 border-b bg-littleGray">Meta</div>
          <div class="p8 pl20">
            <el-form
              ref="form"
              :rules="state.rulesMeta"
              :model="state.formMeta"
              label-width="120px"
            >
              <el-form-item :label="$l('Label')" prop="label">
                <el-input
                  v-model="state.formMeta.label"
                  clearable
                  placeholder=" "
                />
              </el-form-item>
              <el-form-item :label="$l('Label_EN_US')" prop="label_en_us">
                <el-input
                  v-model="state.formMeta.label_en_us"
                  clearable
                  placeholder=" "
                />
              </el-form-item>
              <el-form-item :label="$l('Label_ZH_CN')" prop="label_zh_cn">
                <el-input
                  v-model="state.formMeta.label_zh_cn"
                  clearable
                  placeholder=" "
                />
              </el-form-item>
              <el-form-item :label="$l('Icon')" prop="icon">
                <el-input
                  v-model="state.formMeta.icon"
                  clearable
                  placeholder=" "
                />
              </el-form-item>
              <el-form-item :label="$l('Sort')" prop="sort">
                <el-input-number
                  v-model="state.formMeta.sort"
                  :placeholder="$l('Default: 0')"
                />
              </el-form-item>
            </el-form>
          </div>
        </div>
        <!-- meta -->
        <!-- tips -->
        <div class="border-dark1-dashed radius8">
          <div class="p8 pl20 bg-littleGray">Tips</div>
          <div
            v-for="(it, i) in state.formTips.list"
            :key="i"
            class="relative p8 pl20 border-t"
          >
            <el-form-item :label="$l('Title')" prop="title" size="small">
              <el-input
                v-model="it.title"
                clearable
                placeholder=" "
                maxlength="10"
                show-limit-word
              />
            </el-form-item>
            <el-form-item :label="$l('Content')" prop="content" size="small">
              <el-input
                v-model="it.content"
                clearable
                :rows="4"
                resize="vertical"
                type="textarea"
                show-word-limit
                placeholder=" "
              />
            </el-form-item>
            <div class="flexMode hr vc p8">
              <div v-if="i === 0" class="mgbtn circle24" @click="toAddTips">
                <i class="adicon ad-plus-circle txt-primary fs24"></i>
              </div>
              <div
                v-if="state.formTips.list.length > 1"
                class="mgbtn circle24 red ml8"
                @click="toDelTips(i)"
              >
                <i class="adicon ad-minus-circle txt-red fs24"></i>
              </div>
            </div>
          </div>
        </div>
      </el-form>
    </div>
  </DrawerArea>
</template>
<script setup>
// 定义
defineOptions({
  name: 'RouterCreate',
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
  submiting: false,
  form: {
    parent: 'root',
    valid: true,
    hide: false,
  },
  rules: {
    name: [{ required: true }],
    path: [{ required: true }],
    component: [{ required: true }],
  },
  formMeta: {},
  rulesMeta: {
    label: [{ required: true }],
    label_en_us: [{ required: true }],
    label_zh_cn: [{ required: true }],
  },
  formTips: {
    list: [{ title: '', content: '' }],
  },
  rulesTips: {},
});
const { proxy } = getCurrentInstance();

// 挂载
onMounted(() => {
  if (prop.params.info) {
    console.info(prop.params.info);
    const info = JSON.parse(JSON.stringify(prop.params.info));
    state.formMeta = info.meta;
    if (info.meta.tips) {
      state.formTips.list = info.meta.tips;
      delete info.meta.tips;
    }
    state.formMeta = info.meta;
    delete info.meta;
    state.form = { ...state.form, ...info, parent: prop.params.parent };
  }
});
// 事件
const toValidate = () => {};
const toSubmit = () => {};
const toDelTips = (i) => {
  state.formTips.list.splice(i, 1);
};
const toAddTips = () => {
  const lastTips = state.formTips.list[0];
  if (lastTips.title && lastTips.content) {
    state.formTips.list.unshift({ title: '', content: '' });
  } else {
    proxy.$message.warning({
      grouping: true,
      message: $l('Please Fill The Present Tip.'),
    });
  }
};
// 计算属性
const routes = computed(() => {
  return window.routes;
});
// 监听

// 卸载
</script>
<style lang="scss" scoped></style>
