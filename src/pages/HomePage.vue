<template>
  <div class="homeContainer">
    <div v-if="isLoading">
      <LoadingComponent />
    </div>

    <div v-show="!isLoading">
      <HomePortfolio @loaded="onComponentLoaded" />
      <HomeDailyTrend @loaded="onComponentLoaded" />
      <HomeRecommendStock @loaded="onComponentLoaded" />
    </div>
    <!-- 설문 상태가 'N'이면 팝업 띄우기 -->
    <div v-if="isSurveyPending" class="survey-popup">
      <div class="popup-content">
        <h3 class="popup-title">투자 유형 설문조사를 완료해 주세요</h3>
        <p class="popup-subtitle">계속하려면 설문조사를 진행해야 합니다.</p>
        <button class="popup-button" @click="redirectToSurvey">
          설문조사 하러 가기
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { checkSurveyStatus } from "../services/surveyService";
import HomeDailyTrend from "../components/home/HomeDailyTrend.vue";
import HomePortfolio from "../components/home/HomePortfolio.vue";
import HomeRecommendStock from "../components/home/HomeRecommendStock.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";

const isSurveyPending = ref(false);
const router = useRouter();
const isLoading = ref(true);
const loadingCount = ref(3);

const onComponentLoaded = () => {
  loadingCount.value -= 1;
  if (loadingCount.value === 0) {
    isLoading.value = false;
  }
};

const checkSurveyStatusAndUpdate = async () => {
  try {
    const surveyStatus = await checkSurveyStatus(); // surveyService 사용
    isSurveyPending.value = surveyStatus === "N";
  } catch (error) {
    console.error("Error checking survey status:", error);
  }
};

const redirectToSurvey = () => {
  router.push("/survey");
};

onMounted(() => {
  checkSurveyStatusAndUpdate();
});
</script>

<style scoped>
.homeContainer {
  padding: 0px 0px 100px 0px;
}
.survey-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background-color: white;
  padding: 23px;
  border-radius: 14px;
  text-align: center;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 330px;
  width: 100%;
}

.popup-title {
  font-size: 19px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.popup-subtitle {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
}

.popup-button {
  background-color: #6e2ff4;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.margin-10 {
  margin-bottom: 10px;
}
</style>
