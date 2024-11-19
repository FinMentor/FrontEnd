import Home from "@/components/tabs/Home";
import Community from "@/components/tabs/Community";
import Chat from "@/components/tabs/Chat";
import Rank from "@/components/tabs/Rank";

import HomeIcon from "@/assets/icons/home-icon.svg?react";
import CommunityIcon from "@/assets/icons/community-icon.svg?react";
import ChatIcon from "@/assets/icons/chat-icon.svg?react";
import RankingIcon from "@/assets/icons/ranking-icon.svg?react";

export const TABS = [
    {
        element: <Home />,
        path: "/",
        name: "홈",
        icon: HomeIcon,
    },
    {
        element: <Community />,
        path: "/community",
        name: "커뮤니티",
        icon: CommunityIcon,
    },
    {
        element: <Rank />,
        path: "/rank",
        name: "랭크",
        icon: RankingIcon,
    },
    {
        element: <Chat />,
        path: "/chat",
        name: "채팅",
        icon: ChatIcon,
    },
];
