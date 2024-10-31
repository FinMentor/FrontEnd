<template>
  <nav class="bottom-nav">
    <router-link
      v-for="item in menuItems"
      :key="item.path"
      :to="item.path"
      class="nav-item"
    >
      <img :src="item.icon" alt="" class="icon" />
      <!-- SVG를 이미지로 불러오기 -->
      <span>{{ item.name }}</span>
    </router-link>
  </nav>
</template>
<script setup>
import { reactive } from "vue";

import homeIcon from "@/assets/icons/home-icon.svg";
import reportIcon from "@/assets/icons/report-icon.svg";
import portfolioIcon from "@/assets/icons/portfolio-icon.svg";
import myIcon from "@/assets/icons/my-icon.svg";

const menuItems = reactive([
  { name: "홈", path: "/", icon: homeIcon },
  { name: "리포트", path: "/dailyreport", icon: reportIcon },
  { name: "포트폴리오", path: "/portfolio", icon: portfolioIcon },
  { name: "MY", path: "/myProfile", icon: myIcon },
]);
</script>

<style scoped>
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #afafaf;
}

.nav-item img.icon {
  width: 24px;
  height: 24px;
  margin-bottom: 5px;
}

.nav-item span {
  font-size: 12px;
}
</style>
