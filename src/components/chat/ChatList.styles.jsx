import styled from "@emotion/styled";

export const Root = styled.div``;

export const Title = styled.p`
    font-family: "Pretendard-SemiBold";
    font-size: 18px;
`;

export const ChatContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 70px;
`;

export const ChatProfile = styled.p`
    background-color: #bbbbbb;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    flex-shrink: 0;
`;
export const ChatInfo = styled.div`
    display: flex;
    padding: 0 20px;
    flex-direction: column;
    overflow: hidden;
`;

export const ChatTitle = styled.p`
    margin: 0;
    padding: 0;
`;

export const ReceiveMessage = styled.div`
    margin: 0;
    color: #949ba0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
