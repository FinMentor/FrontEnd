<template>
  <div class="settings-page">
    <div class="section">
      <h2>계정 관리</h2>
      <router-link to="/account-management" class="item">
        <span>개인정보 변경</span>
        <span>></span>
      </router-link>
      <div class="item">
        <span>자동 로그인 사용</span>
        <ToggleSwitch />
      </div>
      <div class="item" @click="showLogoutModal = true">
        <span>로그아웃</span>
      </div>
    </div>

    <hr />

    <div class="section">
      <h2>화면 설정</h2>
      <div class="item">
        <span>초기화면 설정</span>
        <span>홈 ></span>
      </div>
      <div class="item">
        <span>다크 모드 설정</span>
        <ToggleSwitch />
      </div>
    </div>

    <hr />

    <div class="section">
      <h2>정보</h2>
      <div class="item">
        <span>이용 약관</span>
        <span>></span>
      </div>
      <div class="item">
        <span>개인정보 처리방침</span>
        <span>></span>
      </div>
    </div>

    <LogoutModal
      v-if="showLogoutModal"
      @close="showLogoutModal = false"
      @logout="logout"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import ToggleSwitch from "@/components/ToggleSwitch.vue";
import LogoutModal from "@/components/LogoutModal.vue";

const router = useRouter();
const showLogoutModal = ref(false);

const logout = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("Access Token이 존재하지 않습니다.");
    }

    // 서버로 로그아웃 요청 보내기 (Access Token을 Authorization 헤더에 포함)
    const response = await axios.post(
      "http://localhost:8080/api/v1/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      },
    );

    if (response.status === 200) {
      localStorage.removeItem("accessToken");
      document.cookie =
        "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      showLogoutModal.value = false;

      const kakaoLogoutUrl = response.data.kakaoLogoutUrl;

      if (kakaoLogoutUrl) {
        // 카카오 로그아웃 URL이 있을 경우
        const redirectUrl = encodeURIComponent(
          `${window.location.origin}/auth/logout/kakao`,
        );
        const finalKakaoLogoutUrl = `${kakaoLogoutUrl}&state=${redirectUrl}`;

        // 카카오 로그아웃 페이지로 이동
        window.location.href = finalKakaoLogoutUrl;
      } else {
        // 일반 로그아웃 후 /main으로 리다이렉트
        router.push("/main");
      }
    }
  } catch (error) {
    console.error("로그아웃 실패: ", error);
    if (error.response) {
      console.error("서버 응답: ", error.response.data);
    }
    alert("로그아웃 처리 중 오류 발생");
  }
};
</script>

<style scoped>
.settings-page {
  padding: 16px;
  padding-top: 20px;
  background-color: #fff;
}

.section {
  margin-bottom: 16px;
}

h2 {
  font-size: 16px;
  font-family: bold;
  margin-bottom: 8px;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}

hr {
  border: none;
  border-top: 1px solid #bbb;
  margin: 16px 0;
}
</style>
