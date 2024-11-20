import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCurrentTabIndex } from "@/states/tabSlice";
import { useCurrentPageIndex } from "@/states/pageSlice";
import { TABS } from "@/constant/tabs";
import { PAGES } from "@/constant/pages";
import BackArrowIcon from "@/assets/icons/back-arrow.svg?react";
import { Nav } from "./Header.styles";

function Header() {
    const [currentTabIndex] = useCurrentTabIndex();
    const [currentPageIndex] = useCurrentPageIndex();
    const currentPath = useLocation().pathname;
    const isTab = currentTabIndex != -1 ? true : false;
    const currentTab = currentTabIndex != -1 ? TABS[currentTabIndex] : null;
    const currentPage = currentPageIndex != -1 ? PAGES[currentPageIndex] : null;
    const headerTitle = currentPage?.name ?? currentTab?.name;
    const navigate = useNavigate();
    const prevPath = useRef(currentPath);
    if (isTab) {
        prevPath.current = currentPath;
    }
    const handleBackInChat = () => {
        navigate(-1);
    };
    console.log("currentTabIndex", currentTabIndex);
    console.log("currentPage", currentPage);
    return (
        <Nav>
            {!isTab && (
                <>
                    <BackArrowIcon onClick={handleBackInChat} />
                    {/* <currentTab.icon /> */}
                </>
            )}
            {headerTitle}
        </Nav>
    );
}

export default Header;
