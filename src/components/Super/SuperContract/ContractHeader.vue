<template>
  <div class="ContractHeader">
    <div class="flexMode hr p10-0">
      <div class="p10 txt-r border-b-dark3-dashed">{{ subject.number }}</div>
    </div>
    <div class="title fs30 txt-c border-b-dark3-dashed">
      {{ subject.title }}
    </div>
    <div class="p30-20 border-b-dark3-dashed">
      <div class="flexMode">
        <div class="aArea wp50">
          <p>
            <span class="pr10">甲　　方：</span>
            <span>{{ a.name }}</span>
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
            <span class="pr10">地　　址：</span>
            <span>{{ a.address }}</span>
          </p>
        </div>
        <div class="aArea wp50">
          <p>
            <span class="pr10">乙　　方：</span>
            <span>{{ b.name }}</span>
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
            <span class="pr10">地　　址：</span>
            <span>{{ b.address }}</span>
          </p>
        </div>
      </div>
      <!-- <div>subject: {{ subject }}</div> -->
    </div>
  </div>
</template>
<script setup>
defineOptions({
  name: 'ContractHeader',
});
const prop = defineProps({
  name: {
    type: String,
    default: 'None',
  },
  subject: {
    type: Object,
    default: () => {},
  },
});
import { reactive } from 'vue';
const a = reactive(prop.subject.a);
const b = reactive(prop.subject.b);
</script>
<style lang="scss" scoped>
.title {
  padding: 20px 20px 40px 20px;
}
</style>
