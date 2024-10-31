<template>
  <header class="header">
    <div v-if="!showBackButton" class="logo-section">
      <img class="logo-img" src="@/assets/images/logo-gray.png" />
    </div>
    <button v-if="showBackButton" class="back-button" @click="goBack">
      <img src="@/assets/icons/backButton-icon.svg" alt="Back" />
    </button>
    <div v-if="isDailyReportPage" class="header-title">
      <div class="title">일일 동향 리포트</div>
    </div>
    <div v-if="isRecommendStockPage" class="header-title">
      <div class="title">AI 추천 종목</div>
    </div>
    <div v-if="isPortfolioPage" class="header-title">
      <div class="title">자산 현황</div>
    </div>
    <div v-if="isMyProfilePage" class="header-title">
      <div class="title">MY페이지</div>
    </div>
    <div v-if="isInterestPage" class="header-title">
      <div class="title">관심항목</div>
    </div>
    <div v-if="isSettingsPage" class="header-title">
      <div class="title">설정</div>
    </div>
    <div v-if="isAlertPage" class="header-title">
      <div class="title">관심항목</div>
    </div>
    <div v-if="isAccountManagementPage" class="header-title">
      <div class="title">개인정보</div>
    </div>
    <div v-if="isMyStockListPage" class="header-title">
      <div class="title">자산 보유 현황</div>
    </div>
    <div
      v-if="isStockPage && stockName != '' && shortCode != ''"
      class="header-stock-section"
    >
      <div class="stockRow">
        <div class="stockName">
          {{ stockName }}
        </div>
        <div class="stockShortCode">
          {{ shortCode }}
        </div>
      </div>
    </div>

    <!-- 기존의 template 안에 header-title 부분 추가 -->
    <div class="header-title">
      <h4>{{ pageTitle }}</h4>
    </div>

    <div class="header-actions"></div>
    <!-- <button
      v-if="isStockPortfolioPage"
      class="stock-edit-icon"
      @click="toggleModal"
    >
      <img src="@/assets/icons/edit-form-icon.svg" />
    </button> -->
    <img
      v-if="isHomePage"
      class="notification-icon"
      src="@/assets/icons/notification-icon.svg"
      @click="moveNotifications"
    />
  </header>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useHeaderStore } from "@/stores/headerStore";
const router = useRouter();
const route = useRoute();
const isHomePage = ref(false);
const isStockPage = computed(() => {
  return route.name === "stockPage" || route.name === "stockPortfolioPage";
});

const headerStore = useHeaderStore();

const showBackButton = computed(() => {
  return router.currentRoute.value.name !== "home";
});

const stockName = computed(() => headerStore.stockName);
const shortCode = computed(() => headerStore.shortCode);
const toggleModal = () => {
  headerStore.triggerEditFunction();
};
const isDailyReportPage = computed(() => {
  return route.name === "dailyReportPage";
});
const isPortfolioPage = computed(() => {
  return route.name === "portfolioPage";
});
const isMyProfilePage = computed(() => {
  return route.name === "myProfilePage";
});
const isInterestPage = computed(() => {
  return route.name === "interestPage";
});
const isSettingsPage = computed(() => {
  return route.name === "settingsPage";
});
const isAccountManagementPage = computed(() => {
  return route.name === "accountManagementPage";
});
const isRecommendStockPage = computed(() => {
  return route.name === "recommendStockPage";
});
const isStockPortfolioPage = computed(() => {
  return route.name === "stockPortfolioPage";
});
const isMyStockListPage = computed(() => {
  return route.name === "myStockListPage";
});
const pageTitle = computed(() => {
  if (route.name === "survey") {
    return "설문조사";
  }
  if (route.name === "survey-result") {
    return "투자유형 분석";
  }
  if (route.name === "daily-report") {
    return "일간 리포트";
  }
  if (route.name === "portfolio") {
    return "포트폴리오";
  }
  if (route.name === "my-profile") {
    return "마이페이지";
  }
  if (route.name === "settings") {
    return "설정";
  }
  return "";
});

const goBack = () => router.back();

const moveNotifications = () => {
  router.push("/notifications");
};

watchEffect(() => {
  isHomePage.value = route.name === "home";
});
</script>

<style scoped>
p {
  margin: 0px;
}
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 1000;
  padding: 12px 8px 12px 16px;
  gap: 8px;
  isolation: isolate;
  height: 48px;
  background-color: var(--main-card-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  left: 0;
  right: 0;
}

.back-button {
  padding: 8px;
  background: none;
  border: none;
}

.header-title {
  font-family: "Pretendard-Bold", sans-serif;
  margin-top: 10px;
  position: absolute;
  font-size: 14px;
  left: 50%;
  transform: translateX(-50%); /* 가로 가운데 정렬 */
  padding-bottom: 0; /* 아래 패딩 제거 */
}
.header-stock-section {
  font-family: "Pretendard-Bold", sans-serif;
  position: absolute;
  left: 52%;
  transform: translateX(-52%); /* 가로 가운데 정렬 */
  display: flex;
  flex-direction: row;
  padding-bottom: 0;
  /* 아래 패딩 제거 */
}
.header-title {
  font-family: "Pretendard-Bold", sans-serif;
  position: absolute;
  left: 52%;
  transform: translateX(-52%); /* 가로 가운데 정렬 */
}
.stockName {
  font-size: 16px;
  padding-top: 10px;
  line-height: 15px;
}
.stockShortCode {
  text-align: center;
  color: #9ea6b8;
  font-size: 12px;
}
.header-actions {
  flex: none;
  order: 1;
  flex-grow: 0;
}
.title {
  display: block;
  font-weight: bold;
  font-size: 16px;
  color: black;
}
.stock-edit-icon {
  height: 22px;
  width: 22px;
  position: absolute;
  right: 10%;
  background: none;
  border: none;
}
.notification-icon {
  position: absolute;
  left: 89%;
}
.logo-section {
  padding: 20px 0 20px 0;
}

.logo-section > img {
  width: 60px;
}
</style>
