<template>
  <v-chart class="chart" :option="option(data, symbolSize)" ref="chartRef" @datazoom="updatePosition" />
</template>

<script>
import VChart from 'vue-echarts';

export default {
  name: 'LineDraggable',
  components: {
    VChart,
  },
  data() {
    return {
      symbolSize: 20,
      data: [
        [40, -10],
        [-30, -5],
        [-76.5, 20],
        [-63.5, 40],
        [-22.1, 50]
      ],
    }
  },
  mounted() {
    const myChart = this.$refs.chartRef;
    const symbolSize = this.symbolSize;
    const data = this.data;
    const onPointDragging = this.onPointDragging;
    const showTooltip = this.showTooltip;
    const hideTooltip = this.hideTooltip;
    myChart.setOption({
      graphic: data.map(function (item, dataIndex) {
        return {
          type: 'circle',
          position: myChart.convertToPixel('grid', item),
          shape: {
            cx: 0,
            cy: 0,
            r: symbolSize / 2
          },
          invisible: true,
          draggable: true,
          ondrag: function () {
            onPointDragging(dataIndex, [this.x, this.y], myChart);
          },
          onmousemove: function () {
            showTooltip(dataIndex, myChart);
          },
          onmouseout: function () {
            hideTooltip(myChart);
          },
          z: 100
        };
      })
    })
  },
  methods: {
    showTooltip(dataIndex, myChart) {
      myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: dataIndex
      });
    },
    hideTooltip(myChart) {
      myChart.dispatchAction({
        type: 'hideTip'
      });
    },
    onPointDragging(dataIndex, pos, myChart) {
      this.data[dataIndex] = myChart.convertFromPixel('grid', pos);
      myChart.setOption({
        series: [
          {
            id: 'a',
            data: this.data
          }
        ]
      });
    },
    updatePosition() {
      const myChart = this.$refs.chartRef;
      myChart.setOption({
        graphic: this.data.map(function (item) {
          return {
            position: myChart.convertToPixel('grid', item)
          };
        })
      });
    },
    option(data, symbolSize) {
      return {
        title: {
          text: 'Try Dragging these Points',
          left: 'center'
        },
        tooltip: {
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
            symbolSize,
            data,
          }
        ]
      }
    },
  }
}
</script>