import styled from "@emotion/styled";

export const PostTitle = styled.h1`
    font-size: 20px;
    font-weight: bold;
    margin: 16px 0 32px;
`;

export const AuthorInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    div {
        display: flex;
        flex-direction: column;
        line-height: 0; /* 간격을 줄임 */
    }
    p:first-of-type {
        font-size: 14px;
        color: #000; /* 작성자 아이디 검은색 */
        /* 글씨 강조 */
    }

    p:last-of-type {
        font-size: 12px;
        color: #757575; /* 시간 및 조회수 회색 */
    }
`;

export const ProfileImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 4px; /* 사각형 */
    margin-right: 8px; /* 텍스트와 간격 */
    object-fit: cover;
`;
export const CommentHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;

    div {
        flex: 1;
        display: flex;
        align-items: center;
        font-size: 14px; /* 댓글 작성자는 상대적으로 작게 */
        justify-content: space-between;
    }
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

export const CommentActions = styled.div`
    display: flex;
    gap: 16px;
    margin-top: 8px;

    button {
        display: flex;
        align-items: center;
        gap: 4px;
        background: white; /* 버튼 배경 */
        border: 1px solid #ddd; /* 테두리 */
        border-radius: 8px; /* 둥근 모서리 */
        padding: 8px 12px; /* 버튼 내부 여백 */
        font-size: 12px;
        color: #757575;
        cursor: pointer;

        img {
            width: 16px;
            height: 16px; /* 아이콘 크기 */
        }
    }
`;
export const Content = styled.div`
    font-size: 16px;
    line-height: 1.5;
    margin: 16px;
    white-space: pre-wrap; /* 줄바꿈 유지 */
`;

export const Divider = styled.hr`
    border: none;
    border-top: 1px solid #e0e0e0;
    margin: 16px 0 50px;
`;

export const ActionButtons = styled.div`
    display: flex;
    justify-content: flex-start; /* 왼쪽 정렬 */
    gap: 16px; /* 버튼 간 간격 추가 */
    margin: 50px 0 50px;

    button {
        display: flex; /* 아이콘과 텍스트를 가로로 정렬 */
        align-items: center;
        background: none;
        border: none;
        cursor: pointer;
        font-size: 14px;
        color: #757575;

        img {
            width: 20px;
            height: 20px;
            margin-right: 8px; /* 아이콘과 텍스트 간 간격 */
        }
    }
`;

export const CommentSection = styled.div`
    margin: 16px;
`;

export const Comment = styled.div`
    padding: 20px 0 20px;
    border-bottom: 1px solid #e0e0e0;
    font-size: 12px;

    p {
        margin: 10px 0;
    }

    &:last-of-type {
        border-bottom: none;
    }
`;

export const PostContainer = styled.div`
    padding: 16px;
    font-family: "Pretendard", sans-serif;
    padding-bottom: 80px; /* 댓글 입력창과의 여백 */
    position: relative; /* 페이지의 기본 위치 */
    overflow: auto; /* 스크롤이 정상적으로 작동하도록 설정 */
`;

export const FixedCommentContainer = styled.div`
    position: fixed; /* 항상 화면 하단에 고정 */
    bottom: 0; /* 화면의 가장 하단에 위치 */
    left: 0; /* 화면의 왼쪽 시작점 */
    width: 100%; /* 화면 전체를 차지 */
    max-width: 800px; /* 최대 너비 제한 */
    display: flex;
    align-items: center;
    padding: 8px 16px;
    background: #fff; /* 배경색 */
    border-top: 1px solid #e0e0e0; /* 상단 구분선 */
    z-index: 1000; /* 항상 위에 표시 */
    margin: 0 auto; /* 중앙 정렬 */
    box-sizing: border-box; /* 패딩 포함 계산 */
    height: 64px; /* 고정 높이 설정 */
`;

export const CommentInput = styled.input`
    flex: 1; /* 입력창이 가변적으로 공간을 차지 */
    padding: 12px;
    margin-right: 8px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
    outline: none;
`;

export const SendButton = styled.button`
    background: #fbc02d;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px 16px; /* 버튼 크기 */
    font-size: 14px;
    cursor: pointer;
    white-space: nowrap; /* 텍스트 줄바꿈 방지 */
`;
