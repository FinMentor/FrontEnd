<template>
  <div class="doughnut-container">
    <svg v-if="hasData" :width="width" :height="height">
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="3" flood-opacity="0.3" />
        </filter>
        <filter id="sectionShadow" x="-20%" y="-20%" width="120%" height="120%">
          <feDropShadow dx="2" dy="2" stdDeviation="4" flood-opacity="0.5" />
        </filter>
      </defs>
      <!-- 차트 영역 -->
      <g :transform="`translate(${centerX + 5},${centerY})`">
        <g transform="rotate(-90)">
          <path
            v-for="(section, index) in chartSections"
            :key="index"
            :d="section.path"
            :fill="section.color"
            filter="url(#sectionShadow)"
          />
        </g>
        <g v-for="(section, index) in chartSections" :key="`label-${index}`">
          <text
            :transform="`rotate(${
              (((section.startAngle + section.endAngle) / 2) * 180) / Math.PI -
              90
            }) translate(${section.labelRadius}, 0) rotate(${-(
              (((section.startAngle + section.endAngle) / 2) * 180) / Math.PI -
              90
            )})`"
            text-anchor="middle"
            dominant-baseline="middle"
            fill="white"
            font-size="12"
            font-weight="bold"
          >
            {{ `${section.percentage.toFixed(0)}%` }}
          </text>
        </g>
      </g>
      <text
        :x="centerX"
        :y="centerY - 5"
        text-anchor="middle"
        font-size="14"
        font-weight="bold"
      >
        평가 총액
      </text>
      <text
        :x="centerX"
        :y="centerY + 15"
        text-anchor="middle"
        font-size="14"
        font-weight="bold"
      >
        {{ totalFormatted }}
      </text>

      <!-- 항목 영역 -->
      <g
        :transform="`translate(${width * 0.67}, ${
          height / 2 - (topChartData.length * 25) / 2 + 20
        })`"
      >
        <g
          v-for="(item, index) in topChartData"
          :key="index"
          :transform="`translate(0, ${index * 20})`"
        >
          <rect :fill="COLORS[index % COLORS.length]" width="20" height="10" />
          <text x="25" y="10" font-size="12">{{ item.name }}</text>
        </g>
      </g>
    </svg>
    <div v-else class="error-message">
      데이터가 없습니다. 주식 데이터를 제공해 주세요.
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";

// 차트 그리는 공간의 넓이값
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  width: {
    type: Number,
    default: 500,
  },
  height: {
    type: Number,
    default: 400,
  },
});

// 차트의 색상 -> 순서대로 적용 됩니다!
const COLORS = [
  "#9A40D6",
  "#0066FF",
  "#4d94ff",
  "#99c2ff",
  "#ffc6f3",
  "#e0bff2",
  "#c28ce6",
  // "rgba(0, 102, 255, 1)",
  // "rgba(154, 64, 214, 1)",
  // "rgba(0, 102, 255, 0.7)",
  // "rgba(154, 64, 214, 0.7)",
  // "rgba(0, 102, 255, 0.4)",
  // "rgba(154, 64, 214, 0.4)",
];

const animationProgress = ref(0);
// 차트 기본 두께 설정, 0.2 곱하기 값을 변경하면 기본 두께가 변경 됩니다
const innerRadius = computed(() => Math.min(props.width, props.height) * 0.18);
const normalThickness = computed(
  () => Math.min(props.width, props.height) * 0.13,
);
// 제일 가격이 큰 차트의 두께를 조절 합니다. 1.05 파트를 수정 하면 됩니다!
const emphasizedThickness = computed(() => normalThickness.value * 1.05);
const centerX = computed(() => props.width * 0.29);
const centerY = computed(() => props.height / 2);

const chartData = computed(() => {
  return Array.isArray(props.data) && props.data.length > 0 ? props.data : [];
});

const hasData = computed(() => chartData.value.length > 0);
// 상위 7개 항목만 가져오기
const topChartData = computed(() => {
  return chartData.value.slice(0, 7); // 상위 7개 항목만 가져옴
});
const total = computed(() =>
  chartData.value.reduce((sum, item) => sum + item.value, 0),
);

const totalFormatted = computed(() => total.value.toLocaleString() + "원");

const largestPercentage = computed(() => {
  if (!hasData.value) return 0;
  return Math.max(
    ...chartData.value.map((item) => (item.value / total.value) * 100),
  );
});

const chartSections = computed(() => {
  if (!hasData.value) return [];

  let startAngle = 0;
  return chartData.value.map((item, index) => {
    const percentage = (item.value / total.value) * 100;
    const endAngle =
      startAngle + (percentage / 100) * Math.PI * 2 * animationProgress.value;

    const isLargest = percentage === largestPercentage.value;
    const thickness = isLargest
      ? emphasizedThickness.value
      : normalThickness.value;
    const outerRadius = innerRadius.value + thickness;

    const startOuterX = Math.cos(startAngle) * outerRadius;
    const startOuterY = Math.sin(startAngle) * outerRadius;
    const endOuterX = Math.cos(endAngle) * outerRadius;
    const endOuterY = Math.sin(endAngle) * outerRadius;
    const startInnerX = Math.cos(startAngle) * innerRadius.value;
    const startInnerY = Math.sin(startAngle) * innerRadius.value;
    const endInnerX = Math.cos(endAngle) * innerRadius.value;
    const endInnerY = Math.sin(endAngle) * innerRadius.value;

    const largeArcFlag = endAngle - startAngle <= Math.PI ? 0 : 1;

    const path = [
      `M ${startOuterX} ${startOuterY}`,
      `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${endOuterX} ${endOuterY}`,
      `L ${endInnerX} ${endInnerY}`,
      `A ${innerRadius.value} ${innerRadius.value} 0 ${largeArcFlag} 0 ${startInnerX} ${startInnerY}`,
      "Z",
    ].join(" ");

    const labelRadius = innerRadius.value + thickness / 2;

    const section = {
      path,
      color: COLORS[index % COLORS.length],
      name: item.name,
      percentage,
      labelRadius,
      startAngle,
      endAngle,
      isLargest,
    };

    startAngle = endAngle;
    return section;
  });
});

watchEffect(() => {
  if (hasData.value) {
    startAnimation();
  }
});

function startAnimation() {
  const animationDuration = 300; // 1초
  const startTime = Date.now();

  const animate = () => {
    const elapsedTime = Date.now() - startTime;
    const progress = Math.min(elapsedTime / animationDuration, 1);
    animationProgress.value = progress;

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };
  requestAnimationFrame(animate);
}
</script>

<style scoped>
.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.error-message {
  color: #ff0000;
  font-size: 16px;
  text-align: center;
}
</style>
