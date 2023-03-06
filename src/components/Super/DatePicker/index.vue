<template>
  <div class="SuperDatePicker">
    <el-date-picker
      v-model="state.date"
      class="wp100"
      type="daterange"
      value-format="YYYY-MM-DD"
      :clearable="false"
      :range-separator="prop.separator"
      :shortcuts="state.shortBtn"
      :end-placeholder="placeholder.end"
      :start-placeholder="placeholder.start"
      :disabled-date="disabledDate"
      @change="dateChange"
    />
  </div>
</template>
<script setup>
import { watchEffect } from 'vue';

// 定义
defineOptions({
  name: 'SuperDatePicker',
});
// 传参
const prop = defineProps({
  modelValue: {
    type: [String, Array],
    default: () => [],
  },
  defaultDate: {
    type: Array,
    default: () => [],
  },
  // 返回v-model的类型，obj时格式为{startDate,endDate}
  type: {
    type: String,
    default: 'arr',
    validate: (v) => {
      if (['arr', 'obj', 'str'].indexOf(v) > -1) {
        return true;
      }
    },
  },
  // 开始，结束的分割符号，也是v-model str时的分割符号
  separator: {
    type: String,
    default: '~',
  },
  // 是否不包含今天，默认包含
  notoday: {
    type: Boolean,
    default: false,
  },
  disabledDate: {
    type: [Function, String, Number],
    default: 0,
  },
  // today, yersterday, thisweek, last7days, thismonth, last30days, lastmonth
  shortcuts: {
    type: [Object, Boolean],
    default: false,
  },
});
// 数据
const state = reactive({
  date: [],
  shortBtn: [],
});
const store = inject('store');
const launch = store.launch();
// 挂载
onMounted(() => {
  if (!prop.defaultDate.length) {
    const start = -6 + offsetDay.value;
    const end = offsetDay.value;
    state.date = [
      window.$moment().add(start, 'days').format('YYYY-MM-DD'),
      window.$moment().add(end, 'days').format('YYYY-MM-DD'),
    ];
    dateChange(state.date);
  }
  initShortBtn();
});
// 事件
const emit = defineEmits();
const disabledDate = (t) => {
  if (window.$getType(prop.disabledDate) !== 'Function') {
    const r = +new Date() + offsetDay.value * 86400000;
    return +t > r;
  } else {
    return prop.disabledDate();
  }
};
const dateChange = (v) => {
  let r;
  if (prop.type === 'arr') {
    r = v;
  } else if (prop.tupe === 'obj') {
    r = {
      startDate: v[0],
      endDate: v[1],
    };
  } else {
    r = v[0] + prop.separator + v[1];
  }
  emit('change', r, 'cpt');
  emit('update:modelValue', r);
};
const initShortBtn = () => {
  const { shortcuts } = prop;
  let combineShortcuts = {};
  if (shortcuts === false) {
    state.shortBtn = false;
  } else {
    if (shortcuts === true) {
      combineShortcuts = defaultShortcuts;
    } else {
      combineShortcuts = {
        ...defaultShortcuts,
        ...shortcuts,
      };
    }
    const shortBtn = [];
    if (combineShortcuts.today) {
      shortBtn.push(initToday());
    }
    if (combineShortcuts.yesterday) {
      shortBtn.push(initYesterday());
    }
    if (combineShortcuts.thisweek) {
      shortBtn.push(initThisWeek());
    }
    if (combineShortcuts.last7days) {
      shortBtn.push(initLast7Days());
    }
    if (combineShortcuts.thismonth) {
      shortBtn.push(initThisMonth());
    }
    if (combineShortcuts.last30days) {
      shortBtn.push(initLast30Days());
    }
    if (combineShortcuts.lastmonth) {
      shortBtn.push(initLastMonth());
    }
    state.shortBtn = shortBtn;
  }
};
const initToday = () => {
  const map = {
    zh_cn: '今天',
    en_us: 'Today',
  };
  return {
    text: map[lang.value],
    value: () => {
      const now = window.$moment().format('YYYY-MM-DD');
      return [now, now];
    },
  };
};
const initYesterday = () => {
  const map = {
    zh_cn: '昨天',
    en_us: 'Yesterday',
  };
  return {
    text: map[lang.value],
    value: () => {
      const now = window.$moment().add(-1, 'days').format('YYYY-MM-DD');
      return [now, now];
    },
  };
};
const initThisWeek = () => {
  const map = {
    zh_cn: '本周',
    en_us: 'This Week',
  };
  return {
    text: map[lang.value],
    value: () => {
      const now = window.$moment();
      let day = 0;
      if (prop.notoday) {
        day -= 1;
      }
      return [
        window.$moment().weekday(1).format('YYYY-MM-DD'),
        window.$moment().add(day, 'days').format('YYYY-MM-DD'),
      ];
    },
  };
};
const initLast7Days = () => {
  const map = {
    zh_cn: '最近7天',
    en_us: 'Last 7 Days',
  };
  return {
    text: map[lang.value],
    value: () => {
      let dayS = -6,
        dayE = 0;
      if (prop.notoday) {
        dayS -= 1;
        dayE -= 1;
      }
      return [
        window.$moment().add(dayS, 'days').format('YYYY-MM-DD'),
        window.$moment().add(dayE, 'days').format('YYYY-MM-DD'),
      ];
    },
  };
};
const initThisMonth = () => {
  const map = {
    zh_cn: '本月',
    en_us: 'This Month',
  };
  return {
    text: map[lang.value],
    value: () => {
      let day = 0;
      if (prop.notoday) {
        day -= 1;
      }
      return [
        window.$moment().date(1).format('YYYY-MM-DD'),
        window.$moment().add(day, 'days').format('YYYY-MM-DD'),
      ];
    },
  };
};
const initLast30Days = () => {
  const map = {
    zh_cn: '最近30天',
    en_us: 'Last 30 Days',
  };
  return {
    text: map[lang.value],
    value: () => {
      let dayS = -29,
        dayE = 0;
      if (prop.notoday) {
        dayS -= 1;
        dayE -= 1;
      }
      return [
        window.$moment().add(dayS, 'days').format('YYYY-MM-DD'),
        window.$moment().add(dayE, 'days').format('YYYY-MM-DD'),
      ];
    },
  };
};
const initLastMonth = () => {
  const map = {
    zh_cn: '上月',
    en_us: 'Last Month',
  };
  return {
    text: map[lang.value],
    value: () => {
      let day = -1;
      if (prop.notoday) {
        day -= 1;
      }
      return [
        window.$moment().date(1).add(-1, 'days').date(1).format('YYYY-MM-DD'),
        window.$moment().date(1).add(day, 'days').format('YYYY-MM-DD'),
      ];
    },
  };
};
// 计算属性
const lang = computed(() => {
  return launch.lang;
});
const placeholder = computed(() => {
  return placeholderMap[lang.value];
});
const offsetDay = computed(() => {
  const { notoday, disabledDate } = prop;
  let offset = 0;
  if (window.$getType(disabledDate) !== 'Function') {
    const num = parseInt(disabledDate) || 0;
    offset = num;
    if (notoday && offset > -1) {
      offset = -1;
    }
  }
  return offset;
});
// maps
const placeholderMap = {
  zh_cn: {
    start: '开始时间',
    end: '结束时间',
  },
  en_us: {
    start: 'Start Date',
    end: 'End Date',
  },
};
const defaultShortcuts = {
  today: true,
  yesterday: true,
  thisweek: true,
  last7days: true,
  thismonth: true,
  last30days: true,
  lastmonth: true,
};
// 监听
watch(
  () => prop.defaultDate,
  (n) => {
    if (n.length) {
      state.date = n;
      dateChange(n);
    }
  },
);
// watchEffect(() => {
//   console.info(state.date);
//   if (state.date.length) {
//     return;
//   }
//   state.date = prop.modelValue;
// });
// 卸载
</script>
<style lang="scss" scoped></style>
