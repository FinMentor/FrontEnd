<template>
  <div class="loading-overlay">
    <div class="loading-container">
      <!-- 너구리 아이콘 -->
      <img
        src="@/assets/icons/neoguri-icon.svg"
        alt="neoguri-icon"
        class="neoguri-icon"
      />
      <!-- 회전하는 동전 아이콘 -->
      <img
        src="@/assets/icons/coin-icon-kb.svg"
        alt="loading-icon"
        class="rotating-icon"
      />
      <!-- 동그라미 3개 -->
      <div class="bouncing-dots">
        <div
          class="dot"
          style="background-color: var(--point-color-pink)"
        ></div>
        <div
          class="dot"
          style="background-color: var(--point-color-yello)"
        ></div>
        <div
          class="dot"
          style="background-color: var(--point-color-mint)"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.loading-container {
  text-align: center;
  position: relative; /* 너구리 아이콘의 기준점 */
}

.neoguri-icon {
  width: 130px;
  height: 130px;
  position: relative; /* 기준점으로 설정 */
}

.rotating-icon {
  width: 100px;
  height: 100px;
  position: absolute;
  top: -3%; /* 너구리 아이콘의 중간 지점 */
  left: 92px; /* 너구리 아이콘과 간격 조정 */
  transform: translateY(-50%);
  animation: spin 1s linear infinite; /* 빙글빙글 도는 애니메이션 */
}

.bouncing-dots {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px; /* 동그라미와 아이콘 사이 간격 */
}

.dot {
  width: 20px;
  height: 20px;
  margin: 0 5px;
  border-radius: 50%;
  animation: bounce 0.6s infinite ease-in-out;
}

.dot:nth-child(1) {
  animation-delay: 0s;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
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
