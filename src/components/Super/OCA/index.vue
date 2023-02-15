<template>
  <div class="SuperOCA">
    <el-cascader
      ref="cas"
      v-model="state.v"
      v-bind="$attrs"
      :options="state.options"
      :props="props"
      :placeholder="prop.placeholder"
      filterable
      clearable
      class="wp100"
      @change="change"
    >
      <template #default="{ data }">
        <div class="flexMode vc">
          <i :class="data.icon" :title="data.tips || data.status"></i>
          <span class="pl4">{{ data[prop.label] }}</span>
        </div>
      </template>
    </el-cascader>
  </div>
</template>
<script setup>
// 定义
defineOptions({
  name: 'SuperOCA',
});
// 传参
const prop = defineProps({
  orgId: {
    type: Number,
    default: 0,
  },
  campaignId: {
    type: Number,
    default: 0,
  },
  adgroupId: {
    type: Number,
    default: 0,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: ' ',
  },
  label: {
    type: String,
    default: 'name',
  },
  value: {
    type: String,
    default: 'id',
  },
  // 回显状态字典
  showStatus: {
    type: [String, Array],
    default: 'all',
  },
  // 权限级别，越大越高
  permission: {
    type: [String, Number],
    default: 0,
  },
});
// 数据
const state = reactive({
  v: '',
  options: [],
});
const store = inject('store');
const common = store.common();
const { proxy } = getCurrentInstance();
// 计算属性
const props = computed(() => {
  return {
    label: prop.label,
    value: prop.value,
    multiple: prop.multiple,
    lazy: true,
    lazyLoad: async (node, resolve) => {
      let r = [];
      const f = [];
      if (node.data.orgId) {
        r = await common.getAdgroup(node.data.orgId, node.data.id);
        if (prop.showStatus !== 'all') {
          r.forEach((it) => {
            if (prop.showStatus.indexOf(it.status) > -1) {
              it.leaf = true;
              f.push(it);
            }
          });
        } else {
          f = r;
        }
      } else {
        r = await common.getCampaign(node.data.id);
        if (prop.showStatus !== 'all') {
          r.forEach((it) => {
            const index = prop.showStatus.indexOf(it.status);
            if (index > -1) {
              f.push(it);
            }
          });
        } else {
          f = r;
        }
      }
      resolve(f);
    },
  };
});
const permissionLevel = computed(() => {
  return parseInt(prop.permission);
});
// 监听

// 挂载
onMounted(async () => {
  const options = await common.getCampaignGroup();
  state.options =
    options.filter((it) => it.permission >= permissionLevel.value) || [];
});
// 事件
const emit = defineEmits();
const change = (v) => {
  // console.info(v);
  emit('change', v);
  emit('update:orgId', v[0]);
  emit('update:campaignId', v[1]);
  emit('update:adgroupId', v[2]);
};
const getName = () => {
  const nodes = proxy.$refs.cas.getCheckedNodes()[0].pathNodes;
  const names = [];
  names.push(nodes[0].label);
  names.push(nodes[1].label);
  names.push(nodes[2].label);
  return names;
};
defineExpose({
  getName,
});
// 卸载
</script>
<style lang="scss" scoped></style>
