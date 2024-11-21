import { Root, HintMessage, AIMatchingContainer } from "./ChatIndex.styles";
import AIMatching from "@/components/chat/AIMatching";
import ChatList from "@/components/chat/ChatList";
// import PopularChatRoom from "@/components/chat/PopularChatRoom";

function ChatIndex() {
    return (
        <Root>
            <>
                <AIMatchingContainer>
                    <HintMessage>나와 비슷한 관심사를 가진 고수와 채팅해보세요!</HintMessage>
                    <AIMatching />
                </AIMatchingContainer>
                <ChatList />
                {/* <PopularChatRoom /> */}
            </>
        </Root>
    );
}

export default ChatIndex;
