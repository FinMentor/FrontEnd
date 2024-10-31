<template>
  <div v-if="data" class="card-ui">
    <div class="title">보유 정보</div>
    <div class="orderInfo">
      <table>
        <tbody>
          <tr>
            <td>평가액</td>
            <td>{{ (totalPrice || 0).toLocaleString() }}원</td>
          </tr>
          <tr>
            <td>보유량</td>
            <td class="quantity">{{ data.quantity }}주</td>
          </tr>
          <tr>
            <td>현재가격</td>
            <td class="price">
              {{ (data.recentPrice || 0).toLocaleString() }}원
            </td>
          </tr>
          <tr>
            <td>평단가</td>
            <td class="price">{{ (data.avgPrice || 0).toLocaleString() }}원</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const totalPrice = computed(() => {
  if (!props.data || !props.data.avgPrice || !props.data.quantity) {
    return 0; // 기본값
  }
  return props.data.recentPrice * props.data.quantity;
});
</script>

<style scoped>
.title {
  font-family: "Pretendard-Bold";
  font-size: 18px;
}
.card-ui {
  font-family: "Pretendard-Bold";
}
table {
  width: 100%;
  border-collapse: collapse;
}
.orderInfo {
  padding-left: 16px;
}
th,
td {
  line-height: 2.4;
}
td:nth-child(1) {
  text-align: left;
  color: #4f4f4f;
}
td:nth-child(2) {
  text-align: right;
}
</style>
