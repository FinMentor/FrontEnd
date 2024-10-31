<template>
  <div v-if="!isLoading" class="profile-edit">
    <h1>{{ userData.nickname }}님의 정보</h1>
    <div class="profile-image-container">
      <img
        :src="userData.profileImageUrl"
        alt="Profile Image"
        class="profile-image"
      />
      <button class="edit-image-button" @click="triggerFileInput">
        <img
          src="@/assets/icons/image-edit-icon.svg"
          alt="edit icon"
          class="edit-icon"
        />
      </button>
      <!-- 파일 선택 input -->
      <input
        ref="fileInput"
        type="file"
        class="hidden-file-input"
        accept="image/*"
        @change="handleImageUpload"
      />
    </div>
    <div class="form-group">
      <label for="name">이름</label>
      <input id="name" v-model="userData.name" type="text" />
      <button class="clear-button" @click="userData.name = ''">x</button>
    </div>
    <div class="form-group">
      <label for="nickname">사용자 이름</label>
      <input id="nickname" v-model="userData.nickname" type="text" />
      <button class="clear-button" @click="userData.nickname = ''">x</button>
    </div>
    <div class="form-group">
      <label for="birthDate">생년월일</label>
      <input id="birthDate" v-model="userData.birthDate" type="date" />
    </div>
    <div class="form-group">
      <label for="phone">핸드폰 번호</label>
      <input
        id="phone"
        v-model="formattedPhone"
        type="text"
        placeholder="010-1234-5678"
        @input="onPhoneInput"
      />
    </div>
    <!-- 수정하기 버튼 -->
    <button class="update-button" @click="updateProfile">수정하기</button>
  </div>
  <div v-else-if="isLoading">
    <!-- 로딩 컴포넌트 -->
    <LoadingComponent />
  </div>
  <div v-else>사용자 데이터를 불러오지 못했습니다.</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import LoadingComponent from "@/components/LoadingComponent.vue";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const router = useRouter();

const userData = ref({
  name: "",
  nickname: "",
  phoneFirst: "",
  phoneMiddle: "",
  phoneLast: "",
  profileImageUrl: "",
  birthDate: "",
});

const isLoading = ref(true);

const getToken = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    router.push("/login");
    throw new Error("토큰이 없습니다. 로그인 페이지로 이동합니다.");
  }
  return token;
};

const fetchUserData = async () => {
  isLoading.value = true;
  try {
    const token = getToken();
    const response = await axios.get(`${API_BASE_URL}/users/profile_edit`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    userData.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.error("사용자 프로필을 불러오는데 실패했습니다:", error);
  } finally {
    isLoading.value = false;
  }
};

// 핸드폰 번호를 형식화된 문자열로 표시하는 계산 속성
const formattedPhone = computed({
  get() {
    return `${userData.value.phoneFirst}-${userData.value.phoneMiddle}-${userData.value.phoneLast}`.replace(
      /(^-|-$)/g,
      "",
    );
  },
  set(value) {
    const parts = value
      .replace(/[^0-9]/g, "")
      .match(/(\d{0,3})(\d{0,4})(\d{0,4})/);
    if (parts) {
      userData.value.phoneFirst = parts[1];
      userData.value.phoneMiddle = parts[2];
      userData.value.phoneLast = parts[3];
    }
  },
});

// 핸드폰 번호 입력 시 자동으로 형식을 적용하는 함수
const onPhoneInput = (event) => {
  const value = event.target.value.replace(/[^0-9]/g, "");
  let formatted = "";
  if (value.length <= 3) {
    formatted = value;
  } else if (value.length <= 7) {
    formatted = `${value.slice(0, 3)}-${value.slice(3)}`;
  } else {
    formatted = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
  }
  event.target.value = formatted;
};

const fileInput = ref(null);
const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      userData.value.profileImageUrl = e.target.result; // 프로필 이미지 업데이트
    };
    reader.readAsDataURL(file);
  }
};
const updateProfile = async () => {
  try {
    const token = getToken();
    await axios.put(`${API_BASE_URL}/users/profile_edit`, userData.value, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert("프로필이 성공적으로 업데이트되었습니다.");
  } catch (error) {
    console.error("프로필 업데이트 실패:", error);
    alert("프로필 업데이트에 실패했습니다.");
  }
};

onMounted(() => {
  fetchUserData();
});
</script>

<style scoped>
body {
  font-family: "Pretendard Medium", sans-serif;
}
.profile-edit {
  text-align: center;
  padding-top: 20px;
}

h1 {
  margin-bottom: 20px;
}

.profile-image-container {
  position: relative;
  display: inline-block;
}

.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.edit-image-button {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.edit-icon {
  width: 25px;
  height: 25px;
}

.form-group {
  margin: 10px 10px;
  position: relative;
}

label {
  display: block;
  margin: 15px 0 5px 0;
  text-align: left;
  padding-left: 15px;
}

input {
  width: calc(100% - 5px);
  height: 40px;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
  padding-left: 15px;
}

.clear-button {
  position: absolute;
  right: 10px;
  top: 50%;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
}
.hidden-file-input {
  display: none;
}
.update-button {
  background-color: #6200ea;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
}
</style>
