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
`;

export const ProfitRankerCardName = styled.h3`
    font-family: "Pretendard-Medium";
    font-size: 16px;
`;
