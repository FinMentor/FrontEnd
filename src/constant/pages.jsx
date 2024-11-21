import ChatRoom from "@/pages/chat/ChatRoom";
import FindMentor from "@/pages/chat/FindMentor";
import ChatIndex from "@/pages/chat/ChatIndex";
import Login from "@/pages/Login";
import Post from "@/pages/community/Post"; // 전체 게시판 글
import Reply from "@/pages/community/Reply"; //답댓글
import PostMento from "@/pages/community/PostMento";
import WritePost from "@/pages/community/WritePost"; // 글 작성 페이지

export const CHAT_SUBPAGE = [
    {
        element: <ChatIndex />,
        name: "채팅",
        path: "/chat",
        showNavigator: true,
    },
    {
        element: <ChatRoom showNavigator={false} />,
        name: "채팅방",
        path: "/chat/room",
        showNavigator: false,
    },
    {
        element: <FindMentor showNavigator={false} />,
        name: "고수 찾기",
        path: "/chat/find-mentor",
        showNavigator: false,
    },
];

export const AUTH_PAGES = [
    {
        element: <Login />,
        name: "로그인",
        path: "/login",
        showNavigator: false,
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
    {
        element: <PostMento showNavigator={false} />, // 고수 노하우 게시글 디테일 페이지
        name: "고수 노하우 게시글",
        path: "postMento/:postId", // 경로 추가
    },
    {
        element: <WritePost showNavigator={false} />, // 글 작성 페이지
        name: "게시글 작성",
        path: "write", // 게시글 작성 페이지 경로
    },
];

export const PAGES = [...AUTH_PAGES, ...CHAT_SUBPAGE, ...COMMUNITY_SUBPAGE];
