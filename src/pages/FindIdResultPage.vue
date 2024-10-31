<template>
  <div class="find-id-result-page">
    <div class="content-wrapper">
      <div class="result-message">
        <template v-if="accountList.length > 0">
          입력하신 정보와 <br />일치하는 아이디가 있습니다.
        </template>
        <template v-else>
          입력하신 정보와 <br />일치하는 아이디가 없습니다.
        </template>
      </div>

      <div v-if="accountList.length > 0" class="privacy-info">
        개인정보 보호를 위해 일부는 '*'로 표시됩니다.
      </div>

      <div v-for="(account, index) in accountList" :key="index" class="id-info">
        <span class="user-id">
          <template v-if="!account.sns">
            {{ obfuscateUserId(account.userId) }}
          </template>
          <template v-else-if="account.sns === 'naver'">Naver 계정</template>
          <template v-else-if="account.sns === 'kakao'">Kakao 계정</template>
        </span>
        <span class="created-at"
          >가입일 {{ formatDate(account.createdAt) }}</span
        >
      </div>

      <div class="button-wrapper">
        <template v-if="accountList.length > 0">
          <button class="login-btn" @click="goToLogin">로그인</button>
        </template>
        <template v-else>
          <button class="back-btn" @click="goBack">이전</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();
const accountList = ref(JSON.parse(route.query.accounts || "[]"));
console.log("계정 리스트: ", accountList);

// 아이디 마스킹 함수
const obfuscateUserId = (userId) => {
  if (!userId) {
    return "아이디 없음";
  }
  return userId.replace(/(?<=.{2}).(?=.*.{2})/g, "*");
};

// 가입일 포맷팅 함수
const formatDate = (createdAt) => {
  if (!createdAt) {
    return "날짜 정보 없음";
  }
  const date = new Date(createdAt);
  if (isNaN(date.getTime())) {
    return "날짜 정보 없음";
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`; // YYYY-MM-DD 형식
};

// 로그인 페이지로 이동
const goToLogin = () => {
  router.push("/login");
};

// 아이디 찾기 페이지로 이동
const goBack = () => {
  router.push("/find-id");
};
</script>

<style scoped>
.find-id-result-page {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0px 0px 0px;
  box-sizing: border-box;
}

.content-wrapper {
  text-align: left;
  width: 100%;
}

.result-message {
  font-size: 22px;
  font-weight: bold;
  line-height: 1.5;
  margin-bottom: 20px;
}

.privacy-info {
  font-size: 12px;
  color: #8e8e8e;
  margin-bottom: 24px;
}

.id-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap; /* 화면이 좁을 경우 줄바꿈 허용 */
  font-weight: bold;
  width: 100%;
  margin: 24px 0;
  padding: 0 24px;
}

.user-id {
  font-size: 20px;
  letter-spacing: 1px;
}

.created-at {
  font-size: 14px;
  color: #8e8e8e;
}

.button-wrapper {
  width: 100%;
}

.login-btn {
  width: 100%;
  height: 50px;
  background-color: var(--primary-color);
  color: white;
  font-size: 20px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.back-btn {
  width: 100%;
  height: 50px;
  background-color: var(--back-button);
  color: white;
  font-size: 20px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 152px;
}
</style>
