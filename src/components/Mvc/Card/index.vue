<template>
  <div class="MvcCard" :class="mainClass">
    <div v-if="slots.header || prop.title" class="cardHeader">
      <div v-if="prop.title" class="txt-blob">{{ $l(prop.title) }}</div>
      <slot v-else name="header" />
    </div>
    <div class="cardBody">
      <slot />
    </div>
    <div v-if="slots.footer" class="cardFooter">
      <slot name="footer" />
    </div>
  </div>
</template>
<script setup>
defineOptions({
  name: 'MvcCard',
});
// 传参
const prop = defineProps({
  title: {
    type: String,
    default: '',
  },
  noshadow: {
    type: Boolean,
    default: false,
  },
  border: {
    type: String,
    default: 'border-white7',
  },
  color: {
    type: String,
    default: '',
  },
});
const { proxy } = getCurrentInstance();
// 数据
const state = reactive({});

// 计算属性
const slots = computed(() => {
  return proxy.$slots;
});
const mainClass = computed(() => {
  const r = [prop.border];
  if (prop.noshadow) {
    r.push('noshadow');
    r.push('hover-box-shadow-dark1');
  }
  if (prop.color) {
    r.push(prop.color);
  }
  return r;
});
// 监听

// 挂载

// 事件

// 卸载
</script>
<style lang="scss" scoped>
.MvcCard {
  border-radius: 8px;
  box-shadow: 0 5px 20px $dark1;
  background-color: $white7;
  &::after {
    border-radius: 8px;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
  }
  &.noshadow {
    box-shadow: none;
  }
  .cardHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 48px;
    padding: 0 16px;
    border-radius: 8px 8px 0 0;
    border-bottom: 1px solid $dark1;
    background-color: $white;
    color: $dark7;
  }
  .cardFooter {
    padding: 12px 16px;
    border-radius: 0 0 8px 8px;
    border-top: 1px solid $dark1;
    color: $dark9;
  }
  &.primary {
    background-color: $primary;
    .cardHeader {
      border-bottom-color: $white1;
      background-color: $gray1;
      color: $white9;
    }
    .cardFooter {
      border-top-color: $white1;
      color: $white9;
    }
  }
  &.green {
    background-color: $green;
    .cardHeader {
      border-bottom-color: $white1;
      background-color: $gray1;
      color: $white9;
    }
    .cardFooter {
      border-top-color: $white1;
      color: $white9;
    }
  }
  &.orange {
    background-color: $orange;
    .cardHeader {
      border-bottom-color: $white1;
      background-color: $gray1;
      color: $white9;
    }
    .cardFooter {
      border-top-color: $white1;
      color: $white9;
    }
  }
  &.blue {
    background-color: $blue;
    .cardHeader {
      border-bottom-color: $white1;
      background-color: $gray1;
      color: $white9;
    }
    .cardFooter {
      border-top-color: $white1;
      color: $white9;
    }
  }
  &.red {
    background-color: $red;
    .cardHeader {
      border-bottom-color: $white1;
      background-color: $gray1;
      color: $white9;
    }
    .cardFooter {
      border-top-color: $white1;
      color: $white9;
    }
  }
  &.pink {
    background-color: $pink;
    .cardHeader {
      border-bottom-color: $white1;
      background-color: $gray1;
      color: $white9;
    }
    .cardFooter {
      border-top-color: $white1;
      color: $white9;
    }
  }
  &.purple {
    background-color: $purple;
    .cardHeader {
      border-bottom-color: $white3;
      background-color: $gray1;
      color: $white9;
    }
    .cardFooter {
      border-top-color: $white3;
      color: $white9;
    }
  }
  &.dark5 {
    background-color: $dark5;
    .cardHeader {
      border-bottom-color: $white3;
      color: $white9;
    }
    .cardFooter {
      border-top-color: $white3;
      color: $white9;
    }
  }
}
</style>
