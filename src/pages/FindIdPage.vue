<template>
  <div class="find-id-page">
    <div class="find-id-container">
      <div class="content-wrapper">
        <div class="input-section">
          <!-- 이름 입력창 div -->
          <div class="input-group">
            <input id="name" v-model="name" type="text" placeholder="이름" />
          </div>

          <!-- 휴대폰번호 입력창 div -->
          <div class="input-group phone-input-group">
            <input
              id="phone"
              v-model="phone"
              type="text"
              placeholder="휴대폰 번호 '-' 제외하고 입력"
              @input="formatPhoneNumber"
            />
            <div class="auth-button-wrapper">
              <button
                class="phone-auth-btn"
                :disabled="!isPhoneValid || isCountingDown || isVerified"
                @click="sendVerificationCode"
              >
                인증 번호
              </button>
            </div>
          </div>

          <!-- 인증번호 전송 메시지 placeholder -->
          <div class="verification-message-placeholder">
            <div v-if="showVerificationMessage" class="verification-message">
              {{ verificationMessage }}
            </div>
          </div>

          <!-- 인증번호 입력창 div + 카운트다운 타이머 + 확인 버튼 -->
          <div class="input-group phone-input-group">
            <input
              id="verificationCode"
              v-model="verificationCode"
              type="text"
              placeholder="인증번호"
            />
            <div class="confirm-button-timer-wrapper">
              <span
                v-if="isCountingDown && !isVerified"
                class="countdown-timer"
                >{{ formattedTime }}</span
              >
              <button
                class="phone-auth-btn"
                :disabled="!isVerificationCodeValid || isVerified"
                @click="verifyCode"
              >
                확인
              </button>
            </div>
          </div>

          <!-- 인증번호 확인 메시지 placeholder -->
          <div class="verification-result-message-placeholder">
            <div
              v-if="showVerificationResultMessage"
              :class="verificationResultMessageClass"
            >
              {{ verificationResultMessage }}
            </div>
          </div>
        </div>
      </div>

      <div class="footer-section">
        <!-- 다음 버튼 영역 -->
        <div class="next-button-section">
          <button
            class="next-btn"
            :class="{ 'next-btn-active': !isFormInvalid }"
            :disabled="isFormInvalid"
            @click="submitFindId"
          >
            다음
          </button>
        </div>

        <!-- 비밀번호 찾기 링크 -->
        <div class="find-password-link">
          <span class="forgot-password">비밀번호를 잊으셨나요?</span>
          <span class="find-password" @click="goToFindPassword"
            >비밀번호 찾기</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const name = ref("");
const phone = ref("");
const verificationCode = ref("");
const isCountingDown = ref(false);
const remainingTime = ref(180); // 3분(180초) 카운트다운
let timerInterval = null;

const showVerificationMessage = ref(false);
const verificationMessage = ref("");

const showVerificationResultMessage = ref(false);
const verificationResultMessage = ref("");
const isVerificationSuccess = ref(false);
const isVerified = ref(false);

const router = useRouter();

const isPhoneValid = computed(() => phone.value.length === 11);
const isVerificationCodeValid = computed(
  () => verificationCode.value.length > 0,
);
const isFormInvalid = computed(
  () => name.value === "" || phone.value === "" || !isVerified.value,
);

const verificationResultMessageClass = computed(() => ({
  "verification-result-message": true,
  "verification-success": isVerificationSuccess.value,
  "verification-error": !isVerificationSuccess.value,
}));

const formatPhoneNumber = () => {
  phone.value = phone.value.replace(/\D/g, "").slice(0, 11);
};

const sendVerificationCode = async () => {
  const [phoneFirst, phoneMiddle, phoneLast] = phone.value
    .match(/(\d{3})(\d{4})(\d{4})/)
    .slice(1);

  try {
    const response = await axios.post("http://localhost:8080/api/v1/sms/send", {
      phoneFirst,
      phoneMiddle,
      phoneLast,
    });

    verificationMessage.value = "인증번호가 전송되었습니다.";
    showVerificationMessage.value = true;
    startCountdown();
  } catch (error) {
    console.error("인증번호 전송 중 오류 발생:", error);
    verificationMessage.value =
      "인증번호 전송에 실패했습니다. 다시 시도해주세요.";
    showVerificationMessage.value = true;
  }
};

const startCountdown = () => {
  isCountingDown.value = true;
  remainingTime.value = 180;

  timerInterval = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--;
    } else {
      stopCountdown();
    }
  }, 1000);
};

const stopCountdown = () => {
  clearInterval(timerInterval);
  isCountingDown.value = false;
  remainingTime.value = 0;
};

const formattedTime = computed(() => {
  const minutes = Math.floor(remainingTime.value / 60);
  const seconds = remainingTime.value % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
});

