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
import ChatRoom from "@/pages/chat/ChatRoom";
import FindMentor from "@/pages/chat/FindMentor";
import ChatIndex from "@/pages/chat/ChatIndex";
import Post from "@/pages/community/Post"; // 전체 게시판 글
import Reply from "@/pages/community/Reply"; //답댓글
// import PostMento from "@/components/community/PostMento"; // 노하우 게시판 글

export const CHAT_SUBPAGE = [
    {
        element: <ChatIndex />,
        name: "채팅",
        path: "/chat",
    },
    {
        element: <ChatRoom showNavigator={false} />,
        name: "채팅방",
        path: "/chat/room",
    },
    {
        element: <FindMentor showNavigator={false} />,
        name: "고수 찾기",
        path: "/chat/find-mentor",
    },
];

export const COMMUNITY_SUBPAGE = [
    {
        element: <Post showNavigator={false} />, // 전체 게시판 글 디테일 페이지
        name: "전체 게시판 글",
        path: "post/:postId", // 서브페이지 경로
    },
    {
        element: <Reply showNavigator={false} />, // 댓글 답장 페이지
        name: "댓글 답장",
        path: "reply/:commentId", // 댓글 답장 서브페이지 경로
    },
];

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
