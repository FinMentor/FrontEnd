import styled from "@emotion/styled";

export const Root = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100vh;
    background: #ffffff;
    padding: 56px 24px 0 24px;
`;

export const Title = styled.h1`
    font-family: "Pretendard-Bold";
    font-size: 40px;
    color: #000000;
    margin: 0;
    text-align: left;
`;

export const Subtitle = styled.p`
    font-family: "Pretendard Light";
    font-size: 16px;
    color: #000000;
    margin-bottom: 50px;
`;

export const Label = styled.label`
    font-family: "Pretendard-Bold";
    font-size: 20px;
    font-weight: 700;
    color: #000000;
    margin-bottom: 12px;
    display: block;
`;

export const Input = styled.input`
    width: 348px;
    height: 53px;
    padding: 0 16px;
    font-size: 16px;
    color: #949ba0;
    border: 1px solid #949ba0;
    border-radius: 20px;
    margin-bottom: 24px;
`;

export const Button = styled.button`
    width: 100%;
    height: 55px;
    background: #ffbc00;
    border-radius: 20px;
    font-family: "Pretendard-SemiBold";
    font-size: 22px;
    color: #ffffff;
    text-align: center;
    border: none;
    cursor: pointer;
    margin-top: 12px;

    &:hover {
        background-color: #e6a800;
    }
`;

export const ErrorMessage = styled.p`
    color: red;
    font-size: 14px;
    margin-top: 10px;
`;
