import styled from "@emotion/styled";

export const Root = styled.div`
    background-color: #f5f5f5;
    position: fixed;
    bottom: 0;
    height: 490px;
    width: calc(100vw - 48px);
    padding: 24px;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
`;

export const MonthlyProfitContainer = styled.div`
    border-radius: 16px;
`;

export const MonthlyProfitTitle = styled.h2`
    font-family: "Pretendard-Bold";
    font-size: 24px;
`;

export const WeeklyProfitContainer = styled.div`
    border-radius: 16px;
`;

export const WeeklyProfitTitle = styled.h2`
    font-family: "Pretendard-Bold";
    font-size: 24px;
`;

export const ProfitRankerList = styled.ul`
    display: flex;
    flex-direction: row;
    gap: 50px;
`;

export const ProfitRankerCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ProfitRankerCardProfileImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #e0e0e0;
`;

export const ProfitRankerCardName = styled.h3`
    font-family: "Pretendard-Medium";
    font-size: 16px;
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
    font-size: 24px;
    font-family: "Pretendard-Medium";
    cursor: pointer;
    color: ${({ active }) => (active ? "#000" : "#757575")};
    font-weight: ${({ active }) => (active ? "bold" : "normal")};
    border-bottom: ${({ active }) => (active ? "2px solid #000" : "none")};
    text-align: center;
`;

export const ProfitRankerCardCategory = styled.p`
    font-family: "Pretendard-Medium";
    font-size: 14px;
`;
