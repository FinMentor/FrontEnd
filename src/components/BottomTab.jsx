import { Nav, NavLink, IconWrapper } from "./BottomTab.styles";
import { TABS } from "@/constant/tabs";
import { useLocation } from "react-router-dom";

function BottomTab() {
    const location = useLocation();

    // 하단 탭을 숨길 경로 배열
    const hiddenPaths = ["/community/write", "/community/postMento", "/community/post"];

    // 현재 경로가 hiddenPaths에 포함되면 하단 탭 렌더링 안 함
    if (hiddenPaths.some(path => location.pathname.startsWith(path))) {
        return null;
    }

    return (
        <Nav>
            {TABS.map(tab => (
                <NavLink to={tab.path} key={tab.name}>
                    <IconWrapper>{location.pathname === tab.path ? <tab.invertIcon /> : <tab.icon />}</IconWrapper>
                    {tab.name}
                </NavLink>
            ))}
        </Nav>
    );
}

export default BottomTab;
