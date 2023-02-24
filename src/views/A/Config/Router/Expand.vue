<template>
  <div class="RouterExpand p8">
    <el-table
      :data="prop.list"
      default-expand-all
      class="border-dark1 hover-box-shadow-dark1"
    >
      <el-table-column type="expand">
        <template #default="{ row }">
          <RouterExpand
            v-if="row.children"
            :parent="row.name"
            :list="row.children"
            v-bind="$attrs"
          />
          <div
            v-else
            class="flexMode vc h48 txt-dark3"
            style="padding-left: 56px"
          >
            <i class="adicon ad-plus-circle"></i>
            <span class="pl8">NONE</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$l('Name')"
        prop="name"
        width="100"
      ></el-table-column>
      <el-table-column
        :label="$l('Path')"
        prop="path"
        width="100"
      ></el-table-column>
      <el-table-column
        :label="$l('Component')"
        prop="component"
        width="200"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column :label="$l('Meta')" prop="meta">
        <template #default="{ row }">
          <div class="flexMode">
            <i class="adicon" :class="row.meta.icon"></i>
            <span class="pl4">{{ row.meta[`label_${lang}`] }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$l('Operation')">
        <template #default="{ row }">
          <div class="flexMode vc">
            <div class="mgbtn circle24" @click="toCreate(row)">
              <i class="adicon ad-plus1"></i>
            </div>
            <div class="mgbtn circle24" @click="toPermission(row)">
              <i class="adicon ad-manage-author"></i>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
// 定义
defineOptions({
  name: 'RouterExpand',
});
// 传参
const prop = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
  parent: {
    type: String,
    default: 'root',
  },
});
// 数据
const state = reactive({});
const store = inject('store');
const launch = store.launch();
// 挂载

// 事件
const emit = defineEmits();
const toCreate = (info) => {
  emit('create', { info, parent: prop.parent });
};
const toPermission = (info) => {
  emit('permission', { info });
};
// 计算属性
const lang = computed(() => {
  return launch.lang;
});
// 监听

// 卸载
</script>
<style lang="scss" scoped></style>
