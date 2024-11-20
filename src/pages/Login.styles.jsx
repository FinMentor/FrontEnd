import styled from "@emotion/styled";

export const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 20px;
    background-color: #f1f1f1;
`;

export const Title = styled.h1`
    font-family: "Pretendard-Bold";
    font-size: 24px;
    margin-bottom: 20px;
`;

export const Input = styled.input`
    width: 100%;
    max-width: 400px;
    padding: 12px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
`;

export const Button = styled.button`
    width: 100%;
    max-width: 400px;
    padding: 12px;
    background-color: #ffbc00;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background-color: #e6a800;
    }
`;

export const ErrorMessage = styled.p`
    color: red;
    font-size: 14px;
    margin-top: 10px;
`;
