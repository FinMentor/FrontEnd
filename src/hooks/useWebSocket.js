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
                // �ʿ��� ��� �߰�4
            },
            onConnect: () => {
                setIsConnected(true);
                console.log("WebSocket success");

                subscribe(`/topic/chat/${roomId}`);
            },
            onDisconnect: () => {
                console.log("WebSocket ���� ����");
                setIsConnected(false);
            },
            onStompError: err => {
                console.error("STOMP ����:", err);
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
            console.error("WebSocket�� ������� �ʾҽ��ϴ�.");
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
            console.error("�޽��� ���� ����:", error);
        }
    };

    return { isConnected, sendMessage };
};

export default useWebSocket;
