<template>
  <div class="login-container">
    <!-- 1. 아이디 및 비밀번호 입력 섹션 -->
    <div class="input-section">
      <!-- 아이디 입력 -->
      <div class="input-group">
        <label for="userId">아이디</label>
        <input
          id="userId"
          v-model="userId"
          type="text"
          placeholder="아이디를 입력해주세요."
        />
      </div>
      <!-- 비밀번호 입력 -->
      <div class="input-group">
        <label for="password">비밀번호</label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
        />
      </div>
    </div>

    <!-- 2. 로그인 버튼 -->
    <div class="login-button-section">
      <button class="login-btn" @click="login">로그인</button>
    </div>

    <!-- 3. 옵션 섹션 (로그인 유지, 아이디 찾기, 비밀번호 찾기) -->
    <div class="options-section">
      <div class="options-container">
        <div class="remember-me-container">
          <label class="custom-checkbox" for="rememberMe">
            <input id="rememberMe" v-model="rememberMe" type="checkbox" />
            <span class="checkmark"></span>
            로그인 유지
          </label>
        </div>
        <div class="find-options-container">
          <div class="find-id-div" @click="goToFindId">
            <span>아이디 찾기</span>
          </div>
          <div class="separator-div">
            <span class="separator">|</span>
          </div>
          <div class="find-password-div" @click="goToFindPassword">
            <span>비밀번호 찾기</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 4. 소셜 로그인 버튼 섹션 -->
    <div class="social-login-section">
      <div class="social-login naver">
        <a :href="naverLoginUrl">
          <img
            src="@/assets/images/naver_login.png"
            class="naver-login-btn"
            alt="네이버 로그인"
          />
        </a>
      </div>
      <div class="social-login kakao">
        <a :href="kakaoLoginUrl">
          <img
            src="@/assets/images/kakao_login.png"
            class="kakao-login-btn"
            alt="카카오 로그인"
          />
        </a>
      </div>
    </div>

    <!-- 5. 회원가입 버튼 섹션 -->
    <div class="signup-section">
      <div class="signup" @click="goToSignUp">회원가입</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { fetchUserNickname } from "@/services/surveyService";

const userId = ref("");
const password = ref("");
const rememberMe = ref(false);
const BASE = `${import.meta.env.VITE_API_URL}/auth/login`;
const kakaoClientId = import.meta.env.VITE_KAKAO_REST_API_KEY;
const naverClientId = import.meta.env.VITE_NAVER_CLIENT_ID;
const redirectUri = import.meta.env.VITE_REDIRECT_URI;

const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${redirectUri}/kakao&response_type=code`;
const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientId}&redirect_uri=${redirectUri}/naver&state=random_state`;

const router = useRouter();

const login = async () => {
  try {
    sessionStorage.removeItem("nickname");
    const response = await axios.post(
      BASE,
      {
        userId: userId.value,
        password: password.value,
        rememberMe: rememberMe.value ? "Y" : "N",
      },
      { withCredentials: true },
    );

    if (response.status === 200) {
      const accessToken = response.data.accessToken;
      localStorage.setItem("accessToken", accessToken);

      const nickname = await fetchUserNickname(accessToken); // 서버에서 닉네임 받기

      if (nickname) {
        sessionStorage.setItem("nickname", nickname); // 세션 스토리지에 닉네임 저장
        console.log(`닉네임 저장됨: ${nickname}`);
      } else {
        console.error("닉네임을 가져오지 못했습니다.");
      }

      router.push("/");
    }
  } catch (error) {
    alert(error.response.data);
  }
};

const goToFindId = () => {
  router.push("/find-id");
};

const goToFindPassword = () => {
  router.push("/find-password");
};

const goToSignUp = () => {
  router.push("/signup");
};
</script>

<style scoped>
.login-container {
  width: 100%;
  max-width: 390px;
  min-height: 100vh;
  padding: 20px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  margin: 0 auto;
}

.input-section {
  width: 100%;
  margin-bottom: 16px;
}

.input-group {
  width: 100%;
  margin-bottom: 16px;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-family: "Pretendard-Bold";
}

.input-group > input {
  width: 100%;
  padding: 12px;
  font-size: 15px;
  border: 1px solid var(--input-gray);
  border-radius: 6px !important;
}

.input-group input::placeholder {
  font-size: 13px;
  color: var(--input-gray);
}

.input-group input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.login-button-section {
  width: 100%;
  margin-bottom: 16px;
}

.login-btn {
  width: 100%;
  height: 50px;
  background-color: var(--primary-color);
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  line-height: 42px;
}

.options-section {
  width: 100%;
  margin-bottom: 24px;
  font-size: 12px;
}

.options-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 22px;
}

.remember-me-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.custom-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 12px;
  height: 100%;
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  width: 19px;
  height: 19px;
  background-color: #fff;
  border: 2px solid var(--input-gray);
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
  position: relative;
}

.custom-checkbox input:checked + .checkmark {
  border-color: var(--primary-color);
  background-color: var(--primary-color);
}

.checkmark::after {
  content: "";
  position: absolute;
  display: block;
  left: 50%;
  top: 50%;
  width: 5px;
  height: 10px;
  border: solid var(--input-gray);
  border-width: 0 2px 2px 0;
  transform: translate(-55%, -55%) rotate(45deg);
}

.custom-checkbox input:checked + .checkmark::after {
  border-color: white;
}

.find-options-container {
  display: flex;
  align-items: center;
  height: 100%;
}

.find-id-div,
.find-password-div {
  display: flex;
  align-items: center;
  height: 100%;
}

.separator {
  color: var(--input-gray);
  margin: 0 8px;
  height: 100%;
  display: flex;
  align-items: center;
}

.social-login-section {
  width: 100%;
}

.social-login {
  width: 100%;
  margin: 8px 0;
}

.kakao-login-btn,
.naver-login-btn {
  width: 100%;
  border: none;
  cursor: pointer;
}

.signup-section {
  margin-top: 16px;
}

.signup {
  font-size: 12px;
  cursor: pointer;
  color: #000;
}
</style>
