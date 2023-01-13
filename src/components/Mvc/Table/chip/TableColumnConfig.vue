<template>
  <div class="drawerBody">
    <div class="relative flexMode vs p10 hp100">
      <!-- fixed left -->
      <div class="relative dragArea wp33 mr5 border-dark3-dashed radius8">
        <div class="flexMode hb vc p10 bg-f5 radius-t8 border-b">
          <span>{{ $l('左固定') }}</span>
          <span class="fs12"
            >{{ leftVisible }} / {{ state.columns.left.length }}</span
          >
        </div>
        <div v-if="state.columns.left.length === 0" class="absCenter fs12">
          {{ $l('没有左固定') }}
        </div>
        <Draggable
          :list="state.columns.left"
          group="columnFilter"
          class="dragBody p5-0"
          @start="onStart"
          @end="onEnd"
        >
          <template #item="{ element: it }">
            <div
              class="flexMode vc p5"
              :class="it.ding ? 'ding' : 'cursor-grab hover-bg-primary1'"
            >
              <div class="flexMode vc">
                <el-switch
                  v-model="it.visible"
                  size="small"
                  :disabled="it.ding"
                  @change="switchChange"
                ></el-switch>
                <span class="pl10 fs14">{{ it.label || it.type }}</span>
              </div>
              <span class="pb5 fs12 txt-primary3">{{ it.tips }}</span>
            </div>
          </template>
        </Draggable>
      </div>
      <!-- ↑ fixed left ↑ -->
      <!-- fixed center -->
      <div class="relative dragArea wp33 m0-5 border-dark3-dashed radius8">
        <div class="flexMode hb vc p10 bg-f5 border-b radius-t8">
          <span>{{ $l('中间部分') }}</span>
          <span class="fs12"
            >{{ centerVisible }} / {{ state.columns.center.length }}</span
          >
        </div>
        <div v-if="state.columns.center.length === 0" class="absCenter fs12">
          {{ $l('没有中间部分') }}
        </div>
        <Draggable
          :list="state.columns.center"
          group="columnFilter"
          class="dragBody p5-0"
          @start="onStart"
          @end="onEnd"
        >
          <template #item="{ element: it }">
            <div
              class="flexMode vc p5"
              :class="it.ding ? 'ding' : 'cursor-grab hover-bg-primary1'"
            >
              <div class="flexMode vc">
                <el-switch
                  v-model="it.visible"
                  size="small"
                  :disabled="it.ding"
                  @change="switchChange"
                ></el-switch>
                <span class="pl10 fs14">{{ it.label || it.type }}</span>
              </div>
              <span class="pb5 fs12 txt-primary3">{{ it.tips }}</span>
            </div>
          </template>
        </Draggable>
      </div>
      <!-- ↑ fixed center ↑ -->
      <!-- fixed right -->
      <div class="relative dragArea wp33 ml5 border-dark3-dashed radius8">
        <div class="flexMode hb vc p10 bg-f5 border-b radius-t8">
          <span>{{ $l('右固定') }}</span>
          <span class="fs12"
            >{{ rightVisible }} / {{ state.columns.right.length }}</span
          >
        </div>
        <div v-if="state.columns.right.length === 0" class="absCenter fs12">
          {{ $l('没有右固定') }}
        </div>
        <Draggable
          :list="state.columns.right"
          group="columnFilter"
          class="dragBody p5-0"
          @start="onStart"
          @end="onEnd"
        >
          <template #item="{ element: it }">
            <div
              class="flexMode vc p5"
              :class="it.ding ? 'ding' : 'cursor-grab hover-bg-primary1'"
            >
              <div class="flexMode vc">
                <el-switch
                  v-model="it.visible"
                  size="small"
                  :disabled="it.ding"
                  @change="switchChange"
                ></el-switch>
                <span class="pl10 fs14">{{ it.label || it.type }}</span>
              </div>
              <span class="pb5 fs12 txt-primary3">{{ it.tips }}</span>
            </div>
          </template>
        </Draggable>
      </div>
      <!-- ↑ fixed right ↑ -->
    </div>
  </div>
  <!-- ↑ body ↑ -->
  <div class="drawerFooter">
    <el-button @click="toReset" :loading="reseting" round>{{
      $l('重置')
    }}</el-button>
    <el-button @click="toSubmit" :loading="submiting" round type="primary">{{
      $l('提交')
    }}</el-button>
  </div>
</template>
<script setup>
import Draggable from 'vuedraggable';
defineOptions({
  name: 'TableColumnConfig',
  components: { Draggable },
});
// 传参
const prop = defineProps({
  params: {
    type: Object,
    default: () => {},
  },
});
const { proxy } = getCurrentInstance();
import { reactive } from 'vue';
// 数据
const state = reactive({
  submiting: false,
  reseting: false,
  columns: {
    left: [],
    center: [],
    right: [],
  },
  mounted: false,
});
// 计算属性
const leftVisible = computed(() => {
  return state.columns.left.filter((it) => it.visible).length;
});
const centerVisible = computed(() => {
  return state.columns.center.filter((it) => it.visible).length;
});
const rightVisible = computed(() => {
  return state.columns.right.filter((it) => it.visible).length;
});
const columnName = computed(() => {
  return prop.params.tableName + '_Column';
});
// 监听
// 初始
const init = () => {
  const localColumns = JSON.parse(localStorage.getItem(columnName.value));
  const columns = {
    left: [],
    center: [],
    right: [],
  };
  localColumns.forEach((it) => {
    if (it.fixed) {
      columns[it.fixed].push(it);
    } else {
      columns.center.push(it);
    }
  });
  state.columns = columns;
  state.mounted = true;
};
init();
// 挂载
onMounted(() => {
  document.body.ondrop = function (event) {
    console.info('拖拽锁定');
    event.preventDefault();
    event.stopPropagation();
  };
});
// 事件
const emit = defineEmits();
const createColumn = ({ left, center, right }) => {
  const rl = left.map((it, i) => {
    it.sort = i;
    it.fixed = 'left';
    return it;
  });
  const rc = center.map((it, i) => {
    it.sort = 100 + i;
    delete it.fixed;
    return it;
  });
  const rr = right.map((it, i) => {
    it.sort = 1000 + i;
    it.fixed = 'right';
    return it;
  });
  const column = [...left, ...center, ...right];
  const filterColumn = {
    left: rl,
    center: rc,
    right: rr,
  };
  return {
    column,
    filterColumn,
  };
};
const toReset = () => {
  state.reseting = true;
  localStorage.removeItem(columnName.value);
  emit('filterSubmit');
  getLocalColumn();
  state.reseting = false;
  emit('closeDrawer');
};
const toSubmit = () => {
  state.submiting = true;
  const { column } = createColumn(state.columns);
  localStorage.setItem(columnName.value, JSON.stringify(column));
  emit('filterSubmit');
  state.submiting = false;
  emit('closeDrawer');
};
const getLocalColumn = () => {
  proxy.$setTimeout(() => {
    if (!localStorage.getItem(columnName.value)) {
      getLocalColumn();
    } else {
      init();
      state.loading = false;
    }
  }, 500);
};

const onStart = (e) => {
  // e.preventDefault();
  // e.stopPropagation();
  // e.dataTransfer = e.originalEvent.dataTransfer;
};
const onEnd = (e) => {
  // e.preventDefault();
  // e.stopPropagation();
  // e.dataTransfer = e.originalEvent.dataTransfer;
};
// 卸载
</script>
<style lang="scss" scoped></style>
