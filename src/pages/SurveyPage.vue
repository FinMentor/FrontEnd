<template>
  <div class="container mt-5 survey-container">
    <!-- 진행률 바 및 질문 번호 표시 -->
    <div class="progress-label-container">
      <div class="progress-label">{{ questionId }}/{{ maxQuestions }}</div>
    </div>

    <!-- 진행률 바 -->
    <div class="progress mb-4">
      <div
        class="progress-bar"
        role="progressbar"
        :style="{ width: progressPercentage + '%' }"
        aria-valuenow="progressPercentage"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>

    <div v-if="question" class="question-wrapper">
      <!-- 질문 텍스트를 감싸는 div에 테두리 적용 -->
      <div class="question-container">
        <p>{{ question.content }}</p>
      </div>

      <!-- 옵션 리스트 -->
      <div class="options">
        <ul class="list-group">
          <li
            v-for="option in question.options"
            :key="option.questionOptionId"
            :class="{
              'list-group-item': true,
              'selected-option': selectedOption === option.questionOptionId,
            }"
            @click="toggleOption(option.questionOptionId)"
          >
            <label class="form-check-label">{{ option.content }}</label>
          </li>
        </ul>
      </div>
    </div>

    <div v-else>
      <p>질문을 불러오는 중입니다...</p>
    </div>

    <!-- 이전 및 다음 버튼 -->
    <div class="row mt-4">
      <div class="col">
        <button
          :disabled="questionId === 1"
          class="btn prev-button w-100"
          @click="prevQuestion"
        >
          이전
        </button>
      </div>
      <div class="col">
        <button
          :class="selectedOption ? 'button-enabled' : 'button-disabled'"
          :disabled="!selectedOption"
          class="btn next-button w-100"
          @click="nextQuestion"
        >
          {{ questionId === maxQuestions ? "제출" : "다음" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router"; // vue-router import
import {
  fetchQuestion,
  submitAnswer,
  submitSurveyResult,
} from "../services/surveyService";

// 상태 변수 선언
const question = ref(null);
const questionId = ref(1);
const maxQuestions = 7;
const selectedOption = ref(null); // 선택된 옵션 상태 초기화
const userNickname = ref(sessionStorage.getItem("nickname") || "사용자"); // 로컬 스토리지에서 닉네임 불러오기
const router = useRouter(); // 라우터 객체

// 진행률 계산
const progressPercentage = computed(() => {
  return (questionId.value / maxQuestions) * 100;
});

// 설문 질문 불러오기 함수
const loadQuestion = async () => {
  try {
    question.value = await fetchQuestion(questionId.value);
    selectedOption.value = null; // 질문이 로드될 때마다 선택 옵션 초기화
  } catch (error) {
    console.error("질문을 불러오는 중 오류가 발생했습니다.", error);
  }
};

// 이전 질문으로 이동
const prevQuestion = async () => {
  if (questionId.value > 1) {
    questionId.value--;
    await loadQuestion();
  }
};

// 다음 질문으로 이동 및 답변 제출
const nextQuestion = async () => {
  if (selectedOption.value) {
    await submitAnswer(questionId.value, selectedOption.value);

    if (questionId.value < maxQuestions) {
      questionId.value++;
      await loadQuestion();
      window.scrollTo({ top: 0, behavior: "smooth" }); // 페이지 상단으로 스크롤
    } else {
      await submitSurveyResult(); // 설문 결과 제출
      router.push("/survey-loading");
    }
  }
};

// 옵션 선택/해제 기능
const toggleOption = (optionId) => {
  if (selectedOption.value === optionId) {
    selectedOption.value = null; // 이미 선택된 옵션을 다시 클릭하면 해제
  } else {
    selectedOption.value = optionId;
  }
};

// 설문 페이지에서 닉네임을 세션 스토리지에서 불러오기
onMounted(async () => {
  // userNickname.value = sessionStorage.getItem('nickname') || '사용자'; // 세션 스토리지에서 닉네임 불러오기
  await loadQuestion(); // 질문 로드
});
</script>

<style scoped>
.survey-container {
  max-width: 600px;
  margin: 0 auto;
  padding-top: 20px;
  height: 120vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.progress-label-container {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  font-weight: bold;
}

.progress-bar {
  background-color: #6a3ef9;
  transition: width 0.4s ease;
}

.question-wrapper {
  margin-bottom: 40px;
}

.question-container {
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-weight: bold;
  margin-bottom: 50px;
  padding-top: 35px;
}

.options {
  padding: 10px;
  margin-top: 20px;
}

.list-group-item {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: transparent;
  cursor: pointer;
  text-align: center;
  font-weight: bold;
  transition: background-color 0.2s ease;
}

.list-group-item:hover {
  background-color: white;
}

.selected-option {
  background-color: #e8e8fc !important;
  color: #000000 !important;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.prev-button {
  background-color: #4f4f4f !important;
  color: white !important;
}

.next-button {
  background-color: #6e2ff4 !important;
  color: white !important;
}

.button-disabled {
  background-color: #e8e8fc !important;
  color: #d8d8d8 !important;
}

.button-enabled {
  background-color: #6e2ff4 !important;
  color: #ffffff !important;
}
</style>
