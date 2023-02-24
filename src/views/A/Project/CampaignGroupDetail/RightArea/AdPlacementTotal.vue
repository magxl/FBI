<template>
  <div class="AdPlacementTotal">
    <el-scrollbar class="relative z9">
      <div class="flexMode p8 pb16">
        <div class="doubleArea w200 mr8 noShrink">
          <div
            class="relative h100 bg-littleBlue radius8 mb8 hover-box-shadow-dark1 border-white7"
          >
            <span class="p8 fs12 txt-dark5">{{ $l('Total') }}</span>
            <span class="absCenter fs20">{{ currency }}{{ state.total }}</span>
            <div class="flexMode vc abs r b p8 fs12">
              <span class="pr4 txt-dark5">{{ $l('DOD') }}:</span>
              <span class="txt-green">10.22%</span>
              <span class="txt-green">
                <i class="adicon ad-up"></i>
              </span>
            </div>
          </div>
          <div
            class="relative h100 bg-primary radius8 hover-box-shadow-dark1 border-white7"
          >
            <div class="flexMode vc p8 fs12 txt-white7">
              <div class="wp50 pr8">
                {{ $l('WOW') }}
              </div>
              <div class="wp50 pl8 txt-r">{{ $l('MOM') }}</div>
            </div>
            <div
              class="absCenter hp100 ml2 border-l-white1 border-r-dark1"
            ></div>
            <div class="absCenter fs20">
              <span class="txt-littleGreen">10.22%</span>
              <span class="txt-green">
                <i class="adicon ad-up"></i>
              </span>
              <span class="p0-8 txt-primary1">|</span>
              <span class="txt-littleRed">10.22%</span>
              <span class="txt-red">
                <i class="adicon ad-down"></i>
              </span>
            </div>
          </div>
        </div>
        <!-- left double statistics column-->
        <Card
          v-for="(it, i) in state.statistics"
          :key="i"
          class="w200 mr8 noShrink"
          :color="colors[i]"
          noshadow
          @click="toDetailShow(it, i)"
        >
          <template #header>
            <span class="fs14">{{ it.label }}</span>
            <span class="p2-8 bg-white3 radius2 fs12 hover-bg-white5">x14</span>
          </template>
          <div
            class="sArea relative flexMode hc h160 p16"
            :class="state.active === i && `active${colors[i]}`"
          >
            <el-progress
              :percentage="it.percent"
              type="circle"
              color="#fff"
              class="dark"
            >
              <template #default="{ percentage }">
                <div class="fs20 txt-white">{{ percentage }}%</div>
                <div class="fs12 pt8 txt-white7">
                  {{ currency }}{{ it.valueFormat }}
                </div>
              </template>
            </el-progress>
          </div>
        </Card>
        <!-- placement -->
        <!-- negative suggest -->
        <Card noshadow border="border-gray3" class="w400 noShrink">
          <template #header>
            <span>{{ $l('Negative') }}</span>
          </template>
          <div class="negativeArea relative flexMode hl vl flexWrap h160">
            <template v-if="state.negative.length">
              <div
                v-for="(it, i) in state.negative"
                :key="it.id"
                class="negativeItem mr2 mb2 radius2 border-gray3 hover-box-shadow-dark1"
              >
                <div class="p4 fs12">{{ it.name }}</div>
                <div class="negativeBtnArea flexMode hr vc pr8">
                  <div
                    class="mgbtn circle16"
                    :title="$l('Add to Negative')"
                    @click="toAddNegative(it, i)"
                  >
                    <i class="adicon ad-plus-circle fs14 txt-primary"></i>
                  </div>
                  <div
                    class="mgbtn circle16 red"
                    :title="$l('Do not show again')"
                    @click="toDelSuggestNegative(it, i)"
                  >
                    <i class="adicon ad-minus-circle fs14 txt-red"></i>
                  </div>
                </div>
              </div>
            </template>
            <!-- negative item -->
            <Nodata v-else size="48" class="absCenter" />
          </div>
        </Card>
        <div class="w8 hp100">&nbsp;</div>
      </div>
    </el-scrollbar>
    <div
      class="overShow relative p0-8 transition3"
      :class="colors[state.active] || ''"
    >
      <div class="showArea"></div>
    </div>
  </div>
