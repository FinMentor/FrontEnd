<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import router from "@/router";

const route = useRoute();

const extractCode = (url) => {
  const urlParams = new URLSearchParams(url.split("?")[1]);
  return {
    code: urlParams.get("code"),
    state: urlParams.get("state"),
  };
};

const BASE = import.meta.env.VITE_API_URL;

const sendCodeToBackend = async (code, service, state = null) => {
  try {
    let endpoint;
    if (service === "kakao") {
      endpoint = `${BASE}/auth/login/code/${service}?code=${code}`;
    } else if (service == "naver") {
      if (!state) {
        throw new Error("requires a state parameter");
      }
      endpoint = `${BASE}/auth/login/code/${service}?code=${code}&state=${state}`;
    } else {
      throw new Error("Unsupported service");
    }

    const response = await axios.get(endpoint, {
      withCredentials: true,
    });
    console.log("백엔드 응답:", response.data);
    if (response.status === 200) {
      const accessToken = response.data.accessToken; // 로그인 성공 시 액세스 토큰 수신

      // 로컬 스토리지에 토큰 저장
      localStorage.setItem("accessToken", accessToken);
      router.push("/");
    }
  } catch (error) {
    console.error("에러 발생:", error);
    alert(error.response.data);
    router.push("/login");
  }
};

onMounted(() => {
  const currentUrl = window.location.href;
  const { code, state } = extractCode(currentUrl);
  const service = route.params.service;

  if (code && service) {
    sendCodeToBackend(code, service, state);
  } else {
    console.error(
      "URL에서 코드를 찾을 수 없거나 서비스 유형을 확인할 수 없습니다.",
    );
    router.push("/login");
  }
});
</script>
