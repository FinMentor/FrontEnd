<template>
  <div class="signup-container">
    <!-- 이용약관 동의 -->
    <div v-if="step === 1">
      <h2 class="section-title">이용약관</h2>
      <div class="content">
        <!-- 전체 동의 섹션 -->
        <div class="all-terms-agreement">
          <label class="custom-checkbox">
            <input
              v-model="allAgreed"
              type="checkbox"
              @change="toggleAllTerms"
            />
            <span class="checkmark"></span>
            <span class="term-text">이용약관 전체동의</span>
          </label>
        </div>
        <!-- 개별 약관 섹션 -->
        <div class="individual-terms">
          <div v-for="term in terms" :key="term.id" class="term-item">
            <div class="term-wrapper">
              <label class="custom-checkbox">
                <input
                  v-model="term.agreed"
                  type="checkbox"
                  @change="updateAllAgreed"
                />
                <span class="checkmark"></span>
                <span class="term-text">
                  <span v-if="term.required === 'Y'" class="required-text"
                    >[필수]</span
                  >
                  <span v-if="term.required === 'N'" class="optional-text"
                    >[선택]</span
                  >
                  {{ term.text }}
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 휴대폰 번호 입력 -->
    <div v-if="step === 2">
      <h2 class="section-title">휴대폰 번호</h2>
      <div class="content phone-input-container">
        <div class="input-group phone-input-group">
          <input
            v-model="phoneNumber"
            type="tel"
            placeholder="'-' 없이 입력"
            maxlength="11"
            @input="formatPhoneNumber"
          />
          <div class="auth-button-wrapper">
            <button
              class="phone-auth-btn"
              :disabled="!isPhoneNumberValid || isCountingDown || isVerified"
              @click="sendVerificationCode"
            >
              인증번호 요청
            </button>
          </div>
        </div>

        <!-- 인증번호 전송 메시지 placeholder -->
        <div class="verification-message-placeholder">
          <div v-if="showVerificationMessage" class="verification-message">
            {{ verificationMessage }}
          </div>
        </div>

        <div class="input-group phone-input-group">
          <input
            v-model="verificationCode"
            type="text"
            placeholder="인증번호"
            maxlength="6"
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
              @click="verifyPhone"
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

    <!-- 이름 입력 -->
    <div v-else-if="step === 3">
      <h2 class="section-title">이름</h2>
      <div class="content">
        <input
          v-model="name"
          type="text"
          placeholder="이름 입력"
          @input="validateName"
        />
        <p v-if="nameError" class="error-message">{{ nameError }}</p>
      </div>
    </div>

    <!-- 아이디 입력 -->
    <div v-else-if="step === 4">
      <h2 class="section-title">아이디</h2>
      <div class="content">
        <div class="input-group id-input-group">
          <input
            v-model="userId"
            type="text"
            placeholder="8~15자 영문 소문자 / 숫자"
            @input="validateUserId"
          />
          <div class="auth-button-wrapper">
            <button
              class="id-check-btn"
              :disabled="!isUserIdValid || isIdChecked"
              @click="checkIdDuplication"
            >
              중복 확인
            </button>
          </div>
        </div>
        <div class="verification-message-placeholder">
          <div v-if="showIdCheckMessage" :class="idCheckMessageClass">
            {{ idCheckMessage }}
          </div>
          <div v-if="showIdValidationError" class="error-message">
            8~15자 영문 소문자와 숫자
          </div>
        </div>
      </div>
    </div>

    <!-- 비밀번호 입력 -->
    <div v-else-if="step === 5">
      <h2 class="section-title">비밀번호</h2>
      <div class="content">
        <input
          v-model="password"
          type="password"
          placeholder="8~15자 영문/숫자/특수문자 조합"
          @input="validatePassword"
        />
        <div v-if="showPasswordError" class="error-message">
          8~15자 영문/숫자/특수문자 조합
        </div>
        <input
          v-model="passwordConfirmation"
          type="password"
          placeholder="비밀번호 재입력"
          @input="validatePasswordConfirmation"
        />
        <div v-if="showPasswordMismatchError" class="error-message">
          비밀번호가 일치하지 않습니다
        </div>
      </div>
    </div>

    <!-- 이메일 입력 -->
    <div v-else-if="step === 6">
      <h2 class="section-title">이메일</h2>
      <div class="content email-input-container">
        <div class="input-group email-input-group">
          <input
            v-model="email"
            type="email"
            placeholder="example@email.com"
            @input="validateEmail"
          />
          <div class="auth-button-wrapper">
            <button
              class="email-auth-btn"
              :disabled="
                !isEmailValid || isEmailCountingDown || isEmailVerified
              "
              @click="sendEmailVerificationCode"
            >
              인증번호 요청
            </button>
          </div>
        </div>

        <!-- 이메일 인증번호 전송 메시지 placeholder -->
        <div class="verification-message-placeholder">
          <div v-if="showEmailVerificationMessage" class="verification-message">
            {{ emailVerificationMessage }}
          </div>
        </div>

        <div class="input-group email-input-group">
          <input
            v-model="emailVerificationCode"
            type="text"
            placeholder="인증번호"
            maxlength="6"
          />
          <div class="confirm-button-timer-wrapper">
            <span
              v-if="isEmailCountingDown && !isEmailVerified"
              class="countdown-timer"
              >{{ formattedEmailTime }}</span
            >
            <button
              class="email-auth-btn"
              :disabled="!isEmailVerificationCodeValid || isEmailVerified"
              @click="verifyEmail"
            >
              확인
            </button>
          </div>
        </div>

        <!-- 이메일 인증번호 확인 메시지 placeholder -->
        <div class="verification-result-message-placeholder">
          <div
            v-if="showEmailVerificationResultMessage"
            :class="emailVerificationResultMessageClass"
          >
            {{ emailVerificationResultMessage }}
          </div>
        </div>
      </div>
    </div>

    <!-- 회원가입 완료 -->
    <div v-if="step === 7" class="completion-container">
      <div class="check-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      </div>
      <h2 class="completion-title">회원가입 완료</h2>
      <p class="completion-message">
        지금 바로 나만의 주식 리포트를 받아보세요.
      </p>
      <!-- 홈 버튼 추가 -->
      <button class="btn home-btn" @click="goToMainPage">홈으로</button>
    </div>

    <!-- Progress bar (모든 단계에 표시) -->
    <div v-if="step < 7" class="progress-container">
      <div class="progress-text">6단계 중 {{ currentStep }}단계</div>
      <div class="progress-bar">
        <div
          class="progress-fill"
          :style="{ width: `${(step / 6) * 100}%` }"
        ></div>
      </div>
    </div>

    <!-- 버튼 영역 (모든 단계에 표시) -->
    <div v-if="step < 7" class="button-section">
      <button
        class="btn next-btn"
        :class="{ 'next-btn-active': !isStepInvalid }"
        :disabled="isStepInvalid"
        @click="nextStep"
      >
        {{ step === 6 ? "가입 완료" : "다음" }}
      </button>
      <button v-if="step > 1" class="btn previous-btn" @click="previousStep">
        이전
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const step = ref(1);
const allAgreed = ref(false);
// const terms = ref([
//   { id: 1, text: "만 15세 이상입니다.", agreed: false, required: true },
//   { id: 2, text: "서비스 이용약관 동의", agreed: false, required: true },
//   { id: 3, text: "개인정보 수집 및 이용 동의", agreed: false, required: true },
// ]);
const terms = ref([]);
const termsAgreementDTOList = ref([]);

