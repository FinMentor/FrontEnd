import { Nav, NavLink } from "./BottomTab.styles";
import HomeIcon from "@/assets/icons/home-icon.svg?react";
import CommunityIcon from "@/assets/icons/community-icon.svg?react";
import ChatIcon from "@/assets/icons/chat-icon.svg?react";
import RankingIcon from "@/assets/icons/ranking-icon.svg?react";

function BottomTab() {
    return (
        <Nav>
            <NavLink to="/">
                <HomeIcon />홈
            </NavLink>
            <NavLink to="/about">
                <CommunityIcon />
                커뮤니티
            </NavLink>
            <NavLink to="/about">
                <ChatIcon />
                채팅
            </NavLink>
            <NavLink to="/about">
                <RankingIcon />
                랭킹
            </NavLink>
        </Nav>
    );
}

export default BottomTab;
