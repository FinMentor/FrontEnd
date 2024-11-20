import ChatRoom from "@/pages/chat/ChatRoom";
import FindMentor from "@/pages/chat/FindMentor";
import ChatIndex from "@/pages/chat/ChatIndex";
import Login from "@/pages/Login";

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

export const PAGES = [...AUTH_PAGES, ...CHAT_SUBPAGE];
