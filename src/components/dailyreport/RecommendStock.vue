<template>
  <div style="padding-bottom: 100px">
    <div class="stock">
      <div class="index-section">
        <div>
          <p class="subject">금융 지표</p>
        </div>
        <div class="index">
          <div class="card-ui">
            <p class="subject">코스피</p>
            <p class="index">
              {{ dailyTrend.kospiPrice }}
            </p>
            <p
              class="fluctuation"
              :class="dailyTrend.kospiProfitRate > 0 ? 'font-red' : 'font-blue'"
            >
              {{ dailyTrend.kospiProfitRate > 0 ? "+" : ""
              }}{{ dailyTrend.kospiProfitRate }}%
            </p>
            <img
              class="index-img"
              :src="
                dailyTrend.kospiProfitRate > 0
                  ? '/src/assets/images/stock-plus.png'
                  : '/src/assets/images/stock-minus.png'
              "
            />
          </div>
          <div class="card-ui">
            <p class="subject">코스닥</p>
            <p class="index">
              {{ dailyTrend.kosdaqPrice }}
            </p>
            <p
              class="fluctuation"
              :class="
                dailyTrend.kosdaqProfitRate > 0 ? 'font-red' : 'font-blue'
              "
            >
              {{ dailyTrend.kosdaqProfitRate > 0 ? "+" : ""
              }}{{ dailyTrend.kosdaqProfitRate }}%
            </p>
            <img
              class="index-img"
              :src="
                stockIndex.kosdaqProfitRate > 0
                  ? '/src/assets/images/stock-plus.png'
                  : '/src/assets/images/stock-minus.png'
              "
            />
          </div>
        </div>
      </div>
      <div class="recommand-section">
        <div>
          <p class="subject">추천 종목</p>
        </div>
        <div class="recommand">
          <div
            v-for="(stock, index) in dailyRecommendStock"
            :key="index"
            class="card-ui"
          >
            <img
              class="medal-img"
              :src="`/src/assets/images/medal-${index}.png`"
            />
            <p class="subject">{{ stock.stockName }}</p>
            <p
              class="fluctuation"
              :class="stock.changeAmountRate > 0 ? 'font-red' : 'font-blue'"
            >
              {{ stock.changeAmountRate > 0 ? "+" : ""
              }}{{ stock.changeAmountRate }}%
            </p>
            <p class="content">{{ stock.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const INDEX_BASE = `${import.meta.env.VITE_API_URL}/dailytrend`;
const RECOMMAND_BASE = `${import.meta.env.VITE_API_URL}/dailyrecommend`;
const stockIndex = ref({
  kospi: {
    index: 1234,
    fluctuation: 6.07,
  },
  kosdaq: {
    index: 1234,
    fluctuation: -1.86,
  },
});
const dailyRecommendStock = ref([]);
const dailyTrend = ref([]);
const token = localStorage.getItem("accessToken");
const emit = defineEmits(["loaded", "onComponentLoaded"]);

const createStockIndex = async () => {
  try {
    const response = await axios.get(INDEX_BASE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dailyTrend.value = response.data; // 최대 3개의 추천 종목만 표시
  } catch (err) {
    console.log("createStockIndex err : ", err.message);
  }
};

const createRecommendStock = async () => {
  try {
    const response = await axios.get(RECOMMAND_BASE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dailyRecommendStock.value = response.data[0].dailyRecommendStockDTOList; // 최대 3개의 추천 종목만 표시
  } catch (err) {
    console.log("createRecommendStock err : ", err.message);
  }
};

onMounted(async () => {
  await createStockIndex();
  await createRecommendStock();
  emit("loaded");
});
</script>

<style scoped>
.stock {
  background-color: #fcfbff;
  border: 1px solid #e0e0e0;
  padding: 10px;
  border-radius: 12px;
  box-shadow:
    1px 1px 1px rgba(0, 0, 0, 0.1),
    -1px 1px 1px rgba(0, 0, 0, 0.1);
}

.card-ui {
  background-color: var(--main-card-color);
  border: 1px solid #e0e0e0;
  padding: 16px;
  border-radius: 12px;
  box-shadow:
    1px 1px 1px rgba(0, 0, 0, 0.1),
    -1px 1px 1px rgba(0, 0, 0, 0.1);
}

.font-red {
  color: #ff5252;
}

.font-blue {
  color: #0a7df3;
}

.index-section .subject {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 0px;
}

.index-section .index {
  margin-top: 10px;
  display: flex;
  gap: 14px;
}

.index-section .index div {
  flex-grow: 1;
}

.index-section .index div p {
  font-weight: 700;
  margin-bottom: 0px;
}

.index-section .index .subject {
  font-size: 14px;
}

.index-section .index .index {
  margin-top: 6px;
  font-size: 18px;
}

.index-section .index .fluctuation {
  margin-top: 2px;
  font-size: 12px;
}

.index-section .index .index-img {
  width: 120%;
  margin-left: -10%;
}

/* 추천 파트 시작 */
.recommand-section {
  margin-top: 16px;
}

.recommand-section .subject {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 0px;
}

.recommand-section .recommand {
  margin-top: 10px;
  display: flex;
  gap: 12px;
}

.recommand-section .recommand .card-ui {
  flex-grow: 1;
  flex-basis: 0;
  padding: 10px;
}

.recommand-section .recommand .card-ui p {
  font-weight: 700;
  margin-bottom: 0px;
}

.recommand-section .recommand .medal-img {
  width: 40px;
  margin-left: -8px;
  margin-bottom: 6px;
}

.recommand-section .recommand .subject {
  font-size: 14px;
}

.recommand-section .recommand .fluctuation {
  margin-top: 2px;
  font-size: 12px;
}

.recommand-section .recommand .content {
  margin-top: 6px;
  font-size: 10px;
}
</style>
