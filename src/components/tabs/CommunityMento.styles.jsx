import styled from "@emotion/styled";

export const Root = styled.div`
    background-color: #fffff;
    padding: 0px;
    height: 100vh;
    font-family: "Pretendard";
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

export const TabContainer = styled.div`
    display: flex;
    border-bottom: 1px solid #e0e0e0;
    margin-top: 8px;
    padding: 0 24px; /* 양쪽 패딩을 유지하고 마진을 제거 */
    justify-content: center; /* 탭들을 중앙 정렬 */
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
    width: 100%; /* 배너가 전체 너비를 차지하도록 설정 */
    height: 48px;
    background-color: rgba(246, 161, 34, 0.3);
    color: #6d4c41;
    padding: 0 10px;
    margin: 16px 0; /* 중앙 정렬을 위해 margin auto 제거 */
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
    display: flex;
    align-items: center; /* 요소를 수평 가운데 정렬 */
    justify-content: space-between; /* 양쪽으로 정렬 */
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

// 토글 스위치 컨테이너
export const ToggleSwitchContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: 16px;
`;

// 토글 스위치 레이블
export const ToggleLabel = styled.span`
    font-size: 14px;
    margin-right: 8px;
    color: #333;
`;

// 토글 스위치 버튼
export const ToggleSwitch = styled.div`
    width: 48px;
    height: 24px;
    background-color: ${({ isOn }) => (isOn ? "#FFD400" : "#ccc")};
    border-radius: 16px;
    position: relative;
    cursor: pointer;

    .toggle-knob {
        width: 20px;
        height: 20px;
        background-color: white;
        border-radius: 50%;
        position: absolute;
        top: 2px;
        left: ${({ isOn }) => (isOn ? "26px" : "2px")};
        transition: left 0.3s ease;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    }
`;

export const PostListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: space-between;
    margin-bottom: 16px;
`;

export const PostImage = styled.img`
    width: 100%;
    height: 100px; /* 이미지 높이 고정 */
    object-fit: cover; /* 컨테이너 크기에 맞게 자르기 */
    border-radius: 8px 8px 0 0; /* 상단 모서리 둥글게 처리 */
    margin-bottom: 8px; /* 이미지와 텍스트 사이 여백 */
`;

export const PostItem = styled.div`
    flex: 1 1 calc(50% - 16px); /* 두 개씩 정렬되도록 설정 */
    max-width: calc(50% - 16px); /* 최대 너비를 50%로 설정 */
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    padding: 16px;
    border-bottom: 1px solid #e0e0e0;
    overflow: hidden;
    cursor: pointer;
    box-sizing: border-box; /* 너비 계산 정확히 */
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
