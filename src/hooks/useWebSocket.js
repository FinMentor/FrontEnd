/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const WS_PATH = "ws://localhost:8080";
const BASE_PATH = "http://localhost:8080";

const useWebSocket = (roomId, onMessageReceived) => {
    const [isConnected, setIsConnected] = useState(false);
    const stompClient = useRef(null);
    useEffect(() => {
        if (!roomId) return;

        console.log("roomId", roomId);
        const client = new Client({
            brokerURL: `${WS_PATH}/ws`,
            webSocketFactory: () => {
                return new SockJS(`${BASE_PATH}/ws`);
            },
            connectHeaders: {
                // 필요한 헤더 추가4
            },
            onConnect: () => {
                setIsConnected(true);
                console.log("WebSocket success");

                subscribe(`/topic/chat/${roomId}`);
            },
            onDisconnect: () => {
                console.log("WebSocket 연결 해제");
                setIsConnected(false);
            },
            onStompError: err => {
                console.error("STOMP 에러:", err);
                setIsConnected(false);
            },
        });
        client.activate();

        stompClient.current = client;

        return () => {
            client.deactivate();
        };
    }, [roomId]);

    const subscribe = destination => {
        try {
            const subscription = stompClient.current.subscribe(destination, message => {
                try {
                    const newMessage = JSON.parse(message.body);
                    console.log("Received message:", newMessage);
                    onMessageReceived(newMessage);
                } catch (error) {
                    console.error("Message parsing error:", error);
                }
            });

            console.log(`Subscribed to ${destination}`);
            return subscription;
        } catch (error) {
            console.error(`Subscribe error for ${destination}:`, error);
        }
    };

    const sendMessage = messageData => {
        if (!isConnected || !stompClient.current) {
            console.error("WebSocket이 연결되지 않았습니다.");
            return;
        }
        console.log(messageData);
        const destination = `/api/v1/chat/send`;
        try {
            stompClient.current.publish({
                destination,
                body: JSON.stringify({
                    chatroomId: roomId,
                    content: messageData.content,
                    timestamp: new Date(),
                }),
            });
        } catch (error) {
            console.error("메시지 전송 실패:", error);
        }
    };

    return { isConnected, sendMessage };
};

export default useWebSocket;
