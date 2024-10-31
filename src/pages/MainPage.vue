<template>
  <div class="home-container">
    <!-- 로고 이미지 -->
    <img
      src="@/assets/images/logo.png"
      alt="너굴"
      class="logo"
      :style="{ transform: `translateY(${logoPosition}px)` }"
    />
    <!-- 로그인 버튼 -->
    <button
      class="login-button"
      :class="{ fadeIn: showButton }"
      @click="goToLogin"
    >
      시작하기
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const showButton = ref(false);
const logoPosition = ref(0);

const goToLogin = () => {
  router.push("/login");
};

onMounted(() => {
  // 로고와 버튼 애니메이션을 동시에 시작
  setTimeout(() => {
    logoPosition.value = -150; // 로고를 위로 200px 이동
    showButton.value = true; // 버튼 표시
  }, 2000);
});
</script>

<style scoped>
.home-container {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: var(--primary-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.logo {
  width: 136px;
  height: 54px;
  position: absolute;
  top: calc(50% - 54px / 2);
  transition: transform 1s ease-in-out;
}

.login-button {
  width: 330px;
  height: 50px;
  position: absolute;
  bottom: 200px; /* 버튼 위치 고정 */
  background-color: white;
  border: none;
  border-radius: 15px;
  color: var(--primary-color);
  font-size: 18px;
  font-weight: bold;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.5s ease-in-out,
    visibility 0.5s ease-in-out;
  cursor: pointer;
}

.login-button.fadeIn {
  opacity: 1;
  visibility: visible;
}
</style>
