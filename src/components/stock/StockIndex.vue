<template>
  <div class="card-ui">
    <p class="title">투자 지표</p>

    <div class="asset-info">
      <div class="info-box">
        <p>시가총액</p>
        <p>{{ (capitalization || 0).toLocaleString() }}</p>
      </div>
      <div class="info-box">
        <p>순자산</p>
        <p>{{ netAssets }}원</p>
      </div>
      <div class="info-box">
        <p>PBR</p>
        <p>{{ data.pbr }}배</p>
      </div>
      <div class="info-box">
        <p>BPS</p>
        <p>{{ data.bps }}원</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLoadingStore } from "@/stores/loadingStore"; // Pinia 스토어 가져오기
import { computed } from "vue";

const loadingStore = useLoadingStore();

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
function convertKoreanUnitsToNumber(koreanNumber) {
  let number = parseFloat(koreanNumber); // 숫자 부분 추출

  if (koreanNumber.includes("조")) {
    number *= 1e12; // '조'는 10^12
  } else if (koreanNumber.includes("억")) {
    number *= 1e8; // '억'은 10^8
  }

  return number;
}
function convertNumberToKoreanUnits(number) {
  const units = [
    { name: "조", value: 1e12 },
    { name: "억", value: 1e8 },
    // { name: "만원", value: 1e4 },
  ];

  let result = "";

  for (let unit of units) {
    if (number >= unit.value) {
      const unitAmount = Math.floor(number / unit.value);
      result += `${unitAmount}${unit.name} `;
      number %= unit.value; // 남은 금액 처리
    }
  }

  return result.trim();
}

const capitalization = computed(() => {
  return formatLargeNumber(props.data.marketCapitalization * 60000);
});
const netAssets = computed(() => {
  console.log(convertKoreanUnitsToNumber(capitalization.value));

  const netAssetPrice =
    convertKoreanUnitsToNumber(capitalization.value) / props.data.pbr;
  return convertNumberToKoreanUnits(netAssetPrice);
});
function formatLargeNumber(num) {
  if (num >= 1e12) {
    return (num / 1e12).toFixed(2) + "조";
  } else if (num >= 1e8) {
    return (num / 1e8).toFixed(0) + "억";
  } else {
    return num;
  }
}
</script>

<style scoped>
.title {
  font-size: 18px;
}
.indexContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  padding: 0px 0px 16px 0px;
  flex-grow: 0;
  flex-shrink: 1;
}
.indexContainerRow {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 14px;
  flex-grow: 1;
  flex-shrink: 1;
}
.box {
  width: 100px;
  height: 74px;
  border: 1px #000000 solid;
  border-radius: 10px;
}
.boxIndex {
  padding-top: 16px;
  padding-left: 14px;
}
.boxIndex > p {
  background-color: #f8f8f8;
  font-size: 14px;
  margin: 0; /* 기본 margin을 제거 */
  padding: 0; /* padding도 필요하면 제거 */
  line-height: 1.4; /* 줄 간격을 설정 (기본 값은 보통 1.5) */
}

.asset-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 20px;
}
.info-box {
  padding: 10px;
  background-color: #fafafa;
  color: #333;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #e0e0e0;
}
.info-box p {
  margin: 5px 0;
}
</style>
