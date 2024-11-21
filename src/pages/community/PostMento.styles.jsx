import styled from "@emotion/styled";

export const PostContainer = styled.div`
    font-family: "Pretendard", sans-serif;
    background-color: #ffffff;
    box-sizing: border-box;
    overflow-x: hidden; /* 가로 스크롤 방지 */
    padding: 0 16px; /* 기본 패딩 설정 */
`;

export const PostImageWrapper = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: 16px; /* 이미지와 내용 간 간격 */
    overflow: hidden;
`;

export const PostImage = styled.img`
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
`;

export const PostTitle = styled.h1`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: -10px;
`;

export const AuthorInfo = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    div {
        margin-left: 8px;

        p:first-of-type {
            font-size: 14px;
            margin-bottom: -10px;
        }

        p:last-of-type {
            font-size: 12px;
            color: #757575;
        }
    }
`;

export const ProfileImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 4px;
    object-fit: cover;
`;

export const Divider = styled.hr`
    border: none;
    border-top: 1px solid #e0e0e0;
    margin: 16px 0;
`;

export const Content = styled.div`
    margin-top: 40px;
    margin-bottom: 60px;
    font-size: 16px;
    line-height: 2;
    color: #333333;
`;

export const ActionButtons = styled.div`
    display: flex;
    gap: 16px;
    padding: 0 16px;
    margin-bottom: 32px; /* 아래 간격 추가 */

    button {
        display: flex;
        gap: 8px;
        background: none;
        border: none;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        color: #757575; /* 기본 색상 */

        img {
            width: 20px;
            height: 20px;
        }

        &:hover {
            color: #fbc02d; /* hover 시 색상 변경 */
        }
    }
`;

export const LikeButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;

    color: ${({ liked }) => (liked ? "#fbc02d" : "#757575")}; /* 활성화 시 노란색, 비활성화 시 기본색 */

    img {
        width: 20px;
        height: 20px;
    }
`;

export const BottomAuthorInfo = styled.div`
    display: flex;
    align-items: flex-start; /* 프로필 사진과 채팅 버튼을 같은 높이에 정렬 */
    padding: 16px;
    padding-top: 32px;
    padding-bottom: 100px; /* 하단 여백을 늘려줌 */
    border-top: 1px solid #e0e0e0;

    .profile-wrapper {
        display: flex;
        justify-content: flex-start; /* 텍스트를 위쪽 정렬 */
        flex-direction: column; /* 이름과 작성 시간을 세로로 정렬 */
        margin-left: 8px;
        max-width: 50%; /* introduce의 최대 가로길이 제한 */
        transform: translateY(-20px); /* 텍스트를 위로 올림 */
    }

    .introduce {
        margin: 4px 0 0 0; /* 위쪽 여백만 설정, 왼쪽 여백 제거 */
        font-size: 14px;
        color: #757575;
        text-align: left; /* 텍스트 왼쪽 정렬 */
        word-wrap: break-word; /* 긴 단어가 있을 경우 줄바꿈 처리 */
        margin-top: -10px;
    }

    .chat-button-wrapper {
        margin-left: auto; /* 버튼을 오른쪽 끝으로 이동 */
        display: flex;
        align-items: center; /* 버튼과 프로필 사진 높이를 맞춤 */
    }
`;

export const ChatButton = styled.button`
    background-color: #fbc02d;
    color: white;
    border: none;
    margin-top: 20px;
    border-radius: 8px;
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    white-space: nowrap; /* 텍스트 줄바꿈 방지 */
`;
