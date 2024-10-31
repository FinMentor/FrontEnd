<template>
  <div class="card-ui">
    <div class="recommend-stock">
      <h2>일일 추천 종목</h2>
      <p class="ai-stock" @click="moveRecommendStock">AI 추천 종목 현황</p>
      <img
        class="next-button"
        src="@/assets/icons/nextButton-icon.svg"
        @click="moveRecommendStock"
      />
    </div>
    <section>
      <div class="home-recommend-stock">
        <div v-for="(stock, sIndex) in dailyRecommendStock" :key="sIndex">
          <div
            v-for="(
              recommendStock, rsIndex
            ) in stock.dailyRecommendStockDTOList"
            :key="rsIndex"
            class="stock-price-info"
          >
            <div class="stock-info">
              <div class="stock-name">{{ recommendStock.stockName }}</div>
              <div class="short-code">{{ recommendStock.shortCode }}</div>
            </div>
            <div class="price-change-container">
              <div class="stock-price">{{ recommendStock.price }}원</div>
              <div
                v-if="recommendStock.changeAmount > 0"
                class="stock-change up"
              >
                <img src="@/assets/icons/price-increase-icon.svg" />
                {{ Math.abs(recommendStock.changeAmount) }}원
              </div>
              <div
                v-if="recommendStock.changeAmount < 0"
                class="stock-change down"
              >
                <img src="@/assets/icons/price-decrease-icon.svg" />
                {{ Math.abs(recommendStock.changeAmount) }}원
              </div>
            </div>
            <div
              :class="
                recommendStock.changeAmountRate > 0
                  ? 'stock-change-rate up'
                  : recommendStock.changeAmountRate < 0
                    ? 'stock-change-rate down'
                    : 'stock-change-rate'
              "
            >
              {{ recommendStock.changeAmountRate }}%
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";

// 추천 종목 데이터를 불러오기 위한 기본 URL 설정
const BASE = `${import.meta.env.VITE_API_URL}/dailyrecommend`;
const dailyRecommendStock = reactive([]);
const token = localStorage.getItem("accessToken");
const router = useRouter();
const emit = defineEmits(["loaded", "onComponentLoaded"]);

const moveRecommendStock = () => {
  router.push("/recommendstock");
};

// 추천 종목 API 호출 함수
const createRecommendStock = async () => {
  try {
    const response = await axios.get(BASE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    Object.assign(dailyRecommendStock, response.data);
  } catch (err) {
    console.error("createRecommendStock err : ", err.message);
  }
};

// 컴포넌트 마운트 시 추천 종목 데이터를 불러오기 위한 API 호출
onMounted(async () => {
  await createRecommendStock();
  emit("loaded");
});
</script>

<style scoped>
.card-ui {
  border: 1px solid #e0e0e0;
  padding: 10px;
  border-radius: 12px;
  box-shadow:
    1px 1px 1px rgba(0, 0, 0, 0.1),
    -1px 1px 1px rgba(0, 0, 0, 0.1);
  font-family: "Pretendard-Bold";
}

h2 {
  font-size: 18px;
  margin-bottom: 10px;
  padding-top: 10px;
}

.home-recommend-stock {
  padding: 12px 8px 0px 8px;
  display: flex;
  flex-direction: column;
}

.stock-price-info {
  display: flex;
  width: 100%; /* 전체 너비 사용 */
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
}

.stock-info {
  flex: 1;
  text-align: left; /* 좌측 정렬 */
}

.price-change-container {
  flex: 1;
  text-align: right; /* 가운데 정렬 */
  padding-right: 20px;
}

.stock-price {
  color: #333;
}

.stock-change.up {
  color: var(--bull-color); /* 상승 */
}

.stock-change.down {
  color: var(--bear-color);
}

.stock-change-rate {
  flex: none;
  width: 22%;
  text-align: right; /* 우측 정렬 */
  font-weight: bold;
  padding: 3px 8px;
  border-radius: 4px;
  background-color: #929294;
  color: white;
}

.stock-change-rate.up {
  font-family: Arial, sans-serif;
  background-color: var(--bull-color);
}
.stock-change-rate.down {
  font-family: Arial, sans-serif;
  background-color: var(--bear-color);
}

.short-code {
  color: #888;
  font-size: 14px;
}

.recommend-stock {
  display: flex;
}

.ai-stock {
  font-size: 16px;
  margin-left: auto;
  padding-top: 10px;
}

.next-button {
  margin-left: 10px;
  padding-right: 5px;
  padding-bottom: 5px;
}
</style>
