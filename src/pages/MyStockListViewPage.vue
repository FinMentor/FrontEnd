<template>
  <div class="stock-portfolio">
    <div v-if="loading">
      <LoadingComponent />
    </div>

    <div v-else>
      <div v-if="stocks.length > 0">
        <StockList :stocks="stocks" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import StockList from "@/components/StockList.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";

// JWT 토큰을 가져오는 함수 (토큰이 없을 경우 로그인 페이지로 이동)
const getToken = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    router.push({ path: "/login" }); // 로그인 페이지로 이동
    throw new Error("토큰이 없습니다. 로그인 페이지로 이동합니다.");
  }
  return token;
};

const stocks = ref([]);
const loading = ref(true); // 데이터를 불러오는 중인지 여부를 추적하는 변수
const BASE = `${import.meta.env.VITE_API_URL}`; // API base URL 설정

onMounted(() => {
  const token = getToken(); // 토큰 가져오기

  axios
    .get(`${BASE}/stock`, {
      headers: {
        Authorization: `Bearer ${token}`, // 요청 헤더에 토큰 추가
      },
    })
    .then((response) => {
      stocks.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching stock data:", error);
    })
    .finally(() => {
      loading.value = false; // 로딩이 완료되면 false로 설정
    });
});
</script>

<style scoped>
.stock-portfolio {
  margin-top: 16px;
  padding-right: 8px;
  padding-bottom: 70px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}
.loading-image {
  padding-top: 200px;
  width: 200px; /* 원하는 크기로 설정 */
  animation: spin 0.5s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
