import styled from "@emotion/styled";

export const Root = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    font-family: "Pretendard-Regular";
`;

export const ChatContainer = styled.div`
    flex: 1;
    padding: 20px;
    overflow-y: auto;
`;

export const MessagesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const MessageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: ${props => (props.isMine ? "flex-start" : "flex-end")};
    margin: 8px 0;
`;

export const MessageHeader = styled.div`
    font-size: 12px;
    color: #666;
    margin-bottom: 4px;
`;

export const MessageContent = styled.div`
    max-width: 70%;
    padding: 12px 16px;
    border-radius: 16px;
    background-color: ${props => (props.isMine ? "#FFD400" : "#f0f0f0")};
    color: ${props => (props.isMine ? "#000" : "#000")};
`;

export const InputContainer = styled.div`
    display: flex;
    padding: 16px;
    background-color: #fff;
    border-top: 1px solid #eee;
    position: fixed;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
`;

export const Input = styled.input`
    flex: 1;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 20px;
    margin-right: 8px;
    outline: none;
`;

export const SendButton = styled.button`
    padding: 12px 24px;
    background-color: #ffd400;
    color: #000;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-weight: bold;

    &:hover {
        background-color: #e6bf00;
    }
`;
