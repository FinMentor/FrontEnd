import axios from "axios";

class RenewToken {
  constructor(path) {
    this.BASE = `${import.meta.env.VITE_API_URL}${path}`;
  }

  // 메서드는 async로 선언
  async renew() {
    try {
      const response = await axios.get(this.BASE, {
        withCredentials: true,
      });

      return response.data; // 데이터를 리턴
    } catch (err) {
      console.error("renew error:", err.message);
      throw err; // 오류를 던져 호출 측에서 처리
    }
  }
}

export default RenewToken;
