import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    Root,
    ChatContainer,
    MessagesContainer,
    MessageWrapper,
    MessageRow,
    MessageContent,
    MessageTime,
    InputContainer,
    Input,
    ReceiverInfoContainer,
    ReceiverProfile,
    ReceiverName,
} from "./ChatRoom.styles";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { getUserInfo } from "@/utils/auth";
import useWebSocket from "@/hooks/useWebSocket";
import ChatSend from "@/assets/icons/chat-send.svg?react";
import { useDispatch } from "react-redux";
import { enterChatRoom, exitChatRoom } from "@/states/chatSlice";
const API_URL = "http://localhost:8080/api/v1/chat/rooms/enter";

const getChatRooms = async id => {
    const response = await axios.get(API_URL, {
        withCredentials: true,
        params: {
            chatroomId: id,
            size: 100,
        },
    });
    return response.data.responseEntity.body.messageDetailsDTOList;
};

function ChatRoom() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { chatroomId, receiverNickName, receiverProfileUrl } = location.state || {};
    const { memberId } = getUserInfo();
    const [input, setInput] = useState("");
    const messageAreaRef = useRef(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (chatroomId) {
            dispatch(enterChatRoom({ chatroomId, receiverNickName }));
        }
        return () => {
            dispatch(exitChatRoom());
        };
    }, [chatroomId, dispatch, receiverNickName]);

    const handleNewMessage = useCallback(newMessage => {
        setMessages(prev => [...prev, newMessage]);
    }, []);

    const { isConnected, sendMessage } = useWebSocket(chatroomId, handleNewMessage);
    const { data: messagesData } = useQuery({
        queryKey: ["message", chatroomId],
        queryFn: () => getChatRooms(chatroomId),
    });

    useEffect(() => {
        setMessages(messagesData);
    }, [messagesData]);

    useEffect(() => {
        if (messageAreaRef.current) {
            messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight + 50;
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (!input.trim() || !isConnected) return;

        try {
            const message = {
                memberId,
                chatroomId,
                content: input.trim(),
                messageType: "N",
            };

            sendMessage(message);
            setInput("");
        } catch (error) {
            console.error("메시지 전송 실패:", error);
        }
    };
    const handleKeyPress = e => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };
    const formatTime = dateString => {
        const date = new Date(dateString);
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const ampm = hours >= 12 ? "오후" : "오전";
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes.toString().padStart(2, "0");

        return `${ampm} ${formattedHours}:${formattedMinutes}`;
    };
    return (
        <Root>
            <ChatContainer ref={messageAreaRef}>
                <MessagesContainer>
                    {messages?.map((message, index) => {
                        const isMine = message.memberId === memberId;
                        return (
                            <MessageWrapper key={index} isMine={isMine}>
                                {!isMine && (
                                    <ReceiverInfoContainer>
                                        <ReceiverProfile
                                            src={`http://localhost:8080${receiverProfileUrl}`}
                                            alt={`${receiverNickName}의 프로필`}
                                        />
                                        <ReceiverName>{receiverNickName}</ReceiverName>
                                    </ReceiverInfoContainer>
                                )}
                                <MessageRow isMine={isMine}>
                                    <MessageTime>{formatTime(message.createdAt)}</MessageTime>
                                    <MessageContent isMine={isMine}>{message.content}</MessageContent>
                                </MessageRow>
                            </MessageWrapper>
                        );
                    })}
                </MessagesContainer>
            </ChatContainer>
            <InputContainer>
                <Input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="메시지를 입력하세요..."
                />
                <ChatSend onClick={handleSendMessage} />
            </InputContainer>
        </Root>
    );
}

export default ChatRoom;
