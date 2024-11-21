import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%; /* 전체 너비 */
    max-width: 100vw; /* 최대 너비 제한 */
    padding: 56px 16px 16px; /* Header 높이를 고려한 상단 패딩 */
    box-sizing: border-box;
    background-color: #ffffff;
`;

export const Header = styled.div`
    position: fixed; /* 화면 상단에 고정 */
    top: 0;
    left: 0;
    width: 100%; /* 화면 너비 전체 사용 */
    height: 56px; /* 적절한 높이 설정 */
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff; /* 배경색 설정 */
    z-index: 10; /* 다른 요소 위에 표시 */
    padding: 0 16px; /* 좌우 패딩 */
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1); /* 약간의 그림자 추가 */
    box-sizing: border-box; /* 패딩 포함 계산 */
    font-size: 20px;
`;

export const BackButton = styled.button`
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
`;

export const SubmitButton = styled.button`
    background: transparent;
    color: #9e9e9e;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    font-size: 20px;
    cursor: pointer;
    font-family: "Pretendard", sans-serif;
`;

export const TitleInput = styled.input`
    margin-top: 0; /* 더 위로 붙이기 */
    width: 100%;
    padding: 12px 0;
    font-size: 24px;
    border: none;
    border-bottom: 1px solid #e0e0e0;
    outline: none;
    box-sizing: border-box;
    font-family: "Pretendard", sans-serif;
`;

export const Description = styled.p`
    margin: 24px 0; /* 더 아래로 내리기 */
    font-size: 14px;
    color: #757575;
    line-height: 1.5;
`;

export const ContentInput = styled.textarea`
    width: 100%;
    margin-top: 20px; /* 제목과 적절한 간격 유지 */
    padding: 12px 0;
    font-size: 16px;
    border: none;
    border-bottom: 1px solid #e0e0e0;
    outline: none;
    resize: none;
    height: 600px;
    box-sizing: border-box;
    font-family: "Pretendard", sans-serif;
`;

export const Footer = styled.div`
    margin: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const IconAndCount = styled.div`
    display: flex;
    align-items: center;

    img {
        width: 24px;
        height: 24px;
        cursor: pointer;
        margin-right: 4px; /* 아이콘과 글자 사이 간격 */
    }
`;

export const CharacterCount = styled.div`
    font-size: 14px;
    color: #757575;
`;

export const ModalStyle = styled.div`
    background-color: #ffffff;
    padding: 16px;
    border-radius: 8px;
    width: 90%;
    width: 400px;
    margin: 0 auto;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ModalHeader = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 16px;
    text-align: center;
    font-family: "Pretendard", sans-serif;
`;

export const ModalItem = styled.div`
    padding: 16px; /* 선택지 간 여백 추가 */
    font-size: 16px;
    text-align: center; /* 텍스트 중앙 정렬 */
    cursor: pointer;
    border-bottom: 1px solid #e0e0e0;
    font-family: "Pretendard", sans-serif;
    &:last-child {
        border-bottom: none; /* 마지막 아이템 하단선 제거 */
    }
    &:hover {
        background-color: #f5f5f5; /* 호버 시 배경 색상 */
    }
`;
