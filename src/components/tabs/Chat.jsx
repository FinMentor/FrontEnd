import { Root } from "./Chat.styles";
import { Outlet } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
function Chat() {
    return (
        <Root>
            <ErrorBoundary fallback={<div>에러 발생</div>}>
                <Outlet />
            </ErrorBoundary>
        </Root>
    );
}

export default Chat;
