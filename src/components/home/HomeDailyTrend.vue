<template>
  <div class="card-ui">
    <div class="daily-report">
      <h2>일일 동향 요약</h2>
      <p class="report-time">
        다음 리포트까지 {{ dailyTrendSummarized.hour }}시간 남았어요!
      </p>
    </div>
    <section class="card-ui-content">
      <p>{{ dailyTrendSummarized.dailyTrendSummarizedTitle }}</p>
      <p>{{ dailyTrendSummarized.dailyTrendSummarizedContent }}</p>
    </section>
    <div style="text-align: center; font-size: 24px">. . .</div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive } from "vue";

// 기본 URL과 동향 요약 데이터 설정
const BASE = `${import.meta.env.VITE_API_URL}/dailytrend`;
const dailyTrendSummarized = reactive({});
const token = localStorage.getItem("accessToken");
const emit = defineEmits(["loaded", "onComponentLoaded"]);

// 동향 요약 데이터 불러오기
const createDailyTrend = async () => {
  try {
    const response = await axios.get(BASE, {
      headers: { Authorization: `Bearer ${token}` },
    });
    Object.assign(dailyTrendSummarized, response.data);
  } catch (err) {
    console.error("createDailyTrend err : ", err.message);
  }
};

// 컴포넌트 마운트 시 API 호출
onMounted(async () => {
  await createDailyTrend();
  emit("loaded");
});
</script>

<style scoped>
h2 {
  font-size: 18px;
  margin-bottom: 10px;
  padding-top: 10px;
}

.card-ui {
  margin-bottom: 16px;
  border: 1px solid #e0e0e0;
  padding: 10px;
  border-radius: 12px;
  box-shadow:
    1px 1px 1px rgba(0, 0, 0, 0.1),
    -1px 1px 1px rgba(0, 0, 0, 0.1);
}

.card-ui-content {
  height: 210px;
  overflow-y: hidden;
}

.report-time {
  color: #888;
  font-size: 14px;
  margin-left: auto;
  padding-top: 10px;
}

.daily-report {
  display: flex;
}
.daily-report > h2 {
  font-family: "Pretendard-Bold";
  padding-top: 10px;
}
</style>
