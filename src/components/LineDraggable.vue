<template>
  <v-chart class="chart" :option="option" />
</template>

<script>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { defineComponent, ref } from 'vue';

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
]);

export default defineComponent({
  name: 'LineDraggable',
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: 'light',
  },
  setup() {
    const option = ref({
      title: {
        text: 'Try Dragging these Points',
        left: 'center'
      },
      tooltip: {
        triggerOn: 'none',
        formatter: function (params) {
          return (
            'X: ' +
            params.data[0].toFixed(2) +
            '<br>Y: ' +
            params.data[1].toFixed(2)
          );
        }
      },
      grid: {
        top: '8%',
        bottom: '12%'
      },
      xAxis: {
        min: -100,
        max: 70,
        type: 'value',
        axisLine: { onZero: false }
      },
      yAxis: {
        min: -30,
        max: 60,
        type: 'value',
        axisLine: { onZero: false }
      },
      dataZoom: [
        {
          type: 'slider',
          xAxisIndex: 0,
          filterMode: 'none'
        },
        {
          type: 'slider',
          yAxisIndex: 0,
          filterMode: 'none'
        },
        {
          type: 'inside',
          xAxisIndex: 0,
          filterMode: 'none'
        },
        {
          type: 'inside',
          yAxisIndex: 0,
          filterMode: 'none'
        }
      ],
      series: [
        {
          id: 'a',
          type: 'line',
          smooth: true,
          symbolSize: 20,
          data: [
            [40, -10],
            [-30, -5],
            [-76.5, 20],
            [-63.5, 40],
            [-22.1, 50]
          ]
        }
      ]
    });

    return { option };
  }
})
</script>

<style scoped>
.chart {
  height: calc(100vh - 50px);
}
</style>
