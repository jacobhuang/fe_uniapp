<template>
  <view class="u-charts">
    <canvas ref="canvas"></canvas>
  </view>
</template>

<script>
import uCharts from '@/uview-ui/libs/u-charts/u-charts.min.js';

export default {
  props: {
    options: {
      type: Object,
      default: {},
    },
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const { width, height, series, ...rest } = this.options;
      const canvas = this.$refs.canvas;

      canvas.width = uni.upx2px(width || 750);
      canvas.height = uni.upx2px(height || 400);

      const chart = new uCharts({
        $el: canvas,
        ...rest,
        series,
      });

      chart.updateData();
    },
  },
};
</script>

<style>
.u-charts {
  width: 100%;
  height: 100%;
}
</style>
