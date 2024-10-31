import { defineStore } from "pinia";

export const useHeaderStore = defineStore("headerStore", {
  state: () => ({
    stockName: "",
    shortCode: "",
    isStockPortfolioPage: false,
    isStockButtonVisible: true,
    isEditModalVisible: false,
  }),
  actions: {
    setStockTitle(stockName) {
      this.stockName = stockName;
    },
    setStockSubtitle(shortCode) {
      this.shortCode = shortCode;
    },
    setStockPortfolioHeaderButton(isStockPortfolioPage) {
      this.isStockPortfolioPage = isStockPortfolioPage;
    },
    setStockButtonVisible() {
      this.isStockButtonVisible = !this.isStockButtonVisible;
    },
    triggerEditFunction() {
      this.isEditModalVisible = !this.isEditModalVisible;
    },
  },
});