const fetchTerms = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/v1/terms-of-use",
    );
    terms.value = response.data.map((term) => ({
      id: term.termOfUseId,
      text: term.title,
      content: term.content,
      agreed: false,
      required: term.required,
    }));
  } catch (error) {
    console.error("약관 정보를 가져오는 데 실패했습니다:", error);
    if (error.response) {
      console.error("서버 응답:", error.response.data);
      console.error("상태 코드:", error.response.status);
    } else if (error.request) {
      console.error("응답을 받지 못했습니다:", error.request);
    } else {
      console.error("에러 메시지:", error.message);
    }
  }
};

onMounted(fetchTerms);

const phoneNumber = ref("");
const verificationCode = ref("");
const isCountingDown = ref(false);
const remainingTime = ref(180); // 3분(180초) 카운트다운
let timerInterval = null;
const phoneVerificationCode = ref("");
const verificationRequested = ref(false);
const phoneVerified = ref(false);

const name = ref("");
const nameError = ref("");

const userId = ref("");
const isUserIdValid = ref(false);
const isIdChecked = ref(false);
const showIdCheckMessage = ref(false);
const idCheckMessage = ref("");
const showIdValidationError = ref(false);

const password = ref("");
const passwordConfirmation = ref("");
const showPasswordError = ref(false);
const showPasswordMismatchError = ref(false);
const isPasswordValid = ref(false);

