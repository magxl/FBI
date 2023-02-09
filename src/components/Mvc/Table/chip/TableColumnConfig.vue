<template>
  <DrawerArea noscroll>
    <div class="relative flexMode vs p10 hp100">
      <!-- fixed left -->
      <div class="relative dragArea wp33 mr5 border-dark3-dashed radius8 hover-box-shadow-dark1">
        <div class="flexMode hb vc h40 p10 bg-f5 radius-t8 border-b">
          <span class="fs14">{{ $l('Fixed Left') }}</span>
          <div v-if="leftVisible">
            <span class="fs12 txt-primary">{{ leftVisible }}</span>
            <span class="fs12 txt-dark5"> / {{ state.total }}</span>
          </div>
        </div>
        <div v-if="state.columns.left.length === 0" class="absCenter fs12">
          {{ $l('No Fixed Left') }}
        </div>
        <el-scrollbar :style="scrollStyle">
          <Draggable
            :list="state.columns.left"
            group="columnFilter"
            class="dragBody p5-0"
            @start="onStart"
            @end="onEnd"
          >
            <template #item="{ element: it, index }">
              <div
                class="dragItem flexMode vc p5"
                :class="it.ding ? 'ding' : 'cursor-grab hover-bg-primary1'"
              >
                <div class="flexMode vc flexGrow">
                  <el-switch
                    v-model="it.visible"
                    size="small"
                    :disabled="it.ding"
                    @change="switchChange"
                  ></el-switch>
                  <span class="pl10 fs14">{{ it.label || it.type }}</span>
                </div>
                <span class="pb5 fs12 txt-primary3">{{ it.tips }}</span>
                <div
                  class="arrowRight mgbtn circle24"
                  @click.stop="leftToCenter(it, index)"
                >
                  <i class="adicon ad-arrow-right"></i>
                </div>
              </div>
            </template>
          </Draggable>
        </el-scrollbar>
      </div>
      <!-- ↑ fixed left ↑ -->
      <!-- fixed center -->
      <div class="relative dragArea wp33 m0-5 border-dark3-dashed radius8 hover-box-shadow-dark1">
        <div class="flexMode hb vc h40 p10 bg-f5 border-b radius-t8">
          <span class="fs14">{{ $l('Center') }}</span>
          <div v-if="centerVisible">
            <span class="fs12 txt-primary">{{ centerVisible }}</span>
            <span class="fs12 txt-dark5"> / {{ state.total }}</span>
          </div>
        </div>
        <div v-if="state.columns.center.length === 0" class="absCenter fs12">
          {{ $l('No Center') }}
        </div>
        <el-scrollbar :style="scrollStyle">
          <Draggable
            :list="state.columns.center"
            group="columnFilter"
            class="dragBody p5-0"
            @start="onStart"
            @end="onEnd"
          >
            <template #item="{ element: it, index }">
              <div
                class="dragItem flexMode vc p5"
                :class="it.ding ? 'ding' : 'cursor-grab hover-bg-primary1'"
              >
                <div
                  class="arrowLeft mgbtn ml4 mr8 circle24 rotate180"
                  @click.stop="toAddLeft(it, index)"
                >
                  <i class="adicon ad-arrow-right"></i>
                </div>
                <div class="dragCenter flexMode vc flexGrow">
                  <el-switch
                    v-model="it.visible"
                    size="small"
                    :disabled="it.ding"
                    @change="switchChange"
                  ></el-switch>
                  <span class="pl10 fs14">{{ it.label || it.type }}</span>
                </div>
                <span class="pb5 fs12 txt-primary3">{{ it.tips }}</span>
                <div
                  class="arrowRight mgbtn circle24"
                  @click.stop="toAddRight(it, index)"
                >
                  <i class="adicon ad-arrow-right"></i>
                </div>
              </div>
            </template>
          </Draggable>
        </el-scrollbar>
      </div>
      <!-- ↑ fixed center ↑ -->
      <!-- fixed right -->
      <div class="relative dragArea wp33 ml5 border-dark3-dashed radius8 hover-box-shadow-dark1">
        <div class="flexMode hb vc h40 p10 bg-f5 border-b radius-t8">
          <span class="fs14">{{ $l('Fixed Right') }}</span>
          <div v-if="rightVisible">
            <span class="fs12 txt-primary">{{ rightVisible }}</span>
            <span class="fs12 txt-dark5"> / {{ state.total }}</span>
          </div>
        </div>
        <div v-if="state.columns.right.length === 0" class="absCenter fs12">
          {{ $l('No Fixed Right') }}
        </div>
        <el-scrollbar :style="scrollStyle">
          <Draggable
            :list="state.columns.right"
            group="columnFilter"
            class="dragBody p5-0"
            @start="onStart"
            @end="onEnd"
          >
            <template #item="{ element: it, index }">
              <div
                class="dragItem flexMode vc p5"
                :class="it.ding ? 'ding' : 'cursor-grab hover-bg-primary1'"
              >
                <div
                  class="arrowLeft mgbtn m0-4 circle24 rotate180"
                  @click.stop="rightToCenter(it, index)"
                >
                  <i class="adicon ad-arrow-right"></i>
                </div>
                <div class="dragCenter flexMode vc flexGrow">
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
        </el-scrollbar>
      </div>
      <!-- ↑ fixed right ↑ -->
    </div>
    <template #footer>
      <el-button @click="toReset" size="small" :loading="reseting" round>
        {{ $l('Reset') }}
      </el-button>
      <el-button
        @click="toSubmit"
        size="small"
        :loading="submiting"
        round
        type="primary"
      >
        {{ $l('Submit') }}
      </el-button>
    </template>
  </DrawerArea>
  <!-- ↑ body ↑ -->
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
// 数据
const state = reactive({
  submiting: false,
  reseting: false,
  columns: {
    left: [],
    center: [],
    right: [],
  },
  total: 0,
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
const scrollStyle = computed(() => {
  return {
    height: `calc(100% - 40px)`,
  };
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
  state.total = localColumns.length;
};
// 挂载
onMounted(() => {
  init();
  document.body.ondrop = function (event) {
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
const toAddLeft = (it, i) => {
  state.columns.left.push(it);
  state.columns.center.splice(i, 1);
};
const toAddRight = (it, i) => {
  state.columns.right.push(it);
  state.columns.center.splice(i, 1);
};
const leftToCenter = (it, i) => {
  console.info(it, i);
  state.columns.center.push(it);
  state.columns.left.splice(i, 1);
};
const rightToCenter = (it, i) => {
  state.columns.center.push(it);
  state.columns.right.splice(i, 1);
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
<style lang="scss" scoped>
.dragBody {
  height: 100%;
}
.dragItem {
  .arrowLeft,
  .arrowRight {
    opacity: 0;
  }
  .dragCenter {
    transition: $trans1;
    transform: translateX(-30px);
  }
  &:hover {
    .arrowLeft,
    .arrowRight {
      opacity: 1;
    }
    .dragCenter {
      transform: translateX(0px);
    }
  }
}
</style>
