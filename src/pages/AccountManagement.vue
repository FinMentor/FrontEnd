<template>
  <div class="account-management">
    <div class="section">
      <h2>계정 관리</h2>
      <div class="item">
        <span>비밀번호 변경</span>
        <span>></span>
      </div>
      <div class="item">
        <span>이메일 변경</span>
        <span>></span>
      </div>
      <div class="item disabled" @click="openDeleteModal">
        <span>회원 탈퇴</span>
        <span>></span>
      </div>
    </div>

    <div
      v-if="confirmDeleteModal"
      class="modal-overlay"
      @click="closeDeleteModal"
    >
      <div class="modal-card" @click.stop>
        <div class="modal-header">
          <img
            src="@/assets/icons/out-icon.svg"
            alt="Back"
            class="back-icon"
            @click="closeDeleteModal"
          />
          <p class="modal-text">
            탈퇴 후 계정 복구는 불가합니다.<br />정말로 탈퇴 하시겠습니까?
          </p>
        </div>
        <button class="delete-button" @click="deleteAccount">탈퇴</button>
        <button class="cancel-button" @click="closeDeleteModal">취소</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const confirmDeleteModal = ref(false);

    const openDeleteModal = () => {
      confirmDeleteModal.value = true;
    };

    const closeDeleteModal = () => {
      confirmDeleteModal.value = false;
    };

    const deleteAccount = () => {
      // 실제 탈퇴 로직 추가 예정
      closeDeleteModal();
    };

    return {
      confirmDeleteModal,
      openDeleteModal,
      closeDeleteModal,
      deleteAccount,
    };
  },
};
</script>

<style scoped>
.account-management {
  padding: 16px;
  padding-top: 80px;
}

.section {
  margin-bottom: 16px;
}

h2 {
  font-size: 16px;
  font-family: bold;
  margin-bottom: 8px;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  font-size: 14px;
  cursor: pointer;
}

.disabled {
  color: gray;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.modal-card {
  width: 100%;
  max-width: 500px;
  background-color: white;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding: 24px;
  margin-bottom: 67px;
  text-align: center;
}

.modal-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 16px;
  padding-left: 10px;
}

.back-icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin-bottom: 16px;
}

.modal-text {
  text-align: left;
}

.delete-button {
  background-color: var(--active-button-purple);
  color: white;
  width: 342px;
  height: 60px;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 16px;
}

.cancel-button {
  background-color: #f0f0f0;
  color: #333;
  width: 342px;
  height: 60px;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 8px;
}
</style>