const email = ref("");
const emailVerificationCode = ref("");
const isEmailValid = ref(false);
const isEmailCountingDown = ref(false);
const isEmailVerified = ref(false);
const emailRemainingTime = ref(180);
let emailTimerInterval = null;
const showEmailVerificationMessage = ref(false);
const emailVerificationMessage = ref("");
const showEmailVerificationResultMessage = ref(false);
const emailVerificationResultMessage = ref("");
const isEmailVerificationSuccess = ref(false);

const isEmailVerificationCodeValid = computed(
  () => emailVerificationCode.value.length === 6,
);

const showVerificationMessage = ref(false);
const verificationMessage = ref("");

const showVerificationResultMessage = ref(false);
const verificationResultMessage = ref("");
const isVerificationSuccess = ref(false);
const isVerified = ref(false);

const currentStep = computed(() => Math.min(step.value, 6));

const isPhoneNumberValid = computed(() => phoneNumber.value.length === 11);
const isVerificationCodeValid = computed(
  () => verificationCode.value.length === 6,
);

const verificationResultMessageClass = computed(() => ({
  "verification-result-message": true,
  "verification-success": isVerificationSuccess.value,
  "verification-error": !isVerificationSuccess.value,
}));

const isStepInvalid = computed(() => {
  switch (step.value) {
    case 1:
      return !terms.value.every((term) => !term.required || term.agreed);
    case 2:
      return !isVerified.value;
    case 3:
      return !name.value || nameError.value !== "";
    case 4:
      return !userId.value || !isIdChecked.value || !isUserIdValid.value;
    case 5:
      return (
        !isPasswordValid.value ||
        !passwordConfirmation.value ||
        password.value !== passwordConfirmation.value
      );
    case 6:
      return !isEmailValid.value || !isEmailVerified.value;
    default:
      return false;
  }
});

function toggleAllTerms() {
  const newState = allAgreed.value;
  terms.value.forEach((term) => (term.agreed = newState));
}

function updateAllAgreed() {
  allAgreed.value = terms.value.every((term) => term.agreed);
}

function formatPhoneNumber() {
  phoneNumber.value = phoneNumber.value.replace(/\D/g, "").slice(0, 11);
}

async function sendVerificationCode() {
  if (isPhoneNumberValid.value && !isCountingDown.value && !isVerified.value) {
    const [phoneFirst, phoneMiddle, phoneLast] = phoneNumber.value
      .match(/(\d{3})(\d{4})(\d{4})/)
      .slice(1);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/sms/send",
        {
          phoneFirst,
          phoneMiddle,
          phoneLast,
        },
      );

      verificationMessage.value = "인증번호가 전송되었습니다.";
      showVerificationMessage.value = true;
      startCountdown();
    } catch (error) {
      console.error("인증번호 전송 중 오류 발생:", error);
      verificationMessage.value =
        "인증번호 전송에 실패했습니다. 다시 시도해주세요.";
      showVerificationMessage.value = true;
    }
  }
}

function startCountdown() {
  isCountingDown.value = true;
  remainingTime.value = 180;

  timerInterval = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--;
    } else {
      stopCountdown();
    }
  }, 1000);
}

function stopCountdown() {
  clearInterval(timerInterval);
  isCountingDown.value = false;
  remainingTime.value = 0;
}

const formattedTime = computed(() => {
  const minutes = Math.floor(remainingTime.value / 60);
  const seconds = remainingTime.value % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
});

function requestVerification() {
  if (isPhoneNumberValid.value && !isPhoneVerificationSent.value) {
    console.log("Requesting verification for:", phoneNumber.value);
    // 여기에 실제 인증번호 요청 로직을 추가하세요
    isPhoneVerificationSent.value = true;
  }
}

