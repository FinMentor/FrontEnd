<template>
  <div class="empty-asset-box" @click="goToAssetInput">
    <div class="empty-asset-content">
      <span class="empty-asset-icon">+</span>
      <p>자산을 입력해 주세요</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToAssetInput = () => {
  router.push({ path: "/stocksearch" }); // 자산 입력 페이지로 이동
};
</script>

<style scoped>
.empty-asset-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  border: 5px dashed #ccc;
  border-radius: 20px;
  color: #999;
  cursor: pointer;
  margin-top: 50px;
}

.empty-asset-content {
  text-align: center;
}

.empty-asset-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  font-size: 36px;
  color: #999;
  border: 5px dashed #ccc;
  border-radius: 50%;
}
</style>
