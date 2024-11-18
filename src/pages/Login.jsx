import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Root, Input, Button, Title, ErrorMessage } from "./Login.styles";
import { login } from "@/utils/auth";
function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    return (
        <Root>
            <Title>로그인</Title>
            <form onSubmit={login(username, password)}>
                <Input
                    type="text"
                    placeholder="아이디"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="비밀번호"
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