async function verifyPhone() {
  if (isVerificationCodeValid.value && !isVerified.value) {
    const [phoneFirst, phoneMiddle, phoneLast] = phoneNumber.value
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

      // 200
      verificationResultMessage.value = "인증번호가 확인되었습니다.";
      isVerificationSuccess.value = true;
      isVerified.value = true;
      stopCountdown();
      showVerificationResultMessage.value = true;
    } catch (error) {
      console.error("인증번호 확인 중 오류 발생:", error);
      isVerificationSuccess.value = false;

      if (error.response) {
        if (error.response.status === 400) {
          verificationResultMessage.value = "인증번호가 일치하지 않습니다.";
        } else {
          verificationResultMessage.value =
            error.response.data.message || "인증 처리 중 오류가 발생했습니다.";
        }
      } else if (error.request) {
        verificationResultMessage.value =
          "서버로부터 응답을 받지 못했습니다. 네트워크 연결을 확인해주세요.";
      } else {
        verificationResultMessage.value =
          "요청 설정 중 오류가 발생했습니다. 다시 시도해주세요.";
      }

      showVerificationResultMessage.value = true;
    }
  }
}

function validateName(event) {
  const koreanRegex = /^[가-힣]+$/;
  if (!koreanRegex.test(event.target.value)) {
    name.value = name.value.replace(/[^가-힣]/g, "");
    nameError.value = "한글만 입력 가능합니다.";
  } else {
    nameError.value = "";
  }
}

const idCheckMessageClass = computed(() => ({
  "verification-message": true,
  "verification-success": isIdChecked.value,
  "verification-error": !isIdChecked.value && showIdCheckMessage.value,
}));

function validateUserId() {
  const userIdRegex = /^[a-z0-9]{8,15}$/;
  isUserIdValid.value = userIdRegex.test(userId.value);
  showIdValidationError.value = userId.value.length > 0 && !isUserIdValid.value;

  if (isIdChecked.value) {
    isIdChecked.value = false;
    showIdCheckMessage.value = false;
  }
}

async function checkIdDuplication() {
  if (isUserIdValid.value && !isIdChecked.value) {
    // 임시 로직: 실제 API 호출 대신 setTimeout을 사용하여 비동기 작업 시뮬레이션
    setTimeout(() => {
      // 임시로 항상 사용 가능한 것으로 처리
      idCheckMessage.value = "사용 가능한 아이디입니다.";
      isIdChecked.value = true;
      showIdCheckMessage.value = true;
      showIdValidationError.value = false;
    }, 1000); // 1초 딜레이
  }
}

function validatePassword() {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]{8,15}$/;
  isPasswordValid.value = passwordRegex.test(password.value);
  showPasswordError.value = password.value.length > 0 && !isPasswordValid.value;
  validatePasswordConfirmation();
}

function validatePasswordConfirmation() {
  showPasswordMismatchError.value =
    passwordConfirmation.value.length > 0 &&
    password.value !== passwordConfirmation.value;
}

const formattedEmailTime = computed(() => {
  const minutes = Math.floor(emailRemainingTime.value / 60);
  const seconds = emailRemainingTime.value % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
});

const emailVerificationResultMessageClass = computed(() => ({
  "verification-result-message": true,
  "verification-success": isEmailVerificationSuccess.value,
  "verification-error": !isEmailVerificationSuccess.value,
}));

function validateEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  isEmailValid.value = emailRegex.test(email.value);
}

async function sendEmailVerificationCode() {
  if (
    isEmailValid.value &&
    !isEmailCountingDown.value &&
    !isEmailVerified.value
  ) {
    try {
      // 여기에 실제 이메일 인증번호 전송 API 호출 로직을 추가하세요
      // const response = await axios.post("이메일 인증번호 전송 API 엔드포인트", { email: email.value });

      emailVerificationMessage.value = "인증번호가 전송되었습니다.";
      showEmailVerificationMessage.value = true;
      startEmailCountdown();
    } catch (error) {
      console.error("이메일 인증번호 전송 중 오류 발생:", error);
      emailVerificationMessage.value =
        "인증번호 전송에 실패했습니다. 다시 시도해주세요.";
      showEmailVerificationMessage.value = true;
    }
  }
}

function startEmailCountdown() {
  isEmailCountingDown.value = true;
  emailRemainingTime.value = 180;

  emailTimerInterval = setInterval(() => {
    if (emailRemainingTime.value > 0) {
      emailRemainingTime.value--;
    } else {
      stopEmailCountdown();
    }
  }, 1000);
}

function stopEmailCountdown() {
  clearInterval(emailTimerInterval);
  isEmailCountingDown.value = false;
  emailRemainingTime.value = 0;
}

