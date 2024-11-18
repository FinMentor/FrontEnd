import axios from "axios";
import { Cookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

const cookies = new Cookies();

export const login = async (id, password) => {
    console.log(id, password);
    try {
        const response = await axios.post(
            "http://localhost:8080/api/v1/auth/login",
            {
                id: id,
                password: password,
            },
            {
                headers: {
                    "Content-Type": "application/json", // JSON 형식으로 전송
                },
            },
        );

        const { accessToken } = response.data.responseEntity.body;
        cookies.set("jwt", accessToken, { path: "/", maxAge: 60 * 60 * 24 * 7 });
    } catch (error) {
        console.error("로그인 실패:", error);
        throw error;
    }
};

export const getUserInfo = () => {
    const token = cookies.get("jwt");
    if (!token) return null;

    try {
        return jwtDecode(token);
    } catch (error) {
        console.error("JWT 디코딩 실패:", error);
        return null;
    }
};
