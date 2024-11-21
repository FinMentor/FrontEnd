import Home from "@/components/tabs/Home";
import Community from "@/components/tabs/Community";
import Rank from "@/components/tabs/Rank";
import Chat from "@/components/tabs/Chat";
import HomeIcon from "@/assets/icons/home-icon.svg?react";
import CommunityIcon from "@/assets/icons/community-icon.svg?react";
import ChatIcon from "@/assets/icons/chat-icon.svg?react";
import RankingIcon from "@/assets/icons/ranking-icon.svg?react";
import HomeInvertIcon from "@/assets/icons/home-invert-icon.svg?react";
import CommunityInvertIcon from "@/assets/icons/community-invert-icon.svg?react";
import RankingInvertIcon from "@/assets/icons/ranking-invert-icon.svg?react";
import ChatInvertIcon from "@/assets/icons/chat-invert-icon.svg?react";
import { CHAT_SUBPAGE } from "./pages";
import { COMMUNITY_SUBPAGE } from "./pages";

export const TABS = [
    {
        element: <Home />,
        path: "/",
        name: "홈",
        icon: HomeIcon,
        invertIcon: HomeInvertIcon,
        subPage: [],
    },
    {
        element: <Community />,
        path: "/community",
        name: "커뮤니티",
        icon: CommunityIcon,
        invertIcon: CommunityInvertIcon,
        subPage: COMMUNITY_SUBPAGE,
    },
    {
        element: <Rank />,
        path: "/rank",
        name: "랭크",
        icon: RankingIcon,
        invertIcon: RankingInvertIcon,
        subPage: [],
    },
    {
        element: <Chat />,
        path: "/chat",
        name: "채팅",
        icon: ChatIcon,
        invertIcon: ChatInvertIcon,
        subPage: CHAT_SUBPAGE,
    },
];
