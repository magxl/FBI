<template>
  <div class="ContractFooter">
    <div class="p30-20 border-b-dark3-dashed">
      <div class="subjectArea flexMode">
        <div class="aArea relative">
          <div
            class="signArea flexMode hc vc"
            :class="a.sign ? 'signed' : ''"
            @click="toSign"
          >
            <img v-if="a.sign" :src="a.sign" class="wp100" />
            <span v-else class="txt-blue">点击签字</span>
          </div>
          <p>
            <span class="pr10">甲　　方：</span>
            <span>{{ a.name }}</span>
            <span>(签章)</span>
          </p>
          <p>
            <span class="pr10">授权代表：</span>
            <span>{{ a.username }}</span>
          </p>
          <p>
            <span class="pr10">电　　话：</span>
            <span>{{ a.phone }}</span>
          </p>
          <p v-if="a.useEmail">
            <span class="pr10">邮　　箱：</span>
            <span>{{ a.email }}</span>
          </p>
          <p>
            <span class="pr10">日　　期：</span>
            <span>{{ subject.date }}</span>
          </p>
        </div>
        <div class="aArea relative">
          <div class="sealArea">
            <img :src="seal" class="wp100" />
          </div>
          <p>
            <span class="pr10">乙　　方：</span>
            <span>{{ b.name }}</span>
            <span>(签章)</span>
          </p>
          <p>
            <span class="pr10">授权代表：</span>
            <span>{{ b.username }}</span>
          </p>
          <p>
            <span class="pr10">电　　话：</span>
            <span>{{ b.phone }}</span>
          </p>
          <p v-if="b.useEmail">
            <span class="pr10">邮　　箱：</span>
            <span>{{ b.email }}</span>
          </p>
          <p>
            <span class="pr10">日　　期：</span>
            <span>{{ subject.date }}</span>
          </p>
        </div>
      </div>
      <!-- <div>subject: {{ subject }}</div> -->
      <Drawer
        v-model:current="drawer.current"
        v-model:sign="a.sign"
        :drawer="drawer.info"
      />
    </div>
  </div>
</template>
<script setup>
defineOptions({
  name: 'ContractFooter',
});
const prop = defineProps({
  subject: {
    type: Object,
    default: () => {},
  },
  seal: {
    type: Object,
    default: () => {},
  },
});
import { reactive } from 'vue';
const a = reactive(prop.subject.a);
const b = reactive(prop.subject.b);

// 抽屉
import Sign from '@Super/Sign/index.vue';
const drawer = reactive({
  info: [
    {
      title: '签名',
      direction: 'btt',
      size: '90%',
      cpt: Sign,
      keepalive: true,
    },
  ],
  current: '',
});
const toSign = () => {
  drawer.current = 0;
};
</script>
<style lang="scss" scoped>
.ContractFooter {
  border-top: 1px solid $dark1;
  padding-bottom: 20px;
  .aArea {
    width: 50%;
  }
  .signArea {
    position: absolute;
    top: 20px;
    left: 80px;
    width: 220px;
    height: 130px;
    z-index: 1;
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 5px,
      $dark1 5px,
      $dark1 10px
    );
    border: 1px $dark1 solid;
    cursor: pointer;
    &:hover {
      background: repeating-linear-gradient(
        45deg,
        $blue1,
        $blue1 5px,
        transparent 5px,
        transparent 10px
      );
      border-color: $blue1;
    }
    &.signed {
      background: transparent !important;
    }
  }
  .sealArea {
    position: absolute;
    top: -20px;
    left: 80px;
    width: 220px;
    height: 200px;
    z-index: 1;
  }
}
@media screen and (max-width: 425px) {
  .subjectArea {
    flex-direction: column !important;
    .aArea {
      width: 100%;
      padding-bottom: 20px;
    }
  }
}
</style>
