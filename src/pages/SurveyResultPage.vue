<template>
  <div v-if="!isLoading" class="container survey-result-container">
    <!-- 사용자 투자 유형 분석 결과 -->
    <div v-if="investmentType" class="result-container">
      <h6 class="user-nickname">
        {{ userNickname }}님의 투자 유형 분석을 완료하였습니다!
      </h6>
      <!-- 투자 유형 분석 결과 섹션 -->
      <div class="investment-type-result mt-4">
        <p class="nickname-and-type">{{ userNickname }}님의 투자 유형은</p>

        <div class="investment-type-header">
          <!-- 투자 유형 ID에 따라 이미지를 동적으로 선택 -->
          <img
            class="type-image"
            :src="getImageByType(investmentType.investmentTypeId)"
            alt="Investment Type Image"
          />
          <div class="investment-type-content">
            <h3 :class="getColorByType(investmentType.investmentTypeId)">
              {{ investmentType.investmentTypeName }}
            </h3>
            <p>{{ investmentType.content }}</p>
          </div>
        </div>
      </div>

      <!-- 투자 전략 제시 섹션 -->
      <div class="investment-strategy mt-4">
        <div class="strategy-header">
          <img class="strategy-icon" src="@/assets/images/key.png" alt="Key" />
          <h4>
            {{ investmentType.investmentTypeName }}에게 필요한 전략을
            알려드릴게요
          </h4>
        </div>

        <div class="strategy-item">
          <h4>주식 배분</h4>
          <p>{{ investmentType.stockAllocationContent }}</p>
        </div>
        <div class="strategy-item">
          <h4>종목 선택</h4>
          <p>{{ investmentType.stockSelectionContent }}</p>
        </div>
        <div class="strategy-item">
          <h4>리스크 관리</h4>
          <p>{{ investmentType.riskManagementContent }}</p>
        </div>
      </div>

      <!-- 버튼 -->
      <div class="submit-button">
        <button class="btn btn-primary" @click="restartSurvey">
          설문 재진행
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { fetchSurveyResult } from "../services/surveyService"; // 서버에서 데이터를 가져오는 함수

// 상태 변수 선언
const investmentType = ref(null);
const userNickname = ref("");
const isLoading = ref(true); // 로딩 상태 변수
const router = useRouter();

// 로컬 스토리지에서 닉네임 불러오기
const loadUserNickname = () => {
  userNickname.value = sessionStorage.getItem("nickname") || "사용자";
};

// 투자 유형 ID에 따라 이미지를 동적으로 불러오는 함수
const getImageByType = (investmentTypeId) => {
  switch (investmentTypeId) {
    case 1:
      return new URL(
        "@/assets/images/raccoon_investmentType1.png",
        import.meta.url,
      ).href;
    case 2:
      return new URL(
        "@/assets/images/raccoon_investmentType2.png",
        import.meta.url,
      ).href;
    case 3:
      return new URL(
        "@/assets/images/raccoon_investmentType3.png",
        import.meta.url,
      ).href;
    case 4:
      return new URL(
        "@/assets/images/raccoon_investmentType4.png",
        import.meta.url,
      ).href;
    case 5:
      return new URL(
        "@/assets/images/raccoon_investmentType5.png",
        import.meta.url,
      ).href;
    default:
      return new URL(
        "@/assets/images/raccoon_investmentType1.png",
        import.meta.url,
      ).href;
  }
};

// 투자 유형 ID에 따른 글자 색상 설정 함수
const getColorByType = (investmentTypeId) => {
  switch (investmentTypeId) {
    case 1:
      return "type-color1";
    case 2:
      return "type-color2";
    case 3:
      return "type-color3";
    case 4:
      return "type-color4";
    case 5:
      return "type-color5";
    default:
      return "";
  }
};

// 설문 결과 불러오기 함수
const loadSurveyResult = async () => {
  try {
    const result = await fetchSurveyResult(); // 서버에서 설문 결과 불러오기
    investmentType.value = result; // 서버에서 받아온 데이터를 설정
  } catch (error) {
    console.error("설문 결과를 불러오는 중 오류가 발생했습니다.", error);
  } finally {
    isLoading.value = false;
  }
};

// 설문 재진행 버튼 클릭 시 호출되는 함수
const restartSurvey = () => {
  router.push("/survey");
};

// 컴포넌트가 마운트될 때 설문 결과와 닉네임을 로드
onMounted(() => {
  loadUserNickname(); // 로컬 스토리지에서 닉네임 불러오기
  loadSurveyResult(); // 설문 결과 불러오기
});
</script>

<style scoped>
.survey-result-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 10px;
  padding-top: 30px;
  overflow-y: auto;
  min-height: 110vh;
}

.user-nickname {
  text-align: center;
  color: rgb(0, 0, 0);
  font-weight: bold;
}

.investment-type-result {
  background-color: #6e2ff4;
  color: white;
  padding: 15px;
  border-radius: 10px;
}

.investment-type-header {
  display: flex;
}

.type-image {
  width: 80px;
  height: 80px;
  margin-right: 10px;
}

.investment-type-content {
  flex-grow: 1;
}

.investment-type-content h3 {
  margin: 0;
  font-size: 18px;
}

.investment-type-content p {
  margin-top: 5px;
  font-size: 13px;
}

.nickname-and-type {
  color: white;
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 3px;
}

.investment-strategy {
  background-color: #e8e8fc;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
}

.strategy-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.strategy-icon {
  width: 30px;
  height: 30px;
  margin-left: 0px;
  margin-right: 10px;
}

.strategy-header h4 {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.strategy-item {
  margin-bottom: 15px;
}

.strategy-item h4 {
  font-size: 14px;
  font-weight: bold;
  color: #6e2ff4;
}

.strategy-item p {
  margin-top: 5px;
  font-size: 13px;
  color: #4f4f4f;
}

.submit-button {
  text-align: center;
  margin-top: 20px;
}

.btn-primary {
  background-color: #6e2ff4;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #5b23d1;
}

/* 유형에 따라 글색 다르게 하기 위함 */
.type-color1 {
  color: #f1f1e1;
}

.type-color2 {
  color: #b4ecc5;
}

.type-color3 {
  color: #b4c4ec;
}

.type-color4 {
  color: #f6f676;
}

.type-color5 {
  color: #f5a6a6;
}
</style>
