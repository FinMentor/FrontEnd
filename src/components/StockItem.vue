<template>
  <div class="stock-item">
    <!-- 주식 정보 -->
    <div class="stock-header">
      <div class="header-item stock-info">
        <p class="stock-name">{{ stock.stockName }}</p>
        <div class="stock-id-profit">
          <p class="stock-id">{{ stock.shortCode }}</p>
        </div>
      </div>
      <div class="header-item stock-prices">
        <div class="evaluation-group">
          <div class="evaluation-item">
            <p class="evaluation-naming">평가손익</p>
            <p class="evaluation-naming">수익률</p>
          </div>
          <div class="evaluation-item">
            <p class="current-price" :class="profitLossClass">
              {{ formatCurrency(stock.totalProfitLossAmount) }}원
            </p>
            <p class="profit" :class="profitLossClass">
              {{ stock.profitLossPercentage.toFixed(2) }}%
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 주식 세부 정보 -->
    <div class="stock-details">
      <div class="detail-left">
        <div class="detail-item">
          <p class="label">보유 수량</p>
          <p class="value">{{ stock.quantity }}개</p>
        </div>
        <div class="detail-item">
          <p class="label">매수 평균가</p>
          <p class="value">
            {{ formatCurrency(stock.averagePurchasePrice) }}원
          </p>
        </div>
      </div>
      <div class="detail-right">
        <div class="detail-item">
          <p class="label">평가 금액</p>
          <p class="value">
            {{ formatCurrency(stock.quantity * stock.closedPrice) }}원
          </p>
        </div>
        <div class="detail-item">
          <p class="label">매수 금액</p>
          <p class="value">{{ formatCurrency(stock.totalInvestedAmount) }}원</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";

const props = defineProps({
  stock: {
    type: Object,
    required: true,
  },
});

const profitLossClass = computed(() =>
  props.stock.totalProfitLossAmount >= 0 ? "positive" : "negative",
);

const formatCurrency = (value) => {
  return Math.round(value).toLocaleString(); // 소수점 제거
};
</script>

<style scoped>
/* 주식 아이템 스타일 */
.stock-item {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  border-top: 1px solid #e0e0e0;
}

.stock-header {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 10px;
}

.header-item {
  width: 48%;
}

.stock-info {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.stock-name {
  font-size: 16px;
  font-weight: bold;
  margin: 2px;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.stock-id {
  font-size: 14px;
  margin-bottom: 0px;
  color: #888;
}

/* 평가손익과 수익률을 묶은 그룹 */
.evaluation-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.evaluation-item {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: -30px;
}

.evaluation-naming {
  text-align: left;
  margin-right: 10px;
  margin-bottom: 0;
  white-space: nowrap;
  color: #888;
}

.current-price,
.profit {
  font-size: 16px;
  margin: 0;
  white-space: nowrap;
  text-align: left;
}

/* 스타일 및 정렬 */
.profit.positive {
  color: red;
}

.profit.negative {
  color: blue;
}

.stock-details {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  padding-bottom: 10px;
}

.detail-right {
  width: 154px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.detail-left {
  width: 148px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.detail-item {
  width: 48%;
  text-align: right;
}

.value {
  font-size: 14px;
  font-weight: bold;
  color: #000;
  margin-bottom: 2px;
}

.label {
  font-size: 12px;
  color: #888;
  margin-bottom: 2px;
}

/* 양수일 때 빨간색 */
.positive {
  color: red;
}

/* 음수일 때 파란색 */
.negative {
  color: blue;
}
</style>