</template>
<script setup>
// 定义
defineOptions({
  name: 'AdPlacementTotal',
});
// 传参
const prop = defineProps({
  info: {
    type: Object,
    default: () => {},
  },
  scrollTop: {
    type: Number,
    default: 0,
  },
  pageOffset: {
    type: Number,
    default: 0,
  },
});
// 数据
const state = reactive({
  statistics: {
    today: (window.$rn(99999999, 100) / 100).toFixed(2),
    tab: (window.$rn(99999999, 100) / 100).toFixed(2),
    searchResult: (window.$rn(99999999, 100) / 100).toFixed(2),
    productPage: (window.$rn(99999999, 100) / 100).toFixed(2),
  },
  total: 0,
  percent: {},
  active: '',
  negative: [], //
});
const { proxy } = getCurrentInstance();
// 挂载
onMounted(() => {
  initStatistics();
  initNegative();
});
// 事件
const emit = defineEmits();
const initStatistics = () => {
  const names = ['Today', 'Tab', 'Search Result', 'Product Page'];
  const r = names.map((it) => {
    return {
      label: it,
      value: Number((window.$rn(99999999, 100) / 100).toFixed(2)),
    };
  });
  const total = r.reduce(
    (a, b) => {
      return {
        value: a.value + b.value,
      };
    },
    { value: 0 },
  ).value;
  state.total = window.$fa(total, 2);
  state.statistics = r.map((it) => {
    it.percent = ((it.value / total) * 100).toFixed(2);
    it.valueFormat = window.$fa(it.value, 2);
    return it;
  });
  loaded();
};
const loaded = () => {
  nextTick(() => {
    emit('loaded');
  });
};
const getOffsetTop = () => {
  let { top } = el.value.getBoundingClientRect();
  top = top + prop.scrollTop - prop.pageOffset;
  console.info('Ad Placement', top);
  emit('update:modelValue', top);
};
const initNegative = () => {
  state.negative = window.$fd(9, (i) => {
    return {
      id: window.$rn(88888888, 11111111),
      name: 'Negative ' + i,
    };
  });
};
const toAddNegative = (it, i) => {
  console.info('ad');
  proxy.$message.success({
    grouping: true,
    message: window.$l('Add Negative Success'),
  });
  state.negative.splice(i, 1);
};
const toDelSuggestNegative = (it, i) => {
  state.negative.splice(i, 1);
};
const toDetailShow = (it, i) => {
  if (state.active === i) {
    state.active = '';
  } else {
    state.active = i;
  }
};
// 计算属性
const currency = computed(() => {
  return prop.info?.currency || '';
});
const el = computed(() => {
  return proxy.$el;
});
// map
const colors = ['red', 'green', 'orange', 'purple'];
// 监听

// 卸载

defineExpose({
  el,
  getOffsetTop,
});
</script>
<style lang="scss" scoped>
.overShow {
  transform: translateY(-100px);
  z-index: -1;
  opacity: 0;
  .showArea {
    height: 0px;
    border-radius: 8px;
    background-color: $dark1;
    transition: $trans3;
  }
  &.red {
    transform: translateY(0px);
    z-index: 2;
    opacity: 1;
    padding-bottom: 8px;
    .showArea {
      height: 200px;
      background-color: $red1;
    }
  }
  &.green {
    transform: translateY(0px);
    z-index: 2;
    opacity: 1;
    padding-bottom: 8px;
    .showArea {
      height: 200px;
      background-color: $green1;
    }
  }
  &.orange {
    transform: translateY(0px);
    z-index: 2;
    opacity: 1;
    padding-bottom: 8px;
    .showArea {
      height: 200px;
      background-color: $orange1;
    }
  }
  &.purple {
    transform: translateY(0px);
    z-index: 2;
    opacity: 1;
    padding-bottom: 8px;
    .showArea {
      height: 200px;
      background-color: $purple1;
    }
  }
}
.sArea {
  cursor: default;
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -10px;
    transform: rotateZ(45deg) translate(-50%, 0);
    border: 8px solid transparent;
    transition: $trans3;
  }
  &.activered {
    &::after {
      transform: rotateZ(45deg) translate(calc(-50% + 3px), 3px);
      border-color: $red;
    }
  }
  &.activegreen {
    &::after {
      transform: rotateZ(45deg) translate(calc(-50% + 3px), 3px);
      border-color: $green;
    }
  }
  &.activeorange {
    &::after {
      transform: rotateZ(45deg) translate(calc(-50% + 3px), 3px);
      border-color: $orange;
    }
  }
  &.activepurple {
    &::after {
      transform: rotateZ(45deg) translate(calc(-50% + 3px), 3px);
      border-color: $purple;
    }
  }
}
.negativeArea {
  padding: 8px 6px 8px 8px;
  .negativeItem {
    width: 126px;
    height: 47px;
    .negativeBtnArea {
      display: none !important;
    }
    &:hover {
      .negativeBtnArea {
        display: flex !important;
      }
    }
  }
}
</style>
