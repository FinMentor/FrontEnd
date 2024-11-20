import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackArrowIcon from "@/assets/icons/back-arrow.svg?react";
import ShareIcon from "@/assets/icons/share-icon.svg?react";
import MenuIcon from "@/assets/icons/menu-icon.svg?react";
import { TABS } from "@/constant/tabs";
import { useCurrentTabIndex } from "@/states/tabSlice";
import { useCurrentPageIndex } from "@/states/pageSlice";
import { TABS } from "@/constant/tabs";
import { PAGES } from "@/constant/pages";
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

    const handleBack = () => {
        navigate(-1);
    };
    console.log("currentTabIndex", currentTabIndex);
    console.log("currentPage", currentPage);

    // Post 페이지인지 확인
    const isPostPage = currentPath.includes("/community/post");

    return (
        <Nav>
            {isPostPage ? (
                <>
                    {/* 뒤로가기 버튼 */}
                    <BackArrowIcon onClick={handleBack} style={{ cursor: "pointer", width: "24px", height: "24px" }} />
                    {/* 가운데 공백 (유지) */}
                    <div style={{ flex: 1 }}></div>
                    {/* 오른쪽 공유 및 메뉴 아이콘 */}
                    <div style={{ display: "flex", gap: "8px" }}>
                        <ShareIcon style={{ cursor: "pointer", width: "24px", height: "24px" }} />
                        <MenuIcon style={{ cursor: "pointer", width: "24px", height: "24px" }} />
                    </div>
                </>
            ) : (
                <>
                    {!isTab && (
                        <>
                            <BackArrowIcon onClick={handleBack} />
                        </>
                    )}
                    {currentTab?.name}
                </>
            )}
            {headerTitle}
        </Nav>
    );
}

export default Header;
