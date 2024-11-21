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
    padding-top: 16px;
`;

export const MonthlyProfitTitle = styled.h2`
    font-family: "Pretendard-Bold";
    font-size: 24px;
    margin-top: 24px;
`;

export const WeeklyProfitContainer = styled.div`
    border-radius: 16px;
`;

export const WeeklyProfitTitle = styled.h2`
    font-family: "Pretendard-Bold";
    font-size: 24px;
    margin-top: 36px;
`;

export const ProfitRankerList = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: calc(100% - 1px);
    margin-left: -20px;
    padding-top: 24px;
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
    text-align: center;
    margin: 16px 0 0 0;
`;

export const TabContainer = styled.div`
    display: flex;
    border-bottom: 1px solid #e0e0e0;
    margin-top: 8px;
    margin-left: -24px;
    margin-right: -24px;
    padding: 0 24px;
`;

export const Tab = styled.button`
    width: 80px;
    padding: 12px 8px 12px 8px;
    background: none;
    border: none;
    font-size: 22px;
    font-family: "Pretendard-Regular";
    cursor: pointer;
    color: ${({ active }) => (active ? "#000" : "#757575")};
    font-weight: ${({ active }) => (active ? "bold" : "normal")};
    border-bottom: ${({ active }) => (active ? "2px solid #000" : "none")};
    text-align: center;
`;

export const ProfitRankerCardCategory = styled.p`
    font-family: "Pretendard-Regular";
    font-size: 14px;
    color: #919db0;
`;
