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
  modelValue: {
    type: Array,
    default: () => [],
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  adgroupId: {
    type: [Array, Number],
    default: 0
  },
  checkStrictly: {
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
  v: [],
  options: [],
  mounted: false,
});
const store = inject('store');
const common = store.common();
const { proxy } = getCurrentInstance();

// 挂载
onMounted(async () => {
  state.mounted = true;
  const options = await common.getCampaignGroup();
  state.options =
    options.filter((it) => it.permission >= permissionLevel.value) || [];
});
// 事件
const emit = defineEmits();
const change = (v) => {
  emit('update:modelValue', v);
  // emitValue(v[0], 'org');
  // emitValue(v[1], 'campaign');
  // emitValue(v[2], 'adgroup');
};
const emitValue = (v, type) => {
  let id;
  if (window.$getType(v) === 'Array') {
    id = v.join(',');
  } else {
    id = v;
  }
  emit(`update:${type}Id`, id);
};
const getName = () => {
  const nodes = proxy.$refs.cas.getCheckedNodes();
  const names = {
    org: {},
    campaign: {},
    adgroup: {},
  };
  const nameMap = {
    1: 'org',
    2: 'campaign',
    3: 'adgroup',
  };
  nodes.forEach((it) => {
    names[nameMap[it.level]][it.value] = it.label;
  });
  return names;
};

// 计算属性

const props = computed(() => {
  return {
    label: prop.label,
    value: prop.value,
    multiple: prop.multiple,
    checkStrictly: prop.checkStrictly,
    lazy: true,
    lazyLoad: async (node, resolve) => {
      let r = [];
      let f = [];
      if (node.data.orgId) {
        r = await common.getAdGroup(node.data.orgId, node.data.id);
        if (prop.showStatus !== 'all') {
          const showStatus = prop.showStatus.map((it) => it.toLowerCase());
          r.filter((ft) => {
            if (showStatus.includes(ft.status.toLowerCase())) {
              ft.leaf = true;
              f.push(ft);
            }
          });
        } else {
          f = r.map((it) => {
            it.leaf = true;
            return it;
          });
        }
      } else {
        console.info('getCampaign');
        r = await common.getCampaign(node.data.id);
        if (prop.showStatus !== 'all') {
          const showStatus = prop.showStatus.map((it) => it.toLowerCase());
          r.filter((ft) => {
            if (showStatus.includes(ft.status.toLowerCase())) {
              f.push(ft)
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
watch(
  () => prop.modelValue,
  (n) => {
    state.v = JSON.parse(JSON.stringify(prop.modelValue)) || []
  },
  {
    immediate: true,
  },
);
defineExpose({
  getName,
});
// 卸载
</script>
<style lang="scss" scoped></style>
