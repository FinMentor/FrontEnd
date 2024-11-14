import { Nav, NavLink } from "./Header.styles";
import { useSelector, useDispatch } from "react-redux";
import { exitChatRoom } from "../states/chatSlice";
import { setShowNavigator } from "../states/navigatorSlice";

function Header() {
    const currentTab = useSelector(state => state.tab.currentTab);
    const isInChatRoom = useSelector(state => state.chat.isInChatRoom);
    const dispatch = useDispatch();

    const handleBackInChat = () => {
        dispatch(exitChatRoom());
        dispatch(setShowNavigator(true));
    };

    return (
        <Nav>
            {isInChatRoom && <button onClick={handleBackInChat}>뒤로가기</button>}
            {currentTab}
            <NavLink to="/"></NavLink>
        </Nav>
    );
}

export default Header;
