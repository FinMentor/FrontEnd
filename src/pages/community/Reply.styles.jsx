import styled from "@emotion/styled";

export const ReplyContainer = styled.div`
    padding: 16px;
    font-family: "Pretendard", sans-serif;
    display: flex;
    flex-direction: column; /* 세로 정렬 */
    height: 100vh; /* 전체 화면 높이를 차지 */
    box-sizing: border-box; /* 패딩 포함 */
    overflow-y: auto; /* 세로 스크롤 활성화 */
`;

export const ReplyContent = styled.div`
    margin-top: 16px;
    p:first-of-type {
        font-size: 14px;
        margin-bottom: 8px;
    }
    p:last-of-type {
        font-size: 12px;
        color: #757575;
    }
`;

export const ReplyHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    div {
        margin-left: 8px;
        p {
            font-size: 14px;
        }
    }
`;

export const ProfileImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 8px;
`;

export const ChatButton = styled.button`
    background-color: #fbc02d;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 6px 12px;
    font-size: 12px;
    cursor: pointer;
`;

export const Divider = styled.hr`
    border: none;
    border-top: 1px solid #ddd;
    margin: 16px 0;
`;

export const CommentActions = styled.div`
    display: flex;
    gap: 16px;

    button {
        display: flex;
        align-items: center;
        gap: 4px;
        background: none;
        border: none;
        font-size: 14px;
        color: #757575;
        cursor: pointer;

        img {
            width: 16px;
            height: 16px;
        }
    }
`;

export const FixedInputContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 16px;
    background: #fff;
    border-top: 1px solid #ddd;
    display: flex;
    gap: 8px;
    align-items: center;
    box-sizing: border-box;
    z-index: 1000;
`;

export const CommentInput = styled.input`
    flex: 1;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
    outline: none;
`;

export const SendButton = styled.button`
    padding: 12px 16px;
    background: #fbc02d;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
`;

export const ReplyHeaderBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #ddd;
    background: white;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;

    h1 {
        font-size: 16px;
        font-weight: bold;
        margin: 0;
        position: absolute; /* 텍스트를 가운데 정렬 */
        left: 50%;
        transform: translateX(-50%); /* 수평 정렬 보정 */
    }

    .close-button {
        background: none;
        border: none;
        font-size: 16px;
        cursor: pointer;
        margin-right: auto; /* X 버튼을 왼쪽으로 밀어냄 */
    }
`;

export const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
`;
