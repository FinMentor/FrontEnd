<template>
  <!-- 저장된 세부 카테고리 목록 -->
  <div class="saved-category">
    <p>관심 키워드</p>
    <div
      v-for="(savedSubcategory, index) in savedSubCategories"
      :key="index"
      class="saved-category-item"
    >
      <span>{{ savedSubcategory.subCategoryName }}</span>
      <button
        class="delete-button"
        @click="deleteSubcategory(savedSubcategory.subCategoryId)"
      >
        x
      </button>
    </div>
  </div>
  <div
    class="category-container"
    :class="{ active: showCategories && !selectedCategory }"
  >
    <button class="toggle-button" @click="toggleCategories"></button>
    <p v-if="!selectedCategory" class="category-text">
      카테고리를 선택해주세요
    </p>
    <p v-else class="sub-category-text">
      <span class="back-button" @click="goBack">&lt;</span> 세부 카테고리를
      선택해주세요
    </p>

    <!-- 메인 카테고리 목록 -->
    <div v-if="!selectedCategory" class="grid-container">
      <div
        v-for="(category, index) in mainCategories"
        :key="index"
        class="main-category-item"
        @click="selectCategory(category)"
      >
        <img :src="category.icon" alt="" class="category-icon" />
        <span class="category-name">{{ category.name }}</span>
      </div>
    </div>

    <!-- 세부 카테고리 목록 -->
    <div v-else class="list-container">
      <div
        v-for="(subcategory, index) in subCategories"
        :key="index"
        :class="[
          'subcategory-item',
          { 'selected-border': selectedSubcategory.includes(subcategory.id) },
        ]"
        @click="toggleSubcategorySelect(subcategory.id)"
      >
        <span class="subcategory-name">{{ subcategory.name }}</span>
        <SelectIcon
          :is-selected="selectedSubcategory.includes(subcategory.id)"
          class="icon"
          :class="{
            'selected-icon': selectedSubcategory.includes(subcategory.id),
          }"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const router = useRouter();

import accomodationIcon from "@/assets/interest-icons/accomodation-icon.svg";
import energyIcon from "@/assets/interest-icons/energy-icon.svg";
import entertainmentIcon from "@/assets/interest-icons/entertainment-icon.svg";
import financeIcon from "@/assets/interest-icons/finance-icon.svg";
import healthcareIcon from "@/assets/interest-icons/healthcare-icon.svg";
import manufacturingIcon from "@/assets/interest-icons/manufacturing-icon.svg";
import resourcesIcon from "@/assets/interest-icons/resources-icon.svg";
import techIcon from "@/assets/interest-icons/tech-icon.svg";
import transportIcon from "@/assets/interest-icons/transport-icon.svg";
import SelectIcon from "@/components/SelectIcon.vue";

const iconMap = {
  "숙박 및 음식": accomodationIcon,
  "건설 및 에너지": energyIcon,
  "미디어 서비스": entertainmentIcon,
  "금융 및 보험": financeIcon,
  "의료 및 제약": healthcareIcon,
  "산업 및 제조": manufacturingIcon,
  "농업 및 자원": resourcesIcon,
  "통신 및 IT": techIcon,
  "운송 및 물류": transportIcon,
};

const mainCategories = ref([]);
const subCategories = ref([]);
const showCategories = ref(false);
const selectedCategory = ref(null);
const selectedSubcategory = ref([]);
const savedSubCategories = ref([]);

const getToken = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    router.push("/login");
    throw new Error("토큰이 없습니다. 로그인 페이지로 이동합니다.");
  }
  return token;
};

const toggleCategories = () => {
  if (selectedCategory.value) {
    selectedCategory.value = null;
    subCategories.value = [];
  } else {
    showCategories.value = !showCategories.value;
  }
};

const selectCategory = async (category) => {
  if (!selectedCategory.value) {
    selectedCategory.value = category;
    await loadSubCategories(category.id);
  } else {
    console.log(`${category.name} 세부 카테고리 선택됨`);
  }
};

const goBack = () => {
  selectedCategory.value = null; // 메인 카테고리로 돌아가기
};

const loadMainCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/category`);
    mainCategories.value = response.data.map((category) => ({
      id: category.mainCategoryId,
      name: category.mainCategoryName,
      icon: iconMap[category.mainCategoryName] || null,
    }));
  } catch (error) {
    console.error("메인 카테고리를 불러오는 중 오류 발생:", error);
  }
};

const loadSubCategories = async (mainCategoryId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/category/subcategory/${mainCategoryId}`,
    );
    subCategories.value = response.data.map((subCategory) => ({
      id: subCategory.subCategoryId,
      name: subCategory.subCategoryName,
    }));

    selectedSubcategory.value = savedSubCategories.value.map(
      (saved) => saved.subCategoryId,
    );
  } catch (error) {
    console.error("세부 카테고리를 불러오는 중 오류 발생:", error);
  }
};

