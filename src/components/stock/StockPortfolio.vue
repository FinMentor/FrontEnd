<template>
  <div v-if="data" class="card-ui">
    <p class="title">내 포트폴리오</p>
    <div class="portfolio">
      <div v-if="data.totalQuantity">
        <table>
          <tbody>
            <tr>
              <td class="totalPrice">
                {{ (currentProfit || 0).toLocaleString() }}원
              </td>
              <td>{{ data.totalQuantity }}주</td>
            </tr>
            <tr>
              <td
                class="delta"
                :class="{
                  negative: delta < 0,
                  positive: delta > 0,
                  neutral: delta === 0,
                }"
              >
                <img
                  v-if="delta > 0"
                  src="@/assets/icons/price-increase-icon.svg"
                />

                <img
                  v-if="delta < 0"
                  src="@/assets/icons/price-decrease-icon.svg"
                />
                {{ (delta || 0).toLocaleString() }} ({{ deltaPercent }}%)
              </td>
              <td class="price">
                {{ (data.avgPrice || 0).toLocaleString() }}원
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="portfolioSummarySkeleton">포트폴리오가 없습니다.</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const delta = computed(() => {
  return (
    (props.data.recentPrice - props.data.avgPrice) * props.data.totalQuantity
  );
});
const currentProfit = computed(() => {
  return props.data.recentPrice * props.data.totalQuantity;
});
const deltaPercent = computed(() => {
  return (
    ((props.data.recentPrice - props.data.avgPrice) / props.data.avgPrice) *
    100
  ).toFixed(2);
});
const totalPrice = computed(() => {
  if (!props.data || !props.data.avgPrice || !props.data.totalQuantity) {
    return 0; // 기본값
  }
  return props.data.avgPrice * props.data.totalQuantity;
});
</script>

<style scoped>
.card-ui {
  font-family: "Pretendard-Bold";
}
table {
  width: 100%;
  border-collapse: collapse;
}
.portfolio {
  padding: 10px 20px 10px 10px;
}
th,
td {
  /* border: 1px solid #ddd; */
  line-height: 1.6;
}
.totalPrice {
  letter-spacing: -0.3px;
}
.price {
  color: #4f4f4f;
}
td:nth-child(1) {
  text-align: left;
  padding-right: 70px;
}
td:nth-child(2) {
  text-align: right;
}
.delta {
  font-size: 12px;
}
.negative {
  color: var(--bear-color); /* 음수일 때 파란색 */
}

.positive {
  color: var(--bull-color); /* 양수일 때 빨간색 */
}

.neutral {
  color: black; /* 0일 때 검정색 */
}
.portfolioSummarySkeleton {
  height: 100px;
  display: flex;
  justify-content: center; /* 좌우 가운데 정렬 */
  align-items: center; /* 상하 가운데 정렬 */
  border-radius: 10px;
  border: dashed grey;
  color: grey;
}
</style>
