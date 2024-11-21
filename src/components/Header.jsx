import { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackArrowIcon from "@/assets/icons/back-arrow.svg?react";
import ShareIcon from "@/assets/icons/share-icon.svg?react";
import MenuIcon from "@/assets/icons/menu-icon.svg?react";
import ChatModalIcon from "@/assets/icons/chat-modal.svg?react";
import { TABS } from "@/constant/tabs";
import { useCurrentTabIndex } from "@/states/tabSlice";
import { useCurrentPageIndex } from "@/states/pageSlice";
import { PAGES } from "@/constant/pages";
import { Nav } from "./Header.styles";
import ChatBottomModal from "@/components/chat/ChatBottomModal";

function Header() {
    const [currentTabIndex] = useCurrentTabIndex();
    const [currentPageIndex] = useCurrentPageIndex();
    const currentPath = useLocation().pathname;
    const navigate = useNavigate();
    const prevPath = useRef(currentPath);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 현재 탭과 페이지 정보
    const isTab = currentTabIndex !== -1;
    const currentTab = isTab ? TABS[currentTabIndex] : null;
    const currentPage = currentPageIndex !== -1 ? PAGES[currentPageIndex] : null;

    // 헤더 제목 설정 (현재 페이지 이름 > 현재 탭 이름)
    const headerTitle = currentPage?.name || currentTab?.name || "";

    // 이전 경로 저장
    if (isTab) {
        prevPath.current = currentPath;
    }

    // 모달 상태 초기화
    useEffect(() => {
        if (currentPage) {
            setIsModalOpen(false);
        }
    }, [currentTab, currentPage]);
    // 뒤로가기 핸들러
    const handleBack = () => {
        navigate(-1);
    };

    // 특정 페이지 확인
    const isPostPage = currentPath.includes("/community/post");
    const isWritePage = currentPath.includes("/community/write");

    // Write 페이지에서는 헤더를 숨김
    if (isWritePage) {
        return null;
    }

    return (
        <Nav>
            {isPostPage ? (
                <>
                    {/* 뒤로가기 버튼 */}
                    <BackArrowIcon onClick={handleBack} style={{ cursor: "pointer", width: "24px", height: "24px" }} />
                    {/* 가운데 공간 */}
                    <div style={{ flex: 1 }}></div>
                    {/* 공유 및 메뉴 아이콘 */}
                    <div style={{ display: "flex", gap: "8px" }}>
                        <ShareIcon style={{ cursor: "pointer", width: "24px", height: "24px" }} />
                        <MenuIcon style={{ cursor: "pointer", width: "24px", height: "24px" }} />
                    </div>
                </>
            ) : (
                <>
                    {!isTab ? (
                        <>
                            <BackArrowIcon onClick={handleBack} />
                            {headerTitle}
                            <div style={{ flex: 1 }}></div>
                            <div style={{ display: "flex", gap: "8px" }}>
                                <ChatModalIcon
                                    onClick={() => setIsModalOpen(true)}
                                    style={{ cursor: "pointer", width: "24px", height: "24px" }}
                                />
                            </div>
                        </>
                    ) : (
                        <>{headerTitle}</>
                    )}
                    {/* 뒤로가기 버튼 (서브페이지가 없을 때만 표시) */}
                    {currentPage?.subPage ? (
                        <BackArrowIcon
                            onClick={handleBack}
                            style={{ cursor: "pointer", width: "24px", height: "24px" }}
                        />
                    ) : null}
                </>
            )}
            <ChatBottomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </Nav>
    );
}

export default Header;