async function verifyEmail() {
  if (isEmailVerificationCodeValid.value && !isEmailVerified.value) {
    try {
      // 여기에 실제 이메일 인증번호 확인 API 호출 로직을 추가하세요
      // const response = await axios.post("이메일 인증번호 확인 API 엔드포인트", { email: email.value, verificationCode: emailVerificationCode.value });

      emailVerificationResultMessage.value = "이메일이 인증되었습니다.";
      isEmailVerificationSuccess.value = true;
      isEmailVerified.value = true;
      stopEmailCountdown();
      showEmailVerificationResultMessage.value = true;
    } catch (error) {
      console.error("이메일 인증번호 확인 중 오류 발생:", error);
      isEmailVerificationSuccess.value = false;
      emailVerificationResultMessage.value = "인증번호가 일치하지 않습니다.";
      showEmailVerificationResultMessage.value = true;
    }
  }
}

async function sendSignupData() {
  const phoneFirst = phoneNumber.value.slice(0, 3);
  const phoneMiddle = phoneNumber.value.slice(3, 7);
  const phoneLast = phoneNumber.value.slice(7);

  const signupData = {
    userId: userId.value,
    password: password.value,
    passwordConfirmation: passwordConfirmation.value,
    phoneFirst,
    phoneMiddle,
    phoneLast,
    phoneVerificationCode: verificationCode.value,
    name: name.value,
    email: email.value,
    emailVerificationCode: emailVerificationCode.value,
    termsAgreementDTOList: terms.value.map((term) => ({
      termsOfUseId: term.id,
      required: term.required,
    })),
  };

  try {
    const response = await axios.put("/api/auth/signup", signupData);
    console.log("Signup successful:", response.data);
    step.value = 7;
  } catch (error) {
    console.log("Signup failed:", error);
    console.log(userId.value);
    console.log(password.value);
    console.log(passwordConfirmation.value);
    console.log(phoneNumber.value);
    console.log(phoneFirst);
    console.log(phoneMiddle);
    console.log(phoneLast);
    console.log(verificationCode.value);
    console.log(name.value);
    console.log(email.value);
    console.log(emailVerificationCode.value);
    console.log(terms.value);
    console.log(signupData);
    console.log(termsAgreementDTOList.value);
  }
}

function nextStep() {
  if (!isStepInvalid.value) {
    if (step.value === 6) {
      sendSignupData();
    } else {
      step.value++;
    }
  }
}

function previousStep() {
  if (step.value > 1) {
    step.value--;
  }
}

function goToMainPage() {
  router.push("/login");
}
</script>

<style scoped>
.signup-container {
  padding: 32px 0 0 0;
}

.section-title {
  font-family: "Pretendard-Bold";
  font-size: 24px;
  margin-bottom: 24px;
}

.content {
  margin-bottom: 24px;
}

.term-item {
  margin-bottom: 16px;
}

.custom-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  position: relative;
  padding-left: 28px;
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  background-color: #fff;
  border: 2px solid var(--input-gray);
  border-radius: 50%;
}

.custom-checkbox:hover input ~ .checkmark {
  background-color: #f8f8f8;
}

