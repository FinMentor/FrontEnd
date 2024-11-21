import styled from "@emotion/styled";

export const FloatingButtonWrapper = styled.button`
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

    img {
        width: 32px;
        height: 32px;
    }
`;
