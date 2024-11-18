import axios from "axios";
import { Cookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

const cookies = new Cookies();

export const login = async (username, password) => {
    try {
        const response = await axios.post("http://localhost:8080/api/v1/login", {
            username,
            password,
        });

        const { token } = response.data;
        cookies.set("jwt", token, { path: "/", maxAge: 60 * 60 * 24 * 7 });
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
