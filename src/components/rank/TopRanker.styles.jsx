import styled from "@emotion/styled";

export const Root = styled.div`
    font-family: "Pretendard-Medium";
    position: relative;
`;

export const HintBox = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 12px;
    color: #757575;
`;

const Card = styled.div`
    position: absolute;
    background-color: #ffffff;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    text-align: center;
    width: 100px;
    height: 133px;
`;

export const FirstPlace = styled(Card)`
    top: 50px;
    left: 38%;
`;

export const SecondPlace = styled(Card)`
    top: 200px;
    left: 10%;
`;

export const ThirdPlace = styled(Card)`
    top: 200px;
    right: 10%;
`;
