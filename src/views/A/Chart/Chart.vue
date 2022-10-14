<template>
  <Page type="UI" page="PageChart">
    <div>
      <el-scrollbar class="hp100">
        <div class="flexMode flexWrap p5">
          <ChartLine />
          <ChartLineArea />
          <ChartZoom />
          <ChartZoomInside />
        </div>
      </el-scrollbar>
    </div>
  </Page>
</template>
<script setup>
import ChartLine from './ChartLine.vue';
import ChartLineArea from './ChartLineArea.vue';
import ChartZoom from './ChartZoom.vue';
import ChartZoomInside from './ChartZoomInside.vue';
defineOptions({
  name: 'PageChart',
  components: { ChartLine, ChartLineArea, ChartZoom, ChartZoomInside },
});
</script>
<style lang="scss" scoped></style>
