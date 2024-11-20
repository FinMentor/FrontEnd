import { Root, Title, ChatContainer, ChatProfile, ChatTitle, ReceiveMessage, ChatInfo } from "./ChatList.styles";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchChatList = async () => {
    const response = await axios.get(`http://localhost:8080/api/v1/chatroom`, {
        withCredentials: true,
    });
    return response.data.responseEntity.body.chatroomMemberDTOList;
};

function ChatList() {
    const AI_CHAT_BOT = {
        imageLink: "",
        nickname: "AI채팅봇",
        lastMessage: "회원님께 필요한 고수를 추천해드립니다.",
        roomId: "1",
    };
    const { data: chatRoom } = useQuery({
        queryKey: ["chatList"],
        queryFn: fetchChatList,
        select: data => [AI_CHAT_BOT, ...data],
        refetchOnWindowFocus: true,
    });

    // const chatList = [
    //     {
    //         imageLink: "",
    //         nickname: "빽이",
    //         lastMessage: "먼저 현재 재무 상황과 투자 목표에 대해 말씀해...",
    //         roomId: "2",
    //     },
    //     {
    //         imageLink: "",
    //         nickname: "태양물고기",
    //         lastMessage: "먼저 현재 재무 상황과 투자 목표에 대해 말씀해...",
    //         roomId: "3",
    //     },
    // ];
    // chatList?.push(...chatRoom);
    // chatList?.unshift(AI_CHAT_BOT);
    return (
        <Root>
            <Title>대화중인 채팅방</Title>
            {chatRoom?.map((chat, index) => (
                <ChatContainer key={index}>
                    <ChatProfile>{chat.imageLink}</ChatProfile>
                    <ChatInfo>
                        <ChatTitle>{chat.nickname}</ChatTitle>
                        <ReceiveMessage>{chat.lastMessage}</ReceiveMessage>
                    </ChatInfo>
                </ChatContainer>
            ))}
        </Root>
    );
}

export default ChatList;
