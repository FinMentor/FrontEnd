<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <h2>로그아웃</h2>
      <p>로그아웃 하시겠습니까?</p>
      <div class="button-group">
        <button class="confirm-button" @click="$emit('logout')">예</button>
        <button class="cancel-button" @click="$emit('close')">아니오</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// 필요한 경우 여기에 추가 로직을 작성하세요
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 300px;
}

h2 {
  font-size: 18px;
  margin-bottom: 10px;
}

p {
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

button {
  flex: 1;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.confirm-button {
  background-color: var(--primary-color);
  color: white;
}

.cancel-button {
  background-color: var(--back-button);
  color: white;
}
</style>
