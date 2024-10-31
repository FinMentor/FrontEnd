// apiService.js
import axiosInstance from "@/axios.js";

class StockService {
  async fetchStockPrice(stockId) {
    if (import.meta.env.VITE_API_URL) {
      try {
        const response = await axiosInstance.get(`stock/${stockId}`);
        return response.data;
      } catch (error) {
        console.error("API fetch error, using mock data", error);
        return this.getMockStockPrice();
      }
    } else {
      return this.getMockStockPrice();
    }
  }

  async fetchPortfolioSummary(stockId) {
    if (import.meta.env.VITE_API_URL) {
      try {
        const response = await axiosInstance.get(
          `portfolio/${stockId}/summary`,
        );
        return response.data;
      } catch (error) {
        console.error("API fetch error, using mock data", error);
        return this.getMockPortfolioSummary();
      }
    } else {
      return this.getMockPortfolioSummary();
    }
  }

  async fetchStockIndex(stockId) {
    if (import.meta.env.VITE_API_URL) {
      try {
        const response = await axiosInstance.get(`stock/${stockId}/index`);
        return response.data;
      } catch (error) {
        console.error("API fetch error, using mock data", error);

        return this.getMockStockIndex();
      }
    } else {
      return this.getMockStockIndex();
    }
  }

  getMockStockPrice() {
    return [
      {
        stockHistoryId: "20241007130952",
        openPrice: 60200,
        closedPrice: 60200,
        highPrice: 60500,
        lowPrice: 59500,
      },
      {
        stockHistoryId: "20241007132000",
        openPrice: 60200,
        closedPrice: 60200,
        highPrice: 60500,
        lowPrice: 59500,
      },
      {
        stockHistoryId: "20241007133000",
        openPrice: 60200,
        closedPrice: 60100,
        highPrice: 60500,
        lowPrice: 59500,
      },
      {
        stockHistoryId: "20241007134000",
        openPrice: 60200,
        closedPrice: 60200,
        highPrice: 60500,
        lowPrice: 59500,
      },
      {
        stockHistoryId: "20241007135000",
        openPrice: 60200,
        closedPrice: 60900,
        highPrice: 60900,
        lowPrice: 59500,
      },
      {
        stockHistoryId: "20241007140000",
        openPrice: 60200,
        closedPrice: 61500,
        highPrice: 61900,
        lowPrice: 59500,
      },
      {
        stockHistoryId: "20241007141000",
        openPrice: 60200,
        closedPrice: 61300,
        highPrice: 61900,
        lowPrice: 59500,
      },
      {
        stockHistoryId: "20241007142000",
        openPrice: 60200,
        closedPrice: 61200,
        highPrice: 61900,
        lowPrice: 59500,
      },
      {
        stockHistoryId: "20241007143000",
        openPrice: 60200,
        closedPrice: 61100,
        highPrice: 61900,
        lowPrice: 59500,
      },
      {
        stockHistoryId: "20241007144000",
        openPrice: 60200,
        closedPrice: 61300,
        highPrice: 61900,
        lowPrice: 59500,
      },
      {
        stockHistoryId: "20241007145000",
        openPrice: 60200,
        closedPrice: 61300,
        highPrice: 61900,
        lowPrice: 59500,
      },
      {
        stockHistoryId: "20241007150000",
        openPrice: 60200,
        closedPrice: 61000,
        highPrice: 61900,
        lowPrice: 59500,
      },
      {
        stockHistoryId: "20241007151000",
        openPrice: 60200,
        closedPrice: 60700,
        highPrice: 61900,
        lowPrice: 59500,
      },
      {
        stockHistoryId: "20241007152000",
        openPrice: 60200,
        closedPrice: 60800,
        highPrice: 61900,
        lowPrice: 59500,
      },
      {
        stockHistoryId: "20241007153000",
        openPrice: 60200,
        closedPrice: 61100,
        highPrice: 61900,
        lowPrice: 59500,
      },
    ];
  }

  getMockPortfolioSummary() {
    return {
      name: "삼성전자",
      price: 64394,
      quantity: 9091,
    };
  }

  getMockStockIndex() {
    return {
      marketCapitalization: "1조원",
      per: 66700,
      pbr: 66700,
      roe: 66700,
      psr: 66700,
      bps: 66700,
    };
  }
}

export default new StockService();
