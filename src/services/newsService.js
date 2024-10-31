import axiosInstance from "@/axios.js";

class NewsService {
  async fetchNewsList(stockId) {
    if (import.meta.env.VITE_API_URL) {
      try {
        const response = await axiosInstance.get(`news/${stockId}`);
        return response.data;
      } catch (error) {
        console.error("API fetch error, using mock data", error);
        return this.getMockNews();
      }
    } else {
      return this.getMockNews();
    }
  }
  getMockNews() {
    return [
      {
        newsId: 1231,
        title: "[게시판] 조문수 한국카본 회장, 동",
        link: "https://n.news.naver.com/mnews/article/001/0014928431?sid=102",
        image:
          "https://mimgnews.pstatic.net/image/upload/office_logo/001/2020/09/15/logo_001_6_20200915184213.png",
      },
      {
        newsId: 1232,
        title: "한국카본 조문수 회장, 동국대 1억 ",
        link: "https://n.news.naver.com/mnews/article/023/0003858313?sid=102",
        image:
          "https://mimgnews.pstatic.net/image/upload/office_logo/023/2020/09/03/logo_023_6_20200903164340.png",
      },
      {
        newsId: 1233,
        title: "조문수 ㈜한국카본 회장, 동국대 후배",
        link: "https://n.news.naver.com/mnews/article/003/0012783903?sid=102",
        image:
          "https://mimgnews.pstatic.net/image/upload/office_logo/003/2024/08/05/logo_003_6_20240805095631.png",
      },
    ];
  }
}

export default new NewsService();
