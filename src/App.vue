<template>
  <section>
    <router-link to="/line-draggable" class="nav-link" active-class="nav-link-active">Line Draggable Chart
    </router-link>
    <router-link to="/custom-profile" class="nav-link" active-class="nav-link-active">Custom Profile Chart
    </router-link>
  </section>
  <router-view></router-view>
</template>

<script>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { CustomChart, LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
  GraphicComponent,
} from 'echarts/components';

use([
  CanvasRenderer,
  LineChart,
  CustomChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
  GraphicComponent,
]);

export default {
  name: 'App',
}
</script>

<style>
.chart {
  height: calc(100vh - 60px);
}

.section {
  height: 60px;
  margin: auto;
}

.nav-link {
  color: #323232;
  display: inline-block;
  padding: 6px 8px;
  text-decoration: none;
}

.nav-link-active {
  color: chocolate;
  text-decoration: underline;
}
</style>
