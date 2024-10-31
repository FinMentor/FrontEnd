import axiosInstance from "@/axios.js";

class StockPortfolioService {
  async fetchStockOrder(stockId) {
    if (import.meta.env.VITE_API_URL != 0) {
      try {
        const response = await axiosInstance.get(`portfolio/${stockId}`);
        return response.data;
      } catch (error) {
        console.error("API fetch error, using mock data", error);
        return this.getStockOrder();
      }
    } else {
      return this.getStockOrder();
    }
  }
  async postStockOrder(stockId, stockOrderData) {
    if (import.meta.env.VITE_API_URL != 0) {
      try {
        const response = await axiosInstance.post(
          `portfolio/${stockId}`,
          stockOrderData,
        );
        return response.data;
      } catch (error) {
        console.error("API fetch error, using mock data", error);
        return error;
      }
    } else {
      return "";
    }
  }
  async validateSellData(stockId, endDate) {
    if (import.meta.env.VITE_API_URL != 0) {
      try {
        const response = await axiosInstance.get(`stock/validateselldata`, {
          params: {
            stockId: stockId,
            endDate: endDate,
          },
        });
        return response.data;
      } catch (error) {
        console.error("API validateSellData fetch error", error);
        return null;
      }
    } else {
      return null;
    }
  }

  async deleteAllOrder(stockId) {
    if (import.meta.env.VITE_API_URL != 0) {
      try {
        const response = await axiosInstance.delete(`portfolio/${stockId}`);
        return response.data;
      } catch (error) {
        console.error("API fetch error, using mock data", error);
        return this.getStockOrder();
      }
    } else {
      return this.getStockOrder();
    }
  }

  async editOrder(orderId, stockOrderData) {
    if (import.meta.env.VITE_API_URL != 0) {
      try {
        const response = await axiosInstance.put(
          `portfolio/order/${orderId}`,
          stockOrderData,
        );
        return response.data;
      } catch (error) {
        console.error("API fetch error, using mock data", error);
        return this.getStockOrder();
      }
    } else {
      return this.getStockOrder();
    }
  }

  async deleteAllOrder(stockOrderIds) {
    if (import.meta.env.VITE_API_URL != 0) {
      try {
        const response = await axiosInstance.delete(
          `portfolio/order`,
          stockOrderIds,
        );
        return response.data;
      } catch (error) {
        console.error("API fetch error", error);
      }
    } else {
      console.error("API fetch error", error);
    }
  }
  getStockOrder() {
    return {
      name: "신라섬유",
      totalPrice: 27439,
      totalQuantity: 75,
      orders: [
        {
          orderId: 11,
          price: 25000,
          quantity: 95,
          memo: "오우야",
          orderType: "B",
          orderedAt: 1728097836000,
        },
        {
          orderId: 12,
          price: 10000,
          quantity: 45,
          memo: "드가자",
          orderType: "S",
          orderedAt: 1728097837000,
        },
        {
          orderId: 13,
          price: 3000,
          quantity: 45,
          memo: "다시 드가자",
          orderType: "B",
          orderedAt: 1728097898000,
        },
        {
          orderId: 14,
          price: 200,
          quantity: 10,
          memo: "튀어잇",
          orderType: "S",
          orderedAt: 1728097935000,
        },
        {
          orderId: 15,
          price: 19999,
          quantity: 45,
          memo: "다시 드가자",
          orderType: "B",
          orderedAt: 1728097951000,
        },
        {
          orderId: 16,
          price: 19999,
          quantity: 45,
          memo: "난 호구",
          orderType: "S",
          orderedAt: 1728097978000,
        },
        {
          orderId: 17,
          price: 1,
          quantity: 10,
          memo: "ㅠㅠ",
          orderType: "S",
          orderedAt: 1728098004000,
        },
      ],
    };
  }
}

export default new StockPortfolioService();
