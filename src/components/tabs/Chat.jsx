import { useSelector } from "react-redux";
import { Root, HintMessage, AIMatchingContainer } from "./Chat.styles";
import AIMatching from "@/components/chat/AIMatching";
import ChatList from "@/components/chat/ChatList";
import PopularChatRoom from "@/components/chat/PopularChatRoom";
import ChatRoom from "@/components/chat/ChatRoom";
import FindMentor from "@/components/mentorForm/FindMentor";

function Chat() {
    const isInChatRoom = useSelector(state => state.chat.isInChatRoom);
    const isInMatching = useSelector(state => state.matching.isInMatching);

    console.log(isInMatching);
    return (
        <Root>
            {!isInChatRoom ? (
                !isInMatching ? (
                    <FindMentor />
                ) : (
                    <>
                        <AIMatchingContainer>
                            <HintMessage>나와 비슷한 관심사를 가진 고수와 채팅해보세요!</HintMessage>
                            <AIMatching />
                        </AIMatchingContainer>
                        <ChatList />
                        <PopularChatRoom />
                    </>
                )
            ) : (
                <ChatRoom />
            )}
        </Root>
    );
}

export default Chat;
