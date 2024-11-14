import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import {
    Root,
    ChatContainer,
    MessagesContainer,
    MessageWrapper,
    MessageHeader,
    MessageContent,
    InputContainer,
    Input,
    SendButton,
} from "./ChatRoom.styles";

function ChatRoom() {
    const roomId = useSelector(state => state.chat.currentRoomId);
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: "User1",
            content: "안녕하세요!",
            timestamp: "2024-03-20 10:30:00",
            type: "CHAT",
        },
        {
            id: 2,
            sender: "User2",
            content: "반갑습니다~",
            timestamp: "2024-03-20 10:31:00",
            type: "CHAT",
        },
        {
            id: 3,
            sender: "User1",
            content: "오늘 날씨가 좋네요",
            timestamp: "2024-03-20 10:32:00",
            type: "CHAT",
        },
    ]);
    const [input, setInput] = useState("");
    const stompClient = useRef(null);
    const currentUser = "User2";

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws");
        const client = Stomp.over(socket);

        client.debug = null;

        const headers = {
            "Content-Type": "application/json;charset=UTF-8",
        };

        client.connect(headers, () => {
            client.subscribe(`/topic/chat/room/${roomId}`, message => {
                const receivedMessage = JSON.parse(message.body);
                onMessageReceived(receivedMessage);
            });

            client.send(
                "/app/chat.enter",
                headers,
                JSON.stringify({
                    roomId: roomId,
                    type: "ENTER",
                }),
            );
        });

        stompClient.current = client;

        return () => {
            if (stompClient.current) {
                stompClient.current.disconnect();
            }
        };
    }, [roomId]);

    const onMessageReceived = message => {
        const receivedMessage = JSON.parse(message.body);
        setMessages(prevMessages => [...prevMessages, receivedMessage]);
    };

    const sendMessage = () => {
        if (stompClient.current && input.trim() !== "") {
            const headers = {
                "Content-Type": "application/json;charset=UTF-8",
            };

            const message = {
                sender: "User",
                content: input,
                type: "CHAT",
            };

            stompClient.current.send("/app/chat", headers, JSON.stringify(message));
            setInput("");
        }
    };

    return (
        <Root>
            <ChatContainer>
                <MessagesContainer>
                    {messages.map(message => (
                        <MessageWrapper key={message.id} isMine={message.sender === currentUser}>
                            <MessageHeader>
                                <span>{message.sender}</span>
                                <span style={{ marginLeft: "8px" }}>{message.timestamp}</span>
                            </MessageHeader>
                            <MessageContent isMine={message.sender === currentUser}>{message.content}</MessageContent>
                        </MessageWrapper>
                    ))}
                </MessagesContainer>
            </ChatContainer>
            <InputContainer>
                <Input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyPress={e => e.key === "Enter" && sendMessage()}
                    placeholder="메시지를 입력하세요..."
                />
                <SendButton onClick={sendMessage}>전송</SendButton>
            </InputContainer>
        </Root>
    );
}

export default ChatRoom;
