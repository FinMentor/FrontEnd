<template>
  <div class="notification-page">
    <div class="settings-toggle">
      <label>알림설정</label>
      <ToggleSwitch v-model="notificationEnabled" />
    </div>
    <div class="notification-list">
      <div
        v-for="notification in notifications"
        :key="notification.notificationId"
        class="swipeable"
        @touchstart="handleTouchStart($event, $event.currentTarget)"
        @touchmove="handleTouchMove($event, $event.currentTarget)"
        @touchend="handleTouchEnd"
      >
        <div class="notification-item" @click="test">
          <div class="icon-and-type">
            <div class="icon">
              <img :src="getIcon(notification.messageType)" alt="icon" />
            </div>
            <div class="content">
              <p class="type">
                {{ getNotificationType(notification.messageType) }}
              </p>
              <p class="time">{{ timeAgo(notification.createdAt) }}</p>
            </div>
          </div>
          <!-- DB에서 가져온 메시지 표시 -->
          <p class="message">{{ notification.message }}</p>
          <p class="sub-message">자세히 보기</p>
        </div>
        <div class="delete-button-container">
          <button
            class="delete-button"
            @click.stop="deleteNotification(notification.notificationId)"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ToggleSwitch from "@/components/ToggleSwitch.vue";
import axios from "axios";
import priceIcon from "@/assets/notification-icons/price-change.svg";
import recommendationIcon from "@/assets/notification-icons/recommendation.svg";
import reportIcon from "@/assets/notification-icons/report.svg";
import { useRouter } from "vue-router";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const notificationEnabled = ref(true);
const notifications = ref([]);
const router = useRouter();

// 토큰을 가져오는 함수
const getToken = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    router.push({ path: "/login" });
    throw new Error("토큰이 없습니다. 로그인 페이지로 이동합니다.");
  }
  return token;
};

const fetchNotifications = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_BASE_URL}/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    notifications.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
  }
};

const deleteNotification = async (id) => {
  try {
    const token = getToken();
    await axios.delete(`${API_BASE_URL}/notifications/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    notifications.value = notifications.value.filter(
      (n) => n.notificationId !== id,
    );
    console.log(`Notification with ID ${id} deleted.`);
  } catch (error) {
    console.error("Failed to delete notification:", error);
  }
};

const getIcon = (type) => {
  switch (type) {
    case "P":
      return priceIcon;
    case "S":
      return recommendationIcon;
    case "R":
      return reportIcon;
    default:
      return "";
  }
};

const getNotificationType = (type) => {
  switch (type) {
    case "P":
      return "가격변동 알림";
    case "S":
      return "추천종목 알림";
    case "R":
      return "리포트 알림";
    default:
      return "";
  }
};

const timeAgo = (date) => {
  const diff = Date.now() - new Date(date).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  return days > 0 ? `${days}일 전` : hours > 0 ? `${hours}시간 전` : "방금 전";
};

const startX = ref(0);
const isSwiping = ref(false);

const handleTouchStart = (event, item) => {
  startX.value = event.touches[0].clientX;
  item.classList.remove("swiped");
  isSwiping.value = true;
};

const handleTouchMove = (event, item) => {
  if (!isSwiping.value) return;
  const touchX = event.touches[0].clientX;
  const diffX = startX.value - touchX;
  if (diffX > 50) {
    // 스와이프 범위 설정
    item.classList.add("swiped");
    isSwiping.value = false;
  }
};

const handleTouchEnd = () => {
  isSwiping.value = false;
};

onMounted(async () => {
  await fetchNotifications();
});
</script>

<style scoped>
p {
  margin: 0;
}
.notification-page {
  position: relative;
  padding-top: 20px;
}

.settings-toggle {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
  margin-right: 0;
}
.settings-toggle label {
  margin-right: 10px;
}

.notification-list {
  display: flex;
  flex-direction: column;
  margin-left: -25px;
  width: 100vw;
}

.swipeable {
  display: flex;
  overflow: hidden;
  position: relative;
}

.notification-item {
  flex: 1;
  transition: transform 0.3s ease;
  background-color: #f3f1fe;
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  white-space: nowrap;
}

.delete-button-container {
  width: 80px; /* 삭제 버튼의 고정된 너비 */
  background-color: var(--inactive-icon);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: absolute; /* 삭제 버튼을 목록 옆에 고정 */
  right: 0;
  top: 0;
  height: 90%; /* 삭제 버튼 높이를 목록 높이와 동일하게 */
  transform: translateX(100%); /* 기본적으로 목록 밖으로 숨김 */
  transition: transform 0.3s ease; /* 슬라이드 애니메이션 */
  margin-bottom: 10px;
}
.delete-button {
  background: none;
  color: white;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

.swipeable {
  display: flex;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.swipeable .notification-item {
  flex: 1;
  transition: transform 0.3s ease;
  background-color: #f3f1fe;
  padding: 10px 15px 0px 15px;
  margin-bottom: 10px;
  box-sizing: border-box;
  height: 100px; /* 높이 고정 */
  overflow: hidden;
  white-space: nowrap;
}

.swipeable.swiped .notification-item {
  transform: translateX(-80px); /* 삭제 버튼에 맞춰 왼쪽으로 밀림 */
}

.swipeable.swiped .delete-button-container {
  transform: translateX(0); /* 삭제 버튼이 목록과 나란히 나타남 */
}

.notification-item .icon-and-type {
  display: flex;
  align-items: center;
}

.notification-item .icon {
  margin-right: 8px;
}

.notification-item .content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
}

.notification-item .type {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 0;
  color: var(--sub-text-gray);
}

.notification-item .time {
  color: #a1a1a1;
  font-size: 13px;
  margin-left: auto;
}

.notification-item .message,
.notification-item .sub-message {
  margin-left: 44px;
  margin-bottom: 5px;
}

.sub-message {
  font-size: 13px;
  color: #a1a1a1;
}
</style>
