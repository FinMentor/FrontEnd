<template>
  <div v-if="isLoading" class="loading-container">
    <!-- 유저 닉네임을 포함한 로딩 텍스트 -->
    <div class="loading-text">
      <h2>
        {{ userNickname }}님의 설문 답변을<br />
        바탕으로 투자 유형을<br />
        분석하고 있어요
      </h2>
    </div>

    <!-- 동전 아이콘 애니메이션 -->
    <div class="loading-overlay">
      <img
        src="@/assets/icons/coin-icon-kb.svg"
        alt="loading-icon"
        class="bouncing-icon"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { fetchSurveyResult } from "../services/surveyService"; // 설문 결과 가져오기 함수

const userNickname = ref("");
const isLoading = ref(true); // 로딩 상태 변수
const router = useRouter();

let hasNavigated = false; // 라우팅 중복 방지 플래그

onMounted(async () => {
  // 로컬 스토리지에서 닉네임을 불러옴
  // userNickname.value = localStorage.getItem('nickname') || '사용자';
  userNickname.value = sessionStorage.getItem("nickname") || "사용자"; // 세션 스토리지에서 닉네임 불러오기

  try {
    // 설문 결과를 서버에서 가져오는 동안 로딩 상태 유지
    await fetchSurveyResult();
    // 3초 동안 로딩 화면 유지
    setTimeout(() => {
      // 설문 결과를 성공적으로 가져오면 로딩을 멈추고 결과 페이지로 이동
      isLoading.value = false;
      router.push("/survey-result");
      hasNavigated = true;
    }, 3000); // 3초 후 이동
  } catch (error) {
    console.error("설문 결과를 불러오는 중 오류가 발생했습니다.", error);
    // 오류 처리 (예: 오류 페이지로 이동)
  }
});
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--primary-color); /* 배경 색 설정 */
  color: var(--main-card-color);
  font-family: "Pretendard-Medium", sans-serif;
}

.loading-text h2 {
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 60px;
  color: var(--main-card-color);
  font-family: "Pretendard-Bold", sans-serif;
}

.loading-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
}

.bouncing-icon {
  width: 150px;
  height: 150px;
  animation: bounce 1.5s infinite ease-in-out; /* 위아래로 움직이는 애니메이션 */
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-40px); /* 위아래로 움직이는 높이 설정 */
  }
}
</style>
