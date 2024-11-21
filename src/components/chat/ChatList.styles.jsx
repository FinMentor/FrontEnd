import styled from "@emotion/styled";
import { Link } from "react-router-dom";
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

export const ChatProfile = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 16px;
    object-fit: cover;
    background-color: #f0f0f0; // 이미지 로딩 전 배경색
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

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;
