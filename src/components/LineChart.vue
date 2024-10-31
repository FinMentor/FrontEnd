<template>
  <div class="chart-wrapper">
    <highcharts
      ref="highchartsRef"
      class=""
      :options="chartOptions"
    ></highcharts>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
const primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue("--primary-color")
  .trim();
const props = defineProps({
  chartData: {
    type: Object,
    required: true,
  },
});

const chartOptions = ref({
  chart: {
    height: 300,
    animation: false,
    type: "area",
  },
  title: {
    text: "",
  },
  subtitle: {
    align: "center",
    style: {
      fontFamily: "Pretendard-Bold",
      fontSize: "12px",
      color: "#000000",
    },
    useHTML: true,
  },
  credits: {
    enabled: false,
  },
  xAxis: {
    type: "datetime",
    labels: {
      enabled: true,
      rotation: -10, // 라벨을 수평으로 설정
      style: {
        fontSize: "10px",
      },
    },

    lineWidth: 0,
    tickLength: 0,
    gridLineWidth: 2,
  },
  yAxis: {
    title: {
      text: "수익률", // Y축 제목
      style: {
        fontSize: "12px",
        color: "#000",
      },
    },
    // 유동적으로 최소, 최대 값을 설정하되, 0을 중심으로 잡기
    softMin: function () {
      return Math.min(
        0,
        Math.min(...chartOptions.value.series[0].data.map((d) => d[1])),
      );
    },
    softMax: function () {
      return Math.max(
        0,
        Math.max(...chartOptions.value.series[0].data.map((d) => d[1])),
      );
    },
    plotLines: [
      {
        value: 0, // Y축 가운데에 0 고정
        width: 0.5, // 선 두께
        zIndex: 3,
        label: {
          align: "right",
        },
      },
    ],
    labels: {
      enabled: true,
      formatter: function () {
        return this.value + "%"; // Add '%' to the Y-axis labels
      },
      style: {
        color: "#333", // Custom label color
        fontSize: "10px",
      },
    },
    tickLength: 0,
    gridLineWidth: 1,
    title: {
      text: null,
    },
  },
  plotOptions: {
    series: {
      animation: false,
      fillColor: {
        linearGradient: [0, 0, 0, 300], // 그라데이션을 설정
        stops: [
          [0, "rgba(154, 64, 214, 0.5)"], // 상단에서 연한 파란색
          [1, "rgba(154, 64, 214, 0.1)"], // 하단에서 더 투명한 파란색
        ],
      },
    },
  },
  rangeSelector: {
    selected: 1,
  },
  series: [
    {
      name: "수익률",
      data: [],
      color: primaryColor,
    },
  ],
  legend: {
    enabled: true,
  },
});

onMounted(() => {
  const parsedData = props.chartData.datasets[0].data.map((value, index) => {
    const dateStr = props.chartData.labels[index]; // labels에서 날짜를 가져옴
    const year = parseInt(dateStr.slice(0, 4), 10);
    const month = parseInt(dateStr.slice(4, 6), 10) - 1; // JavaScript의 month는 0부터 시작
    const day = parseInt(dateStr.slice(6, 8), 10);

    return [Date.UTC(year, month, day), value];
  });

  chartOptions.value.series[0].data = parsedData;
});

// Chart.js 구성 요소 등록
</script>

<style scoped>
.chart-wrapper {
  height: 300px;
  background-color: #6e2ff4;
}
.highcharts {
  height: 200px;
}
</style>
