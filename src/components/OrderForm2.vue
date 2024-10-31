<template>
  <div>
    <div class="modal-content" @click="closeTextModal">
      <button class="close-button" @click="emitUpdate">
        <!-- <img src="@/assets/icons/close-form-icon.svg" alt="Save Icon" /> -->
        뒤로
      </button>
      <div>
        {{
          data.orderType === "S"
            ? "매도"
            : data.orderType === "B"
              ? "매수"
              : "수정"
        }}
      </div>
      <button class="submit-button" type="submit" @click="submitOrderForm">
        <!-- <img
          src="@/assets/icons/portfolio-form-save-icon.svg"
          alt="Save Icon"
        /> -->
        +
      </button>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      <div v-if="data" class="orderForm">
        <table>
          <tbody>
            <tr>
              <td>
                <div class="stockName">
                  {{ data.stockName }}
                </div>
                <div class="shortCode">
                  {{ data.shortCode }}
                </div>
              </td>

              <td>
                <input
                  v-model="formData.quantity"
                  class="quantityInput"
                  inputmode="numeric"
                  type="number"
                  :min="0"
                />
                주
              </td>
            </tr>
            <tr>
              <td>평단가</td>
              <td>
                <input
                  v-model="formData.price"
                  class="priceInput"
                  inputmode="numeric"
                  type="number"
                  :min="0"
                />
                원
              </td>
            </tr>
          </tbody>
        </table>
        <div class="dateTimePicker">
          <input v-model="formData.date" type="date" class="dateInput" />
          <input v-model="formData.time" type="time" class="timeInput" />
        </div>
        <div class="memo" @click="openTextModal" @click.stop>메모 ></div>

        <!-- 모달 창 -->
        <div v-if="isModalVisible" class="modal-overlay">
          <div class="modal-content" @click.stop>
            <textarea
              v-model="formData.memo"
              placeholder="메모를 입력하세요"
              class="memoTextarea"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import stockPortfolioService from "@/services/stockPortfolioService";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const formData = reactive({
  ...props.data,
  quantity: props.data.quantity || 0,
  date: "",
  time: "",
  memo: "",
});

const maxQuantity = ref(0);
const errorMessage = ref("");
let errorTimeout = null;

const emit = defineEmits(["update", "update-data"]);

// update-data 이벤트를 부모에게 알리는 함수
const triggerUpdateData = () => {
  console.log("triggerUpdateData");
  emit("update-data"); // 부모에게 update-data 이벤트 발생
};
const emitUpdate = () => {
  emit("update", true);
};

const isModalVisible = ref(false);

const showErrorForLimitedTime = () => {
  if (errorTimeout) {
    clearTimeout(errorTimeout); // 이전 타이머를 지웁니다.
  }
  errorTimeout = setTimeout(() => {
    errorMessage.value = ""; // 에러 메시지 사라지게
  }, 3000); // 3초 후 사라짐
};

const openTextModal = () => {
  isModalVisible.value = true;
};

const closeTextModal = () => {
  isModalVisible.value = false;
};
// 매도 데이터를 검증하는 함수
const validateSellData = async () => {
  try {
    console.log("api호출");
    const response = await stockPortfolioService.validateSellData(
      formData.stockId, // 선택한 stockId
      formData.date, // 선택한 날짜
    );
    // 서버에서 받은 quantity를 formData에 업데이트
    maxQuantity.value = response.quantity;
    formData.quantity = response.quantity;
  } catch (error) {
    console.error("데이터 검증 중 오류 발생:", error);
  }
};

// formData.date가 변경될 때마다 validateSellData 함수 호출
watch(
  () => formData.date,
  async (newDate) => {
    if (newDate) {
      await validateSellData();
    }
  },
);
// 사용자가 수량을 입력할 때, maxQuantity를 넘지 않도록 제한
watch(
  () => formData.quantity,
  (newQuantity) => {
    if (newQuantity > maxQuantity.value) {
      formData.quantity = maxQuantity.value;
      errorMessage.value = `수량은 최대 ${maxQuantity.value}까지 입력 가능합니다.`;
      showErrorForLimitedTime();
    }
  },
);

const validateForm = () => {
  if (formData.quantity == null || formData.quantity <= 0) {
    errorMessage.value = "수량은 0보다 커야 합니다.";
    return false;
  }
  if (formData.quantity > maxQuantity.value) {
    errorMessage.value = `수량은 ${maxQuantity.value}을 넘을 수 없습니다.`;
    return false;
  }
  if (formData.price == null || formData.price <= 0) {
    errorMessage.value = "가격은 0보다 커야 합니다.";
    return false;
  }
  if (!formData.date) {
    errorMessage.value = "날짜를 입력하세요.";
    return false;
  }
  errorMessage.value = "";
  return true;
};

const convertToTimestamp = async () => {
  const timeValue = formData.time ? formData.time : "00:00";
  const dateTimeString = `${formData.date}T${timeValue}:00`;
  const dateTime = new Date(dateTimeString);
  const timestamp = dateTime.getTime();
  return timestamp;
};

const submitOrderForm = async () => {
  if (!validateForm()) {
    showErrorForLimitedTime();
    return;
  }
  const orderedAt = await convertToTimestamp();
  const orderType = props.data.orderType == "S" ? "S" : "B";
  try {
    const response = await stockPortfolioService.postStockOrder(
      props.data.stockId,
      {
        quantity: formData.quantity, // 업데이트된 quantity 값 사용
        price: formData.price,
        orderType: orderType,
        orderedAt: orderedAt,
        memo: formData.memo,
      },
    );

    // 성공적으로 서버에 데이터 전송 후 처리
    console.log("서버 응답:", response);

    triggerUpdateData();
    emitUpdate();
  } catch (error) {
    console.error("주문 제출 중 오류 발생:", error);
    alert("제출 중 오류가 발생했습니다.");
  }
};
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
  border-spacing: 30px 30px;
}
.orderInfo {
  padding-left: 16px;
}
td:nth-child(1) {
  text-align: left;
  font-size: 18px;
}
td:nth-child(2) {
  text-align: right;
}
.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
  z-index: 110000;
}
.orderForm {
  margin: 40px 10px 0px 0px;
}
.close-button {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 10px;
  background-color: white;
  border: none;
  cursor: pointer;
}
.stockName {
  line-height: 1.4;
}
.shortCode {
  line-height: 1.4;
  font-size: 14px;
  color: #9ea6b8;
}
.submit-button {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;
  background-color: white;
  border: none;
  cursor: pointer;
}
input {
  border: none;
  outline: none;
  text-align: right;
}
.dateTimePicker {
  margin: 30px 0px 30px 0px;
  display: flex;
}
.quantityInput,
.priceInput {
  width: 120px;
  font-size: 16px;
}
.timeInput,
.dateInput {
  margin: 10px;
  border: 1px #000000 solid;
  border-radius: 10px;
}
.memo {
  float: right;
}
textarea {
  border: none;
}
.error {
  position: fixed;
  justify-content: center;
  align-items: center;
  left: 27%;
  color: #ffffff;
  background-color: #ff4d4f;
  padding: 2px 10px 2px 10px;
  border-radius: 10px;
  margin-top: 40px;
}
</style>
