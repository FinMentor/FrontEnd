<template>
  <div class="stock-list">
    <StockItem
      v-for="stock in stocks"
      :key="stock.stockId"
      :stock="stock"
      @click="showForm('S', stock.stockId)"
    />
  </div>
  <OrderForm
    v-if="isFormVisible"
    :data="orderFormData"
    class="modal-overlay"
    @update="isCloseClicked"
    @update-data="updateData"
  />
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import StockItem from "@/components/StockItem.vue";
import OrderForm from "@/components/OrderForm.vue";

const props = defineProps({
  stocks: {
    type: Array,
    required: true,
  },
});

async function updateData() {
  window.location.reload();
}

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
</script>

<style scoped>
.stock-list {
  display: flex;
  flex-direction: column;
  gap: 0;
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
