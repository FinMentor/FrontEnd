import { createRouter, createWebHistory } from "vue-router";
import StockPage from "@/pages/StockPage.vue";
import SurveyPage from "@/pages/SurveyPage.vue";
import SurveyLoadingPage from "@/pages/SurveyLoadingPage.vue";
import SurveyResultPage from "@/pages/SurveyResultPage.vue";
import MyProfilePage from "@/pages/MyprofilePage.vue";
import InterestPage from "@/pages/InterestPage.vue";
import NotificationsPage from "@/pages/NotificationsPage.vue";
import ProfileEditPage from "@/pages/ProfileEditPage.vue";
import SavedPage from "@/pages/SavedPage.vue";
import SettingsPage from "@/pages/SettingsPage.vue";
import DailyReportPage from "@/pages/DailyReportPage.vue";
import HomePage from "@/pages/HomePage.vue";
import StockPortfolioPage from "@/pages/StockPortfolioPage.vue";
import StockSearchPage from "@/pages/StockSearch.vue";
import MyStockListViewPage from "@/pages/MyStockListViewPage.vue";
import AccountManagement from "@/pages/AccountManagement.vue";
import StockPortfolioDetailPage from "@/pages/StockPortfolioDetailPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import FindIdPage from "@/pages/FindIdPage.vue";
import FindIdResultPage from "@/pages/FindIdResultPage.vue";
import AuthLoginHandler from "@/components/AuthLoginHandler.vue";
import MainPage from "@/pages/MainPage.vue";
import RecommendStockPage from "@/pages/RecommendStockPage.vue";
import SignUpPage from "@/pages/SignUpPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomePage },
    {
      path: "/stock/:stockId",
      name: "stockPage",
      component: StockPage,
      props: true,
    },
    {
      path: "/stock/:stockId/portfolio",
      name: "stockPortfolioPage",
      component: StockPortfolioDetailPage,
      props: true,
    },
    { path: "/survey", name: "survey", component: SurveyPage }, // Survey 경로 추가
    { path: "/survey-loading", component: SurveyLoadingPage }, // SurveyLoading 경로추가
    {
      path: "/survey-result",
      name: "survey-result",
      component: SurveyResultPage,
    }, // SurveyResult 경로추가
    {
      path: "/myProfile", // MyProfile 경로 추가
      component: MyProfilePage,
      name: "myProfilePage",
      props: true,
    },
    { path: "/interest", component: InterestPage, name: "interestPage" },
    { path: "/notifications", component: NotificationsPage },
    { path: "/profile-edit", component: ProfileEditPage },
    { path: "/saved", component: SavedPage },
    { path: "/settings", component: SettingsPage, name: "settingsPage" },
    {
      path: "/dailyreport",
      component: DailyReportPage,
      name: "dailyReportPage",
    },
    {
      path: "/portfolio",
      component: StockPortfolioPage,
      name: "portfolioPage",
    },
    { path: "/stocksearch", component: StockSearchPage },
    {
      path: "/myStocklist",
      component: MyStockListViewPage,
      name: "myStockListPage",
    },
    {
      path: "/account-management",
      component: AccountManagement,
      name: "accountManagementPage",
    },
    {
      path: "/recommendstock",
      component: RecommendStockPage,
      name: "recommendStockPage",
    },
    {
      path: "/my-profile",
      name: "my-profile",
      props: true,
    },
    { path: "/interest", component: InterestPage },
    { path: "/notifications", component: NotificationsPage },
    { path: "/profile-edit", component: ProfileEditPage },
    { path: "/saved", component: SavedPage },
    { path: "/settings", name: "settings", component: SettingsPage },
    { path: "/dailyreport", name: "daily-report", component: DailyReportPage },
    { path: "/portfolio", name: "portfolio", component: StockPortfolioPage },
    { path: "/stocksearch", component: StockSearchPage },
    { path: "/myStocklist", component: MyStockListViewPage },
    { path: "/account-management", component: AccountManagement },
    { path: "/recommendstock", component: RecommendStockPage },
    {
      path: "/login",
      component: LoginPage,
      meta: { requiresAuth: false },
      beforeEnter: (to, from, next) => {
        if (isLoggedIn()) {
          next({ path: "/" });
        } else {
          next();
        }
      },
    },
    {
      path: "/find-id",
      component: FindIdPage,
    },
    {
      path: "/find-id",
      name: "FindIdResult",
      component: FindIdResultPage,
      props: (route) => ({
        userId: route.query.userId,
        createdAt: route.query.createdAt,
      }),
    },
    {
      path: "/auth/login/:service",
      component: AuthLoginHandler,
    },
    {
      path: "/main",
      component: MainPage,
      meta: { hideNavbar: true },
    },
    {
      path: "/auth/logout/kakao",
      component: {
        mounted() {
          this.$router.push("/main");
        },
      },
    },
    { path: "/signup", component: SignUpPage },
  ],
});

// 로그인 상태 확인
function isLoggedIn() {
  return !!localStorage.getItem("accessToken");
}

// 전역 네비게이션 가드
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth) && !isLoggedIn()) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
