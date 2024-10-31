<template>
  <Loading v-if="isLoading" />
  <div v-if="!isLoading" class="container">
    <OrderSummary :data="orderSummaryData" />
    <OrderHistory :data="orderHistoryData" />
    <div
      v-if="isStockButtonVisible == true"
      class="stock-order-button-container"
    >
      <button class="sell-button" @click="showForm('S')">매도</button>
      <button class="buy-button" @click="showForm('B')">매수</button>
    </div>
    <OrderForm
      v-if="isFormVisible"
      :data="orderFormData"
      class="order-modal-overlay"
      @update="isCloseClicked"
      @update-data="updateData"
    />
    <div
      v-if="headerStore.isEditModalVisible"
      class="edit-modal-overlay"
      @click="toggleModal"
    >
      <div class="modal-content" @click.stop>
        <button class="modal-button" @click="handleEdit">수정하기</button>
        <button class="modal-button" @click="handleSelectDelete">
          선택 삭제하기
        </button>
        <button class="modal-button" @click="handleDeleteAll">
          모두 삭제하기
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useHeaderStore } from "@/stores/headerStore";
import OrderSummary from "@/components/portfolio/OrderSummary.vue";
import OrderHistory from "@/components/portfolio/OrderHistory.vue";
import OrderForm from "@/components/OrderForm.vue";
import stockPortfolioService from "@/services/stockPortfolioService";
import Loading from "@/components/LoadingComponent.vue";

const props = defineProps({
  stockId: {
    type: String,
    required: true,
  },
});
const headerStore = useHeaderStore();
const stockPortfolioData = ref({});

const isLoading = ref(true);
const isFormVisible = ref(false);
const formType = ref("");
const isCloseClicked = () => {
  isFormVisible.value = false;
};

async function updateData() {
  Object.assign(stockPortfolioData.value, await fetchStockPortfolioData());
}

const fetchStockName = (stockName) => {
  headerStore.setStockTitle(stockName);
};
const fetchShortCode = (stockId) => {
  headerStore.setStockSubtitle(stockId);
};
const setHeaderButton = () => {
  headerStore.setStockPortfolioHeaderButton(true);
};
const toggleModal = () => {
  headerStore.triggerEditFunction();
};
const showForm = (type) => {
  formType.value = type;
  isFormVisible.value = true;
};

const orderSummaryData = computed(() => {
  if (
    !stockPortfolioData.value ||
    Object.keys(stockPortfolioData.value).length === 0
  )
    return {};

  return {
    stockName: stockPortfolioData.value.name,
    avgPrice: stockPortfolioData.value.avgPrice,
    quantity: stockPortfolioData.value.totalQuantity,
    recentPrice: stockPortfolioData.value.recentPrice,
  };
});
const orderFormData = computed(() => {
  if (formType.value == "S" || formType.value == "B")
    return {
      orderType: formType.value,
      stockName: stockPortfolioData.value.name,
      stockId: props.stockId,
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

const orderHistoryData = computed(() => {
  return stockPortfolioData.value.orders || [];
});
const isStockButtonVisible = computed(() => headerStore.isStockButtonVisible);
const isEditModalVisible = computed(() => {
  console.log("test" + headerStore.isEditModalVisible);
  return headerStore.isEditModalVisible;
});
const fetchStockPortfolioData = async () => {
  return await stockPortfolioService.fetchStockOrder(props.stockId);
};

onMounted(async () => {
  await updateData();
  fetchStockName(stockPortfolioData.value.name);
  fetchShortCode(stockPortfolioData.value.shortCode);
  setHeaderButton();
  isLoading.value = false;
});
</script>

<style scoped>
.container {
  font-family: "Pretendard-Bold";
  padding: 10px 0px 140px 0px;
}

.card-ui {
  border: 1px solid #e0e0e0;
  padding: 10px;
  border-radius: 12px;
  box-shadow:
    1px 1px 1px rgba(0, 0, 0, 0.1),
    -1px 1px 1px rgba(0, 0, 0, 0.1);
  font-family: "Pretendard-Bold";
}

.stock-order-button-container {
  position: fixed;
  bottom: 38px;
  left: 0;
  width: 100%;
  height: 120px;
  display: flex;
  background-color: #ffffff;
  justify-content: space-around;
  padding: 30px 0px 0px;
}

.sell-button {
  background-color: var(--sell-button-color);
}

.buy-button {
  background-color: var(--buy-button-color);
}

.sell-button,
.buy-button {
  justify-content: center;
  align-items: center;
  color: white;
  width: 168px;
  height: 50px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
}
.order-modal-overlay {
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

.edit-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: flex-end;
}

/* 슬라이드 효과가 있는 모달 창 */
.modal-content {
  justify-content: center;
  background-color: white;
  width: 100%;
  max-width: 400px;
  height: 450px;
  border-radius: 20px 20px 0 0;
  padding: 20px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  transform: translateY(100%);
  transition: transform 10s ease-in-out; /* 슬라이드 애니메이션을 더 길게 */
}

.modal-overlay .modal-content {
  transform: translateY(0); /* 모달이 올라오는 애니메이션 */
}
.modal-button {
  width: 100%;
  padding: 14px;
  font-size: 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: #000000;

  margin-bottom: 30px;
}
.modal-content button:nth-child(2) {
  background-color: var(--warning-color);
  color: #ffffff;
}
.modal-content button:nth-child(3) {
  background-color: var(--warning-color);
  color: #ffffff;
}
</style>
