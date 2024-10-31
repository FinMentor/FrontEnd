<template>
  <div class="scrap-page">
    <!-- 탭 메뉴 -->
    <div class="tabs">
      <span
        :class="{ active: activeTab === 'report' }"
        @click="setActiveTab('report')"
        >리포트</span
      >
      <span
        :class="{ active: activeTab === 'news' }"
        @click="setActiveTab('news')"
        >뉴스</span
      >
    </div>

    <!-- 리포트 목록 -->
    <div v-if="activeTab === 'report'" class="list">
      <template v-if="reportList.length > 0">
        <div
          v-for="item in reportList"
          :key="item.id"
          class="swipeable"
          @touchstart="handleTouchStart($event, $event.currentTarget)"
          @touchmove="handleTouchMove($event, $event.currentTarget)"
          @touchend="handleTouchEnd"
        >
          <div class="list-item">
            <div class="text-content">
              <h4>{{ item.recentTrendTitle }}</h4>
              <h4>{{ item.stockTrendTitle }}</h4>
            </div>
          </div>
          <div class="delete-button-container">
            <button
              class="delete-button"
              @click="deleteSavedReport(item.dailyReportId)"
            >
              삭제
            </button>
          </div>
        </div>
      </template>
      <div v-else class="empty-state">
        <img
          src="@/assets/icons/alert-icon.svg"
          alt="알림 아이콘"
          class="empty-icon"
        />
        <p>저장된 목록이 없습니다!</p>
      </div>
    </div>

    <!-- 뉴스 목록 -->
    <div v-if="activeTab === 'news'" class="list">
      <template v-if="newsList.length > 0">
        <div
          v-for="item in newsList"
          :key="item.id"
          class="swipeable"
          @touchstart="handleTouchStart($event, $event.currentTarget)"
          @touchmove="handleTouchMove($event, $event.currentTarget)"
          @touchend="handleTouchEnd"
        >
          <div class="list-item">
            <div class="text-content">
              <h4>{{ item.title }}</h4>
              <p>{{ item.source }}</p>
            </div>
            <img :src="item.image" alt="대표 이미지" class="thumbnail" />
          </div>
          <div class="delete-button-container">
            <button class="delete-button" @click="deleteSavedNews(item.newsId)">
              삭제
            </button>
          </div>
        </div>
      </template>
      <div v-else class="empty-state">
        <img
          src="@/assets/icons/empty-icon.svg"
          alt="알림 아이콘"
          class="empty-icon"
        />
        <p>저장된 목록이 없습니다!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const activeTab = ref("news");
const reportList = ref([]);
const newsList = ref([]);

const setActiveTab = (tab) => {
  activeTab.value = tab;
};

// JWT 토큰을 가져오는 함수
const getToken = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    router.push({ path: "/login" }); // 로그인 페이지로 이동
    throw new Error("토큰이 없습니다. 로그인 페이지로 이동합니다.");
  }
  return token;
};

// 저장된 뉴스를 불러오는 함수
const fetchSavedNews = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_BASE_URL}/saved-news`, {
      headers: {
        Authorization: `Bearer ${token}`, // 요청 헤더에 토큰 추가
      },
    });
    newsList.value = response.data;
  } catch (error) {
    console.error("저장된 뉴스를 불러오는데 실패했습니다:", error);
  }
};

// 저장된 리포트를 불러오는 함수
const fetchSavedReports = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_BASE_URL}/saved-reports`, {
      headers: {
        Authorization: `Bearer ${token}`, // 요청 헤더에 토큰 추가
      },
    });
    reportList.value = response.data;
  } catch (error) {
    console.error("저장된 리포트를 불러오는데 실패했습니다:", error);
  }
};

// 뉴스 삭제 함수
const deleteSavedNews = async (newsId) => {
  if (!newsId) {
    console.error("Invalid newsId:", newsId);
    return;
  }
  try {
    const token = getToken();
    await axios.delete(`${API_BASE_URL}/saved-news/${newsId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // 요청 헤더에 토큰 추가
      },
    });
    fetchSavedNews(); // 삭제 후 뉴스 목록 다시 불러오기
  } catch (error) {
    console.error("뉴스 삭제에 실패했습니다:", error);
  }
};

// 리포트 삭제 함수
const deleteSavedReport = async (dailyReportId) => {
  if (!dailyReportId) {
    console.error("Invalid dailyReportId:", dailyReportId);
    return;
  }
  try {
    const token = getToken();
    await axios.delete(`${API_BASE_URL}/saved-reports/${dailyReportId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // 요청 헤더에 토큰 추가
      },
    });
    fetchSavedReports(); // 삭제 후 리포트 목록 다시 불러오기
  } catch (error) {
    console.error("리포트 삭제에 실패했습니다:", error);
  }
};

onMounted(() => {
  fetchSavedNews();
  fetchSavedReports();
});

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
    item.classList.add("swiped");
    isSwiping.value = false;
  }
};

const handleTouchEnd = () => {
  isSwiping.value = false;
};

onMounted(() => {
  fetchSavedNews();
  fetchSavedReports();
});
</script>

<style scoped>
.scrap-page {
  padding: 14px;
  padding-top: 20px;
}

.tabs {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
}

.tabs span {
  cursor: pointer;
  padding: 10px;
  font-weight: bold;
  color: #b0b0b0;
}

.tabs .active {
  color: #6e2ff4;
  border-bottom: 2px solid #6e2ff4;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.swipeable {
  display: flex;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 330px;
  height: 80px;
  background-color: #ffffff;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  transition: transform 0.3s ease;
}

.delete-button-container {
  width: 80px;
  background-color: var(--inactive-icon);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  transform: translateX(100%);
  transition: transform 0.3s ease;
}

.delete-button {
  background: none;
  color: white;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

.swipeable.swiped .list-item {
  transform: translateX(-80px);
}

.swipeable.swiped .delete-button-container {
  transform: translateX(0);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
}

.empty-icon {
  width: 40px;
  height: 40px;
  margin-bottom: 20px;
}

.empty-state p {
  color: #757575;
  font-size: 16px;
}

.text-content {
  flex-grow: 1;
  width: 246px;
  height: 55px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  margin-right: 10px;
}

.text-content h4,
.text-content p {
  margin: 0;
  font-size: 16px;
  color: #000;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}

.thumbnail {
  width: 63px;
  height: 60px;
  border-radius: 10px;
  object-fit: cover;
  margin-left: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
