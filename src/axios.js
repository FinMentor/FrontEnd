import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  timeout: 10000,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Response received:", config);
    return config;
  },
  (error) => {
    console.error("Error occurred:", error);
    return Promise.reject(error);
  },
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response received:", response);
    return response;
  },
  (error) => {
    console.error("Error occurred:", error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
