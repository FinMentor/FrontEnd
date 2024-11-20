import styled from "@emotion/styled";
// import theme from "@/styles/theme";

export const Root = styled.div`
    background-color: #ffffff;
    padding: 24px;
    height: 100vh;
    font-family: "Pretendard";
    margin: 0 auto; /* 중앙 정렬 */
`;

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
`;

export const Title = styled.h1`
    font-family: "Pretendard-Bold";
    font-size: 20px;
`;

export const NotificationIcon = styled.div`
    font-size: 24px;
`;

export const TabContainer = styled.div`
    display: flex;
    border-bottom: 1px solid #e0e0e0;
    margin-top: 8px;
    margin-left: -24px; /* Root의 padding과 맞추기 위해 좌우로 마이너스 마진 추가 */
    margin-right: -24px;
    padding: 0 24px; /* 줄이 양쪽 끝까지 가도록 padding 추가 */
`;

export const Tab = styled.button`
    width: auto; /* 탭이 꽉 차지 않도록 설정 */
    padding: 16px;
    background: none;
    border: none;
    font-size: 16px;
    font-family: "Pretendard-Medium";
    cursor: pointer;
    color: ${({ active }) => (active ? "#000" : "#757575")}; /* 선택된 탭 색상 */
    font-weight: ${({ active }) => (active ? "bold" : "normal")}; /* 선택된 탭 굵게 */
    border-bottom: ${({ active }) => (active ? "2px solid #000" : "none")}; /* 하단 강조선 */
    text-align: center;
`;

export const NotificationBanner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 382px;
    height: 48px;
    background-color: rgba(255, 204, 0, 0.5); /* KB Yellow Positive 색상에 50% 투명도 */
    color: #6d4c41;
    padding: 0 10px;
    margin: 16px 0;
    border-radius: 12px;
    font-size: 14px;
    text-align: center;
    font-family: "Pretendard";
    box-sizing: border-box;

    img {
        margin-left: 8px; /* 텍스트와 아이콘 간격 */
    }
`;

export const FilterContainer = styled.div`
    margin: 16px 0;
`;

export const StyledSelect = styled.select`
    background-color: rgba(235, 220, 163, 0.5);
    color: #000;
    padding: 8px 6px; /* 오른쪽 패딩 줄여서 화살표와 글자 간격 줄이기 */
    border: none;
    border-radius: 8px;
    font-family: pretendard;
    font-size: 14px;
    cursor: pointer;
    outline: none;
    text-align: center; /* 텍스트를 오른쪽 정렬하여 화살표와 붙이기 */
`;

export const Dropdown = styled.div`
    display: inline-block;
    padding: 8px 12px;
    background-color: #f0f0f0;
    border-radius: 8px;
    cursor: pointer;
    font-family: "Pretendard-Medium";
`;

export const PostListContainer = styled.div`
    margin-bottom: 16px;
`;

export const PostItem = styled.div`
    padding: 16px;
    border-bottom: 1px solid #e0e0e0;
`;

export const PostTitle = styled.div`
    font-size: 16px;
    font-family: "Pretendard-Medium";
    margin-bottom: 8px;
`;

export const PostInfo = styled.div`
    color: #757575;
    font-size: 14px;
`;

export const FloatingActionButton = styled.button`
    position: fixed;
    bottom: 120px;
    right: 24px;
    width: 56px;
    height: 56px;
    background-color: #fbc02d;
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;