const verifyCode = async () => {
  const [phoneFirst, phoneMiddle, phoneLast] = phone.value
    .match(/(\d{3})(\d{4})(\d{4})/)
    .slice(1);

  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/sms/verification",
      {
        phoneFirst,
        phoneMiddle,
        phoneLast,
        phoneVerificationCode: verificationCode.value,
      },
    );

    // 성공적인 응답이면 (상태 코드 200)
    verificationResultMessage.value = "인증번호가 확인되었습니다.";
    isVerificationSuccess.value = true;
    isVerified.value = true;
    stopCountdown();
    showVerificationResultMessage.value = true;
  } catch (error) {
    console.error("인증번호 확인 중 오류 발생:", error);
    isVerificationSuccess.value = false;

    if (error.response) {
      // 서버가 응답을 반환한 경우
      if (error.response.status === 400) {
        // 인증번호가 맞지 않은 경우
        verificationResultMessage.value = "인증번호가 일치하지 않습니다.";
      } else {
        // 다른 상태 코드의 경우
        verificationResultMessage.value =
          error.response.data.message || "인증 처리 중 오류가 발생했습니다.";
      }
    } else if (error.request) {
      // 요청이 전송되었으나 응답을 받지 못한 경우
      verificationResultMessage.value =
        "서버로부터 응답을 받지 못했습니다. 네트워크 연결을 확인해주세요.";
    } else {
      // 요청 설정 중 오류가 발생한 경우
      verificationResultMessage.value =
        "요청 설정 중 오류가 발생했습니다. 다시 시도해주세요.";
    }

    showVerificationResultMessage.value = true;
  }
};

const submitFindId = async () => {
  if (isFormInvalid.value) {
    return;
  }

  const [phoneFirst, phoneMiddle, phoneLast] = phone.value
    .match(/(\d{3})(\d{4})(\d{4})/)
    .slice(1);

  const BASE = `${import.meta.env.VITE_API_URL}/auth/find-id`;

  try {
    const response = await axios.post(BASE, {
      name: name.value,
      phoneFirst,
      phoneMiddle,
      phoneLast,
      phoneVerificationCode: verificationCode.value,
    });

    // 아이디 찾기 성공 시 결과 페이지로 이동
    router.push({
      name: "FindIdResult",
      query: {
        accounts: JSON.stringify(response.data),
      },
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // 회원을 찾지 못한 경우에도 결과 페이지로 이동
      router.push({
        name: "FindIdResult",
        query: {
          accounts: JSON.stringify([]),
        },
      });
    } else {
      // 기타 에러 처리
      console.error("아이디 찾기 요청 중 오류 발생:", error);
      // 필요에 따라 사용자에게 에러 메시지 표시
    }
  }
};

const goToFindPassword = () => {
  router.push("/find-password");
};
</script>

<style scoped>
.find-id-page {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.find-id-container {
  width: 100%;
  max-width: 390px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0px 0 60px 0;
}

.content-wrapper {
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.input-section {
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.footer-section {
  margin-top: auto;
  padding-bottom: 390px;
}

.input-group {
  width: 100%;
  margin-bottom: 20px;
  position: relative;
}

.input-group > input {
  width: 100%;
  padding: 12px;
  font-size: 15px;
  border: 1px solid var(--input-gray);
  border-radius: 6px !important;
}

.input-group > input::placeholder {
  font-size: 15px;
  color: var(--input-gray);
}

.input-group > input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.phone-input-group {
  display: flex;
  position: relative;
}

.phone-input-group input {
  flex-grow: 1;
  padding-right: 110px;
}

.auth-button-wrapper,
.confirm-button-timer-wrapper {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
}

.phone-auth-btn {
  padding: 6px 12px;
  background-color: var(--before-auth);
  color: var(--before-auth-text);
  border: none;
  border-radius: 8px !important;
  cursor: pointer;
  width: 88px;
  font-size: 15px;
}

.phone-auth-btn:disabled {
  background-color: #d3d3d3;
  color: #999999;
  cursor: not-allowed;
}

.phone-auth-btn:not(:disabled) {
  background-color: var(--primary-color);
  color: #ffffff;
}

.countdown-timer {
  margin-right: 8px;
  font-size: 15px;
  color: #ff4d4f;
  white-space: nowrap;
}

.next-button-section {
  width: 100%;
  margin-bottom: 16px;
}

.next-btn {
  width: 100%;
  height: 60px;
  background-color: #e8e8fc;
  color: var(--inactive-button);
  font-size: 20px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  line-height: 60px;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.next-btn-active {
  background-color: var(--primary-color);
  color: #ffffff;
}

.next-btn:disabled {
  background-color: var(--inactive-button);
  color: var(--inactive-button-text);
  cursor: not-allowed;
}

.find-password-link {
  margin-top: 16px;
  font-size: 13px;
  color: #8e8e8e;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
  width: 100%;
}

.forgot-password {
  flex-shrink: 0;
}

.find-password {
  text-decoration: underline;
  cursor: pointer;
  flex-shrink: 0;
}

.verification-message-placeholder {
  min-height: 20px;
}

.verification-result-message-placeholder {
  min-height: 20px;
}

.verification-message {
  color: var(--sub-text-gray);
  font-size: 13px;
  margin-top: -15px;
  margin-bottom: 15px;
  text-align: left;
  padding-left: 5px;
}

.verification-result-message {
  font-size: 13px;
  margin-top: -15px;
  margin-bottom: 15px;
  text-align: left;
  padding-left: 5px;
}

.verification-success {
  color: var(--primary-color);
}

.verification-error {
  color: #ff4d4f;
}
</style>