const toggleSubcategorySelect = async (subcategoryId) => {
  if (selectedSubcategory.value.includes(subcategoryId)) {
    await deleteSubcategory(subcategoryId);
    selectedSubcategory.value = selectedSubcategory.value.filter(
      (id) => id !== subcategoryId,
    );
    savedSubCategories.value = savedSubCategories.value.filter(
      (saved) => saved.subCategoryId !== subcategoryId,
    );
  } else if (
    !savedSubCategories.value.some(
      (saved) => saved.subCategoryId === subcategoryId,
    )
  ) {
    selectedSubcategory.value.push(subcategoryId);
    await saveSubcategory(subcategoryId);

    const newSubcategory = subCategories.value.find(
      (sub) => sub.id === subcategoryId,
    );
    if (newSubcategory) {
      savedSubCategories.value.push({
        subCategoryId: subcategoryId,
        subCategoryName: newSubcategory.name,
      });
    }
  }
};

// 세부 카테고리 저장하기
const saveSubcategory = async (subcategoryId) => {
  try {
    const token = getToken();
    await axios.post(
      `${API_BASE_URL}/category/interest/${subcategoryId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    console.log("세부 카테고리가 저장되었습니다:", subcategoryId);
  } catch (error) {
    console.error("세부 카테고리 저장 실패:", error);
  }
};

// 저장된 세부 카테고리 목록 불러오기
const loadSavedSubcategories = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_BASE_URL}/category/interest`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    savedSubCategories.value = response.data;
  } catch (error) {
    console.error("저장된 세부 카테고리 불러오기 실패:", error);
  }
};

// 세부 카테고리 삭제하기
const deleteSubcategory = async (subCategoryId) => {
  try {
    const token = getToken();
    const response = await axios.delete(
      `${API_BASE_URL}/category/interest/${subCategoryId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    if (response.data === "삭제 성공") {
      savedSubCategories.value = savedSubCategories.value.filter(
        (subcategory) => subcategory.subCategoryId !== subCategoryId,
      );
    } else {
      console.error("삭제 실패:", response.data);
    }
  } catch (error) {
    console.error("세부 카테고리 삭제 실패:", error);
  }
};

// 컴포넌트 마운트 시 실행
onMounted(() => {
  loadMainCategories();
  loadSavedSubcategories();
});
</script>

<style scoped>
.category-container {
  position: absolute;
  width: 390px;
  height: 431px;
  left: calc(50% - 390px / 2);
  bottom: 0;
  margin-bottom: 67px;
  padding-bottom: 10px;
  background: #e5e5e5;
  border-radius: 30px 30px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.5s ease-in-out;
}
.content {
  padding: 0;
}

.toggle-button {
  position: absolute;
  top: 0;
  left: calc(50% - 25px);
  width: 50px;
  height: 4px;
  background-color: #333;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  z-index: 2;
}

.category-text {
  font-size: 18px;
  font-weight: bold;
  margin: 15px 10px;
  padding-left: 30px;
  text-align: left;
  width: 100%;
}
.sub-category-text {
  font-size: 18px;
  font-weight: bold;
  margin: 15px 10px;
  padding-left: 30px;
  text-align: left;
  width: 100%;
}

.back-button {
  font-size: 18px;
  cursor: pointer;
  margin-right: 5px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
}

.list-container {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  height: 358px;
  overflow-y: auto;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.main-category-item {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.category-icon {
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
}

.category-name {
  font-size: 12px;
  color: #333;
}

.subcategory-item {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 15px 30px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid transparent;
}

.subcategory-name {
  font-size: 16px;
  color: #333;
}
.selected-border {
  border-color: #9e85f6;
}
.saved-category {
  margin-left: 15px;
  padding-top: 20px;
}

.saved-category-item {
  font-size: 12px;
  padding: 5px 10px;
  background-color: #ffffff;
  border: 2px solid #9e85f6;
  border-radius: 50px;
  margin-right: 10px;
  margin-bottom: 5px;
  display: inline-block;
}
.delete-button {
  background: none;
  border: none;
  color: var(--back-button);
  cursor: pointer;
  font-size: 16px;
  padding: 0;
  padding-left: 5px;
}
</style>
