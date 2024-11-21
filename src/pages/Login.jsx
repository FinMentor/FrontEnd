import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Root, Input, Button, Title, Subtitle, Label, ErrorMessage } from "./Login.styles";
import { login } from "@/utils/auth";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Root>
            <Title>로그인</Title>
            <Subtitle>로그인 후 채팅 서비스를 이용할 수 있어요</Subtitle>
            <form onSubmit={handleSubmit}>
                <Label htmlFor="username">아이디</Label>
                <Input
                    type="text"
                    placeholder="아이디를 입력하세요"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />

                <Label htmlFor="password">비밀번호</Label>
                <Input
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Button type="submit">로그인</Button>
            </form>
        </Root>
    );
}

export default Login;
