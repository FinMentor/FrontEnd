import styled from "@emotion/styled";

export const Root = styled.div`
    width: 100%;
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
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 40px;
`;

export const MessageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: ${props => (props.isMine ? "flex-end" : "flex-start")};
    width: 100%;
    margin: 8px 0;
`;

export const MessageRow = styled.div`
    display: flex;
    flex-direction: ${props => (props.isMine ? "row" : "row-reverse")};
    align-items: flex-end;
    gap: 8px;
`;

export const MessageContent = styled.div`
    background: ${props => (props.isMine ? "#60584C " : "#e9ecef")};
    color: ${props => (props.isMine ? "#fff" : "#000")};
    padding: 8px 12px;
    border-radius: ${props => (props.isMine ? "16px 0 16px 16px" : "0 16px 16px 16px")};
    max-width: 70%;
    word-break: break-word;
`;

export const MessageTime = styled.span`
    font-size: 12px;
    color: #666;
`;

export const InputContainer = styled.div`
    display: flex;
    padding: 16px;
    background-color: #fff;
    border-top: 1px solid #eee;
    position: fixed;
    bottom: 0;
    box-sizing: border-box;
    width: 90%;
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
    color: #000;
    border: none;
    cursor: pointer;
    border-radius: 0%;
`;

export const ReceiverInfoContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const ReceiverProfile = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
`;

export const ReceiverName = styled.div`
    font-weight: 500;
    font-size: 16px;
`;
