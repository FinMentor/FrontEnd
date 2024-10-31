<template>
  <div class="card-ui">
    <div class="portfolio">
      <h2>포트폴리오</h2>
      <img
        class="next-button"
        src="@/assets/icons/nextButton-icon.svg"
        @click="movePortfolio"
      />
    </div>
    <section>
      <div class="home-portfolio">
        <DonutChart
          class="donut-chart"
          :data="stockData"
          :width="390"
          :height="350"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import DonutChart from "@/components/DoughnutChart.vue";
import RenewToken from "@/services/renewToken";
import axios from "axios";
import { useRouter } from "vue-router";
import MyCookie from "@/services/myCookie";
const emit = defineEmits(["loaded", "onComponentLoaded"]);

// API URL 및 상태 관리
const BASE = `${import.meta.env.VITE_API_URL}/stockportfolio`;
const portfolio = reactive([]);
const stockData = ref([]);
const token = localStorage.getItem("accessToken");
const router = useRouter();
const renewToken = new RenewToken("/auth/login/renew");
const myCookie = new MyCookie();
const refreshToken = myCookie.getCookie("refreshToken");
const movePortfolio = () => {
  router.push("/portfolio");
};

// 포트폴리오 데이터 로드 및 차트 초기화
const createPortfolio = async () => {
  try {
    const response = await axios.get(BASE, {
      headers: { Authorization: `Bearer ${token}` },
    });

    Object.assign(portfolio, response.data);

    stockData.value = portfolio
      .sort((a, b) => b.totalPrice - a.totalPrice) // totalPrice 값으로 내림차순 정렬
      .map((stock) => ({
        name: stock.stockName,
        value: stock.totalPrice,
      }));
  } catch (err) {
    console.error("createPortfolio err :", err.message);

    if (err.response && err.response.status === 500) {
      renewToken
        .renew(refreshToken)
        .then((data) => {
          // 토큰 갱신 성공
          localStorage.setItem("accessToken", data.accessToken);
          window.location.href = "/";
        })
        .catch((err) => {
          // 오류 처리
          console.error("renewToken err : ", err);
        });
    }
  }
};

// 컴포넌트가 마운트되면 포트폴리오 데이터 생성
onMounted(async () => {
  await createPortfolio();
  emit("loaded");
});
</script>

<style scoped>
.home-portfolio {
  width: 100%;
  height: 260px;
  position: relative;
}
.donut-chart {
  position: relative;
  top: -40px;
}
h2 {
  font-size: 18px;
  padding-top: 10px;
}

.card-ui {
  margin-bottom: 16px;
  border: 1px solid #e0e0e0;
  padding: 10px;
  margin-top: 12px;
  border-radius: 12px;
  box-shadow:
    1px 1px 1px rgba(0, 0, 0, 0.1),
    -1px 1px 1px rgba(0, 0, 0, 0.1);
}

.portfolio {
  font-family: "Pretendard-Bold";
  display: flex;
}

.next-button {
  margin-left: auto;
  padding-right: 5px;
}
</style>
