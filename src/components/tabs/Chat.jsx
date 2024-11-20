import { Root } from "./Chat.styles";
import { Outlet } from "react-router-dom";
function Chat() {
    return (
        <Root>
            <Outlet />
        </Root>
    );
}

export default Chat;
