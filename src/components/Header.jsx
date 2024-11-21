import { useLocation, useNavigate } from "react-router-dom";
import BackArrowIcon from "@/assets/icons/back-arrow.svg?react";
import ShareIcon from "@/assets/icons/share-icon.svg?react";
import MenuIcon from "@/assets/icons/menu-icon.svg?react";
import { TABS } from "@/constant/tabs";
import { Nav } from "./Header.styles";

function Header() {
    const currentPath = useLocation().pathname;
    const navigate = useNavigate();

    // 현재 활성화된 탭 및 서브페이지 계산
    const currentTab = TABS.find(tab => currentPath === tab.path || currentPath.startsWith(`${tab.path}/`));
    const currentSubPage = currentTab?.subPage?.find(sub => currentPath.startsWith(`${currentTab.path}/${sub.path}`));

    // 헤더 제목 설정: 서브페이지 이름 우선, 없으면 탭 이름
    const headerTitle = currentSubPage?.name || currentTab?.name || "페이지 없음";

    // 뒤로가기 핸들러
    const handleBack = () => {
        navigate(-1);
    };

    // Post 페이지인지 확인 (예: /community/post, /community/mentor/post)
    const isPostPage = currentPath.includes("/community/post") || currentPath.includes("/community/mentor/post");
    // WritePost 페이지인지 확인
    const isWritePostPage = currentPath.includes("/community/write");

    console.log("currentPath:", currentPath);
    console.log("currentTab:", currentTab);
    console.log("currentSubPage:", currentSubPage);

    // WritePost 페이지에서는 헤더를 숨김
    if (isWritePostPage) {
        return null;
    }

    return (
        <Nav>
            {isPostPage ? (
                <>
                    {/* 뒤로가기 버튼 */}
                    <BackArrowIcon onClick={handleBack} style={{ cursor: "pointer", width: "24px", height: "24px" }} />
                    {/* 가운데 공백 */}
                    <div style={{ flex: 1 }}></div>
                    {/* 공유 및 메뉴 아이콘 */}
                    <div style={{ display: "flex", gap: "8px" }}>
                        <ShareIcon style={{ cursor: "pointer", width: "24px", height: "24px" }} />
                        <MenuIcon style={{ cursor: "pointer", width: "24px", height: "24px" }} />
                    </div>
                </>
            ) : (
                <>
                    {/* 뒤로가기 버튼 (서브페이지가 없을 때만 표시) */}
                    {currentSubPage ? (
                        <BackArrowIcon
                            onClick={handleBack}
                            style={{ cursor: "pointer", width: "24px", height: "24px" }}
                        />
                    ) : null}
                    {/* 헤더 제목 */}
                    <span>{headerTitle}</span>
                </>
            )}
        </Nav>
    );
}

export default Header;
