import ChatRoom from "@/pages/chat/ChatRoom";
import FindMentor from "@/pages/chat/FindMentor";
import ChatIndex from "@/pages/chat/ChatIndex";
import Login from "@/pages/Login";

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

export const PAGES = [
    {
        element: <Login />,
        name: "로그인",
        path: "/login",
    },
];
