<template>
  <div>
    <div v-if="isLoading">
      <LoadingComponent />
    </div>
    <div v-show="!isLoading">
      <div class="logo-section">
        <img class="logo-img" src="@/assets/images/logo-gray.png" />
      </div>
      <TrendStock @loaded="onComponentLoaded" />
      <div class="gap-div"></div>
      <RecommendStock @loaded="onComponentLoaded" />
    </div>
  </div>
</template>

<script setup>
import TrendStock from "../components/dailyreport/TrendStock.vue";
import RecommendStock from "../components/dailyreport/RecommendStock.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";
import { ref } from "vue";

const isLoading = ref(true);
const loadingCount = ref(2);

const onComponentLoaded = () => {
  loadingCount.value -= 1;
  if (loadingCount.value === 0) {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.logo-section {
  padding: 20px 0 20px 0;
}

.logo-section > img {
  width: 60px;
}

.gap-div {
  height: 32px;
}
</style>
