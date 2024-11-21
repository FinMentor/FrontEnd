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
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 100px;
    height: 133px;

    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
`;

export const ProfileImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

export const Nickname = styled.div`
    font-family: "Pretendard-Bold";
    font-size: 14px;
    color: #000000;
`;

export const Category = styled.div`
    font-family: "Pretendard-Regular";
    font-size: 12px;
    color: #919db0;
`;

export const FirstPlace = styled(Card)`
    top: 40px;
    left: 38%;
`;

export const SecondPlace = styled(Card)`
    top: 190px;
    left: 10%;
`;

export const ThirdPlace = styled(Card)`
    top: 190px;
    right: 10%;
`;
