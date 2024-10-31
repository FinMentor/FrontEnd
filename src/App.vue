<template>
  <div class="container">
    <HeaderNavigator v-if="!$route.meta.hideNavbar" />
    <div :class="{ content: !$route.meta.hideNavbar }">
      <router-view />
    </div>
    <BottomNavigator v-if="!$route.meta.hideNavbar" class="bottom-nav-bar" />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import HeaderNavigator from "./components/HeaderNavigator.vue";
import BottomNavigator from "./components/BottomNavigator.vue";
import { onMounted } from "vue";
import { requestForToken } from "./firebase";

const route = useRoute();

onMounted(() => {
  requestForToken()
    .then((token) => {
      if (token) {
        console.log("Token acquired on app start:", token);
      }
    })
    .catch((error) => {
      console.error("Error during token request:", error);
    });
});
</script>

<style scoped>
.content {
  padding: 48px 24px 0px 24px;
}

.container {
  padding: 0px;
  font-family: "Pretendard-Medium";
  padding: 0px;
}

.bottom-nav-bar {
  position: fixed;
  padding: 10px;
  margin: 0 auto;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  background-color: #f8f9fa;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}
</style>
