import { Nav } from "./Header.styles";
import { useLocation, useNavigate } from "react-router-dom";
import BackArrowIcon from "@/assets/icons/back-arrow.svg?react";
import { TABS } from "@/constant/tabs";
import { useCurrentTabIndex } from "@/states/tabSlice";
import { useRef } from "react";

function Header() {
    const [currentTabIndex] = useCurrentTabIndex();
    const currentPath = useLocation().pathname;
    const isTab = currentTabIndex != -1 ? true : false;
    const currentTab = currentTabIndex != -1 ? TABS[currentTabIndex] : null;
    const navigate = useNavigate();
    const prevPath = useRef(currentPath);
    if (isTab) {
        prevPath.current = currentPath;
    }
    const handleBackInChat = () => {
        navigate(-1);
    };

    return (
        <Nav>
            {!isTab && (
                <>
                    <BackArrowIcon onClick={handleBackInChat} />
                    {/* <currentTab.icon /> */}
                </>
            )}
            {currentTab?.name}
        </Nav>
    );
}

export default Header;
