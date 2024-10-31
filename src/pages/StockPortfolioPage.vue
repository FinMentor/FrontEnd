<template>
  <div class="chart-container">
    <LoadingComponent v-if="loading" />
    <div v-else>
      <div v-if="hasAssetData" class="chart-wrapper">
        <!-- 도넛 차트 카드 -->
        <div class="card">
          <h6 class="doughnutTitle">보유 주식 현황</h6>
          <div class="chart-wrap">
            <DoughnutChart
              v-if="stockData.length > 0"
              :data="stockData"
              :width="390"
              :height="350"
            />
          </div>
          <!-- 매도 / 매수 버튼 -->
          <SellBuyButton style="margin-top: -20px" />
        </div>

        <!-- 나의 자산 카드 -->
        <div class="card">
          <h6 style="margin-bottom: 0px">나의 자산</h6>
          <div class="asset-info">
            <div
              v-for="(label, key) in assetLabels"
              :key="key"
              class="info-box"
            >
              <p>{{ label }}</p>
              <p
                v-if="key === 'currentYield'"
                style="font-size: 18px; font-weight: 700"
              >
                {{ formatPercentage(assetData[key]) }}
              </p>
              <p v-else style="font-size: 18px; font-weight: 700">
                {{ formatCurrency(assetData[key]) }}원
              </p>
            </div>
          </div>
        </div>

        <!-- 주요 투자 종목 카드 -->
        <div class="card">
          <h6>주요 투자 종목</h6>
          <div v-if="topStocks.length > 0" class="stock-list">
            <div
              v-for="(stock, index) in topStocks"
              :key="index"
              class="stock-item"
            >
              <router-link :to="`/stock/${stock.stockId}`" class="noUnderline">
                <div class="stock-container">
                  <div class="stock-info">
                    <p class="stock-name">{{ stock.name }}</p>
                    <p class="stock-shortcode">{{ stock.shortCode }}</p>
                  </div>
                  <div class="stock-market">
                    {{ formatCurrency(stock.value) }}원
                  </div>
                </div>
              </router-link>
            </div>
          </div>
          <p v-else>투자 종목 데이터가 없습니다.</p>
        </div>

        <!-- 주간 투자 수익률 카드 -->
        <div class="card">
          <h6>주간 투자 수익률</h6>
          <LineChart
            v-if="lineChartData.labels.length > 0"
            :chart-data="lineChartData"
          />
          <p v-else>수익률 데이터가 없습니다.</p>
        </div>
      </div>
      <!-- 자산 데이터가 없을 경우 EmptyAssetBox 컴포넌트 사용 -->
      <EmptyAssetBox v-else />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import DoughnutChart from "../components/DoughnutChart.vue";
import LineChart from "../components/LineChart.vue";
import EmptyAssetBox from "../components/EmptyAssetBox.vue";
import SellBuyButton from "../components/SellBuyButton.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";

const BASE = import.meta.env.VITE_API_URL;
const router = useRouter();

const loading = ref(true);
const hasAssetData = ref(false);
const assetData = ref({
  purchaseAmount: 0,
  totalProfit: 0,
  evaluationAmount: 0,
  currentYield: 0,
});
const lineChartData = ref({
  labels: [],
  datasets: [
    {
      label: "수익률",
      data: [],
      borderColor: "#42A5F5",
      fill: false,
      tension: 1,
    },
  ],
});
const stockData = ref([]);
const topStocks = ref([]);
const assetLabels = {
  purchaseAmount: "매수 총액",
  totalProfit: "총 수익",
  evaluationAmount: "평가 총액",
  currentYield: "현재 수익률",
};

const goToEditPage = () => router.push({ path: "/edit" });
const formatCurrency = (value) => Math.round(value).toLocaleString();
const formatPercentage = (value) => `${Math.round(value)}%`;

const getToken = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    router.push({ path: "/login" });
    throw new Error("토큰이 없습니다. 로그인 페이지로 이동합니다.");
  }
  return token;
};

const fetchPortfolioData = async () => {
  const token = getToken();
  try {
    const { data: portfolioData } = await axios.get(`${BASE}/portfolio`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    stockData.value = portfolioData.map(
      ({ stockName, stockId, shortCode, totalPrice }) => ({
        name: stockName,
        stockId,
        shortCode,
        value: totalPrice,
      }),
    );
    topStocks.value = stockData.value
      .sort((a, b) => b.value - a.value)
      .slice(0, 3);
    hasAssetData.value = stockData.value.length > 0;
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
  }
};

const fetchProfitData = async () => {
  const token = getToken();
  try {
    const { data: assetDataResponse } = await axios.get(`${BASE}/stock/total`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    Object.assign(assetData.value, {
      purchaseAmount: assetDataResponse.totalInvestedAmount,
      totalProfit: assetDataResponse.totalProfitLossAmount,
      evaluationAmount:
        assetDataResponse.totalInvestedAmount +
        assetDataResponse.totalProfitLossAmount,
      currentYield: assetDataResponse.totalProfitLossPercentage,
    });
    hasAssetData.value = true;
  } catch (error) {
    console.error("Error fetching profit data:", error);
  }
};

const fetchWeeklyGraphData = async () => {
  const token = getToken();
  try {
    const { data: stockData } = await axios.get(`${BASE}/weekly-graph`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    lineChartData.value.labels = stockData.map((item) => item.date);
    lineChartData.value.datasets[0].data = stockData.map((item) => item.ratio);
  } catch (error) {
    console.error("Error fetching stock portfolio info:", error);
  }
};

onMounted(async () => {
  await Promise.all([
    fetchPortfolioData(),
    fetchProfitData(),
    fetchWeeklyGraphData(),
  ]);
  loading.value = false;
});
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  text-align: center;
  padding: 0px 0px 100px 0px;
  /* background-color: #f5f5f5; */
}
.chart-wrapper {
  opacity: 1;
  transform: scale(1);
  transition:
    opacity 0.5s ease-in-out,
    transform 0.5s ease-in-out;
}
.doughnutTitle {
  font-size: 20px;
  margin-top: 0px;
  text-align: center;
}

.chart-wrap {
  margin-top: -40px;
}

.edit-button {
  position: absolute;
  top: 30px;
  right: 30px;
  z-index: 10;
  /* background-color: #ccc; */
  color: black;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.edit-button:hover {
  background-color: #bbb;
}

/* 카드 스타일 */
.card {
  background-color: #fcfbff;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  text-align: center;
  margin-top: 15px;
}

.noUnderline {
  text-decoration: none;
  color: inherit;
}
.asset-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 10px;
}
.info-box {
  padding: 10px;
  background-color: white;
  color: #333;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #e0e0e0;
}

.info-box p {
  margin: 5px 0;
}
.stock-list {
  padding: 8px;
}
.stock-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.stock-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
}

.stock-shortcode {
  font-size: 14px;
  color: #888; /* 주식 코드에 연한 색 적용 */
}

.stock-market {
  display: flex;
  align-items: center; /* 가격이 가운데 정렬되도록 함 */
  justify-content: flex-end; /* 오른쪽에 배치 */
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
}

.stock-container {
  display: flex;
  justify-content: space-between; /* 주식 정보와 가격을 좌우로 배치 */
  border-bottom: 1px solid #ddd; /* 하단에 구분선 추가 */
}

/* 제목 스타일 */
h6 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: left;
  color: #333;
}

/* 라인 차트 컨테이너 */
.line-chart-container {
  margin-top: 20px;
}
</style>
