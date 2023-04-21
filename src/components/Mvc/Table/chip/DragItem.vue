<template>
  <div class="dragItem" :class="[prop.it.ding && 'ding', prop.type]">
    <div
      class="itemArea flexMode vc p5 cursor-grab hover-bg-primary1"
      :class="state.editMode && 'edit'"
    >
      <div class="arrowLeft mgbtn ml4 mr8 circle24 rotate180" @click.stop="toAddLeft">
        <i class="adicon ad-arrow-right"></i>
      </div>
      <div class="dragCenter flexMode vc flexGrow">
        <el-switch v-model="prop.it.visible" :disabled="prop.it.ding"></el-switch>
        <span class="pl10 fs14">{{ prop.it.label || prop.it.type }}</span>
      </div>
      <span class="pb5 fs12 txt-primary3">{{ prop.it.tips }}</span>
      <div class="arrowRight mgbtn circle24" @click.stop="toAddRight">
        <i class="adicon ad-arrow-right"></i>
      </div>
      <div
        v-if="prop.it.prop && !state.editMode"
        class="editIcon mgbtn circle24 blue"
        @click.stop="toEdit"
      >
        <i class="adicon ad-edit"></i>
      </div>
    </div>
    <div v-if="state.editMode" class="editArea bg-gray1 hover-box-shadow-primary1">
      <div class="flexMode vc hb p4">
        <span class="fs12 txt-dark7">{{ $l('Align') }}</span>
        <el-select v-model="state.form.align" :placeholder="placeholder" class="w120">
          <el-option
            v-for="(it, i) in alignOptions"
            :key="i"
            :label="it[`label_${lang}`]"
            :value="it.value"
          />
        </el-select>
      </div>
      <div class="flexMode vc hb p4">
        <span class="fs12 txt-dark7">{{ $l('Width') }}</span>
        <el-input-number v-model="state.form.width" :min="48" step="8" />
      </div>
      <div class="flexMode vc hb p4">
        <span class="fs12 txt-dark7">{{ $l('Sortable') }}</span>
        <el-switch v-model="state.form.sortable" />
      </div>
      <div class="flexMode vc hb p4">
        <span class="fs12 txt-dark7">{{ $l('Show Overflow Tooltip') }}</span>
        <el-switch v-model="state.form['show-overflow-tooltip']" />
      </div>
      <div class="flexMode hr pt8 p4 mt8 border-t-dark1-dashed">
        <el-button plain circle @click="close">
          <template #icon>
            <i class="adicon ad-close"></i>
          </template>
        </el-button>
        <el-button plain circle type="primary" @click="change">
          <template #icon>
            <i class="adicon ad-select"></i>
          </template>
        </el-button>
      </div>
    </div>
  </div>
</template>
<script setup>
// 定义
defineOptions({
  name: 'TableColumnFilterDragItem',
});
// 传参
const prop = defineProps({
  it: {
    type: Object,
    default: Object.create(null),
  },
  index: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    default: 'center',
  },
  lang: {
    type: String,
    default: 'en_us',
  },
});
// 数据
const state = reactive({
  editMode: false,
  form: {},
});

// 挂载

// 事件
const emit = defineEmits();
const toAddLeft = () => {
  emit('add-left', prop);
};
const toAddRight = () => {
  emit('add-right', prop);
};
const toEdit = () => {
  state.editMode = true;
  state.form = { ...prop.it };
};
const close = () => {
  state.editMode = false;
  state.form = {};
};
const change = () => {
  emit('change', { it: state.form, index: prop.index, type: prop.type });
};
// 计算属性
const placeholder = computed(() => {
  return state.form.align ? ' ' : alignOptions[0][`label_${prop.lang}`];
});
// 监听

// 卸载

// Map
const alignOptions = [
  {
    label_en_us: 'Left',
    label_zh_cn: '左对齐',
    value: 'left',
  },
  {
    label_en_us: 'Center',
    label_zh_cn: '居中对齐',
    value: 'center',
  },
  {
    label_en_us: 'Right',
    label_zh_cn: '右对齐',
    value: 'right',
  },
];
</script>
<style lang="scss" scoped>
.dragItem {
  .arrowLeft,
  .arrowRight,
  .editIcon {
    opacity: 0;
  }
  .dragCenter {
    transition: $trans1;
    transform: translateX(-30px);
  }
  .itemArea {
    &.edit {
      background-color: $primary3 !important;
    }
    &:hover {
      .arrowLeft,
      .arrowRight,
      .editIcon {
        opacity: 1;
      }
      .dragCenter {
        transform: translateX(0px);
      }
    }
  }
  &.left {
    .arrowLeft {
      display: none;
    }
    .dragCenter {
      transform: none;
    }
  }
  &.right {
    .arrowRight {
      display: none;
    }
  }
}
.editArea {
  padding: 4px 8px;
  border-top: 1px $dark1 dashed;
  border-bottom: 1px $dark1 dashed;
}
</style>