.custom-checkbox input:checked ~ .checkmark {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.checkmark:after {
  content: "";
  position: absolute;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid var(--input-gray);
  border-width: 0 2px 2px 0;
  transform: translate(-10%, -5%) rotate(45deg);
  display: block;
}

.custom-checkbox input:checked ~ .checkmark:after {
  border-color: #fff;
}

.term-text {
  font-size: 16px;
  line-height: 1.5;
  display: flex;
  align-items: center;
}

.required-text {
  color: #ff3b30;
  padding-right: 6px;
  display: inline-flex;
  align-items: center;
}

.optional-text {
  padding-right: 6px;
  display: inline-flex;
  align-items: center;
}

.all-terms-agreement {
  margin-bottom: 16px;
  padding: 16px 0;
  border-bottom: 1px solid var(--input-gray);
}

.individual-terms {
  margin-top: 16px;
}

.term-wrapper {
  display: flex;
  align-items: center;
}

input[type="text"],
input[type="tel"],
input[type="password"],
input[type="email"] {
  width: 100%;
  padding: 12px 4px;
  font-size: 22px;
  border: none;
  border-bottom: 1px solid var(--input-gray);
  background-color: transparent;
  transition: border-color 0.3s;
}

input[type="text"]:focus,
input[type="tel"]:focus,
input[type="password"]:focus,
input[type="email"]:focus {
  outline: none;
  border-bottom-color: var(--primary-color);
}

input::placeholder {
  color: var(--input-gray);
  font-size: 18px;
}

.button-section {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 16px;
}

.btn {
  width: 100%;
  height: 50px;
  font-size: 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition-duration: 0s;
}

.next-btn {
  background-color: var(--inactive-button);
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

.progress-container {
  padding-bottom: 10px;
}

.previous-btn {
  background-color: var(--back-button);
  color: #ffffff;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background-color: var(--input-gray);
  border-radius: 5px;
}

.progress-fill {
  height: 100%;
  background-color: var(--primary-color);
  border-radius: 5px;
  transition: width 0.3s ease;
}

.progress-text {
  padding: 8px 0;
  font-size: 14px;
  color: #666;
  text-align: right;
  margin-right: 10px;
}

.phone-input-container {
  max-width: 100%;
}

.phone-input-group {
  display: flex;
  position: relative;
}

.phone-input-group input {
  width: 100%;
  padding: 8px 6px;
  /* font-size: 22px; */
  border: none;
  border-bottom: 1px solid var(--input-gray);
  border-radius: 0;
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
  padding: 6px 6px;
  background-color: var(--before-auth);
  color: var(--before-auth-text);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100px;
  height: 35px;
  font-size: 14px;
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

.verification-message-placeholder,
.verification-result-message-placeholder {
  min-height: 20px;
  margin-bottom: 15px;
  padding-top: 4px;
}

.verification-message,
.verification-result-message {
  height: 13px;
  font-size: 13px;
  text-align: left;
  padding-left: 5px;
}

.verification-message {
  color: var(--sub-text-gray);
}

.verification-success {
  color: var(--primary-color);
}

.verification-error {
  color: #ff4d4f;
}

.error-message {
  color: #ff4d4f;
  font-size: 12px;
  margin-top: 4px;
}

.id-input-group {
  display: flex;
  position: relative;
}

.id-input-group input {
  width: 100%;
  padding: 8px 6px;
  border: none;
  border-bottom: 1px solid var(--input-gray);
  border-radius: 0;
}

.id-check-btn {
  padding: 6px 6px;
  background-color: var(--before-auth);
  color: var(--before-auth-text);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100px;
  height: 35px;
  font-size: 14px;
}

.id-check-btn:disabled {
  background-color: #d3d3d3;
  color: #999999;
  cursor: not-allowed;
}

.id-check-btn:not(:disabled) {
  background-color: var(--primary-color);
  color: #ffffff;
}

.email-input-container {
  max-width: 100%;
}

.email-input-group {
  display: flex;
  position: relative;
}

.email-input-group input {
  width: 100%;
  padding: 8px 6px;
  border: none;
  border-bottom: 1px solid var(--input-gray);
  border-radius: 0;
}

.email-auth-btn {
  padding: 6px 6px;
  background-color: var(--before-auth);
  color: var(--before-auth-text);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100px;
  height: 35px;
  font-size: 14px;
}

.email-auth-btn:disabled {
  background-color: #d3d3d3;
  color: #999999;
  cursor: not-allowed;
}

.email-auth-btn:not(:disabled) {
  background-color: var(--primary-color);
  color: #ffffff;
}

.completion-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 5vh;
  height: 80vh;
  text-align: center;
  background-color: #ffffff;
}

.check-icon {
  width: 80px;
  height: 80px;
  background-color: var(--inactive-button);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.check-icon svg {
  width: 50px;
  height: 50px;
  stroke: var(--primary-color);
}

.completion-title {
  font-size: 32px;
  font-family: "Pretendard-bold";
  margin-bottom: 10px;
  color: #333333;
}

.completion-message {
  font-size: 16px;
  color: var(--inactive-button-text);
  margin-bottom: 60px;
}

.next-btn {
  width: 100%;
}

.home-btn {
  width: 100%;
  background-color: var(--primary-color);
  color: #ffffff;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  height: 50px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* hover와 active 상태에서 색상 유지 */
.home-btn:hover,
.home-btn:active {
  background-color: var(--primary-color); /* 색상이 바뀌지 않도록 */
  color: #ffffff;
}
</style>
