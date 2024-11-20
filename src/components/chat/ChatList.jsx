import { Root, Title, ChatContainer, ChatProfile, ChatTitle, ReceiveMessage, ChatInfo } from "./ChatList.styles";

function ChatList() {
    const AI_CHAT_BOT = {
        imageLink: "",
        nickname: "AI채팅봇",
        lastMessage: "회원님께 필요한 고수를 추천해드립니다.",
        roomId: "1",
    };
    const chatList = [
        {
            imageLink: "",
            nickname: "빽이",
            lastMessage: "먼저 현재 재무 상황과 투자 목표에 대해 말씀해...",
            roomId: "2",
        },
        {
            imageLink: "",
            nickname: "태양물고기",
            lastMessage: "먼저 현재 재무 상황과 투자 목표에 대해 말씀해...",
            roomId: "3",
        },
    ];
    chatList.unshift(AI_CHAT_BOT);

    return (
        <Root>
            <Title>대화중인 채팅방</Title>
            {chatList.map(chat => (
                <ChatContainer key={chat.nickname}>
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
