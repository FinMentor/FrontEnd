import {
    Root,
    Title,
    ChatContainer,
    ChatProfile,
    ChatTitle,
    ReceiveMessage,
    ChatInfo,
    StyledLink,
} from "./ChatList.styles";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const fetchChatList = async () => {
    const response = await axios.get(`http://localhost:8080/api/v1/chatroom`, {
        withCredentials: true,
    });
    return response.data.responseEntity.body.chatroomDetailDTOList;
};

function ChatList() {
    const { data: chatRoom } = useQuery({
        queryKey: ["chatRoom"],
        queryFn: () => fetchChatList(),
        select: data => [...data],
        staleTime: 0,
        cacheTime: 0,
        refetchOnWindowFocus: true,
    });

    const defaultProfileImage = "/images/default-profile.png";
    return (
        <Root>
            <Title>대화중인 채팅방</Title>
            {chatRoom?.map((chat, index) => (
                <StyledLink
                    to={`/chat/room`}
                    key={index}
                    state={{
                        chatroomId: chat.chatroomId,
                        receiverId: chat.receiverId,
                        receiverNickName: chat.receiverNickName,
                        receiverProfileUrl: chat.receiverProfileUrl,
                    }}
                >
                    <ChatContainer>
                        {chat.receiverProfileUrl ? (
                            <ChatProfile
                                src={
                                    chat.receiverProfileUrl
                                        ? `http://localhost:8080${chat.receiverProfileUrl}`
                                        : `http://localhost:8080${defaultProfileImage}`
                                }
                                onError={e => {
                                    e.target.onerror = null; // 무한 루프 방지
                                    e.target.src = defaultProfileImage;
                                }}
                            />
                        ) : (
                            <ChatProfile isDefault={true} />
                        )}
                        <ChatInfo>
                            <ChatTitle>{chat.receiverNickName}</ChatTitle>
                            <ReceiveMessage>{chat.recentMessage}</ReceiveMessage>
                        </ChatInfo>
                    </ChatContainer>
                </StyledLink>
            ))}
        </Root>
    );
}

export default ChatList;
