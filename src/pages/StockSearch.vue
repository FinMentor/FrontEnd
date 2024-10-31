<template>
  <div class="stock-search-container">
    <!-- 검색 바 -->
    <div class="search-bar">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="🔍 검색"
        @input="onInputChange"
        @compositionend="onCompositionEnd"
      />
      <button @click="clearSearch">취소</button>
    </div>
    <p class="my-stock-title">종목</p>

    <!-- 주식 목록 -->
    <ul v-if="stocks.length > 0" class="stock-list">
      <li
        v-for="(stock, index) in stocks"
        :key="index"
        class="stock-item"
        @click="showForm('B', stock.stockId)"
      >
        <div class="stock-name">
          {{ stock.stockName }}
          <span class="stock-eng">{{ stock.engName }}</span>
        </div>
        <div class="stock-info">
          <p v-if="stock.shortCode">{{ stock.shortCode }}</p>
          <p>{{ stock.market }}</p>
        </div>
      </li>
    </ul>

    <!-- 검색 결과가 없을 때 메시지 표시 -->
    <div v-if="!stocks.length && searchTerm.length > 0">
      <p>해당 종목이 없습니다.</p>
    </div>
    <OrderForm
      v-if="isFormVisible"
      :data="orderFormData"
      class="modal-overlay"
      @update="isCloseClicked"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import OrderForm from "@/components/OrderForm.vue";
import _ from "lodash";

const searchTerm = ref("");
const stocks = ref([]);
const isComposing = ref(false);

const stockPortfolioData = ref({});
const isLoading = ref(true);
const isFormVisible = ref(false);
const formType = ref("");
const selectStockId = ref("");

const isCloseClicked = () => {
  isFormVisible.value = false;
};

const orderFormData = computed(() => {
  if (formType.value == "S" || formType.value == "B")
    return {
      orderType: formType.value,
      stockName: stockPortfolioData.value.name,
      stockId: selectStockId.value,
      price: 0,
      quantity: 0,
    };
  return {
    orderType: formType.value,
    stockName: stockPortfolioData.value.name,
    shortCode: props.stockId,
    price: stockPortfolioData.value.avgPrice,
    quantity: stockPortfolioData.value.totalQuantity,
    recentPrice: stockPortfolioData.value.recentPrice,
  };
});

const showForm = (type, stockId) => {
  selectStockId.value = stockId;
  formType.value = type;
  isFormVisible.value = true;
};
// 디바운스를 이용한 검색
const debouncedFetchStockList = _.debounce(fetchStockList, 300);

// 검색어 변경 시 호출되는 함수
const onInputChange = (event) => {
  searchTerm.value = event.target.value;
  if (!isComposing.value) {
    debouncedFetchStockList();
  }
};

// 한글 입력이 끝난 후 호출되는 함수
const onCompositionEnd = () => {
  isComposing.value = false;
  debouncedFetchStockList(); // 한글 입력이 끝난 후 검색 실행
};

// 검색 결과 가져오는 함수
async function fetchStockList() {
  if (searchTerm.value.trim().length > 0) {
    try {
      const response = await axios.get("/api/stock/search", {
        params: { searchStock: searchTerm.value },
      });
      stocks.value = response.data;
    } catch (error) {
      console.error("Stock search error:", error);
      stocks.value = []; // 오류 발생 시 목록 초기화
    }
  } else {
    stocks.value = []; // 검색어가 없을 경우 목록 초기화
  }
}

// 검색어 초기화 함수
const clearSearch = () => {
  searchTerm.value = "";
  stocks.value = [];
};
</script>

<style scoped>
.stock-search-container {
  position: relative;
  padding-top: 0;
  padding-left: 0;
  padding-right: 8px;
  border-left: 0;
  width: 380px; /* 전체 너비 사용 */
  margin: 0 auto; /* 가운데 정렬 */
}

.search-bar {
  margin-top: 18px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between; /* 검색어와 버튼 사이 여유 공간 확보 */
  align-items: center;
  background-color: white;
  border-radius: 8px;
  box-shadow:
    2px 2px 2px rgba(0, 0, 0, 0.1),
    -2px 2px 2px rgba(0, 0, 0, 0.1),
    -2px -2px 2px rgba(0, 0, 0, 0.1);
  padding: 0px; /* 내부 패딩 */
}

input[type="text"] {
  width: 80%; /* 입력 필드의 너비 */
  padding: 8px;
  border: none;
  font-size: 16px;
  background: none;
  outline: none; /* 포커스 시 테두리 제거 */
}

button {
  width: 15%;
  background-color: transparent; /* 버튼 배경 투명 */
  border: none;
  font-size: 14px;
  color: #007bff; /* 파란색 텍스트 */
  cursor: pointer;
  outline: none;
}

.stock-list {
  list-style-type: none;
  padding: 0;
  width: 100%;
}

.my-stock-title {
  width: 100vw;
  margin-left: -24px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  font-weight: bold;
  margin-top: 0;
  padding: 0;
  color: #555;
  background-color: #f0f0f0;
  border-radius: 4px;
  padding: 0px 14px;
  margin-bottom: 0px;
}

.stock-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  padding: 15px 0;
  font-size: 16px;
}

.stock-name {
  font-weight: bold;
  color: #333;
  font-size: 16px;
}

.stock-eng {
  display: block;
  font-size: 14px;
  color: #888;
  margin-top: 3px;
}

.stock-info {
  text-align: right;
}

.stock-info p {
  margin: 0;
  font-size: 12px;
  color: #999;
}

.stock-info p:first-child {
  font-size: 14px;
  font-weight: bold;
  color: #000;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100; /* 화면 위에 오도록 z-index 설정 */
}
</style>
