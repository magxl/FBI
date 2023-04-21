<template>
  <div class="AFrameHeaderSetting">
    <el-form ref="form" :rules="state.rules" :model="state.form" label-width="100px" size="default">
      <div class="partArea">
        <div class="flexMode vc hb pb16">
          <span>{{ $l('Subscribe And Receive Anlysis of Data') }}</span>
          <span class="fs12 hover-txt-orange alink" @click="toIncreaseAmount">{{
            $l('Increase Amount')
          }}</span>
        </div>
        <el-form-item :label="$l('Category')" prop="category">
          <el-checkbox-group v-model="state.form.category" :max="state.maxCategory">
            <template v-for="(it, i) in categoryOptions">
              <el-checkbox v-if="it.value" :key="i" :label="it.value" class="w160">
                <span :class="it.label.length > 20 && 'fs12'">
                  {{ it.label }}
                </span>
              </el-checkbox>
              <div v-else class="pt4 mb4 border-b"></div>
            </template>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item :label="$l('Daily Budget')" prop="dailyBudget">
          <el-input-number v-model="state.form.dailyBudget" :min="0" controls-position="right" />
          <div class="p0-8">
            <el-tooltip placement="top" raw-content>
              <template #content>
                <span>{{ $l("We'll Watch All Spends Budget Within A Day") }}</span>
                <br />
                <span class="txt-orange">{{ $l('0 or Empty Will Unwatch') }}</span>
              </template>
              <i class="adicon ad-help"></i>
            </el-tooltip>
          </div>
        </el-form-item>
      </div>
      <div class="partArea">
        <div class="pb16">{{ $l('Authorize by Yourselves') }}</div>
        <div class="flexMode hc">
          <div class="flexMode vc hc flexV h160 maxw360 radius4 border-dark3-dashed hover-box-shadow-dark1">
            <div class="p16 fs12 txt-dark5">
              {{
                $l(
                  'Authorize Intro Authorize Intro  Authorize Intro  Authorize Intro  Authorize Intro  Authorize Intro  Authorize Intro ',
                )
              }}
            </div>
            <el-button plain type="primary" @click="toAuthorize">{{ $l('Authorize') }}</el-button>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script setup>
defineOptions({
  name: 'AFrameHeaderSetting',
});
// 数据
const state = reactive({
  maxCategory: 5,
  form: {},
});

// 挂载

// 事件

// 计算属性

// 监听

// 卸载

// Maps
const categoryOptions = window.$map.automation.chartsMonitorCategory;
</script>
<style lang="scss" scoped></style>
