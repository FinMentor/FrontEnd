<template>
  <div class="button-container">
    <button class="sell-button" @click="goToSellPage">매도</button>
    <button class="buy-button" @click="goToBuyPage">매수</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

// Define the methods
const goToSellPage = () => {
  router.push({ path: "/myStocklist" });
};

const goToBuyPage = () => {
  router.push({ path: "/stocksearch" });
};
</script>

<style scoped>
.button-container {
  display: flex;
  width: 350px;
  justify-content: space-between;
}

.sell-button,
.buy-button {
  width: 48%;
  padding: 10px;
  font-size: 16px;
  color: white;
  border: none;
  border-radius: 8px;
  margin-bottom: 10px;
}

.sell-button {
  background-color: var(--bear-color);
}

.buy-button {
  background-color: var(--bull-color);
}
</style>
