import styled from "@emotion/styled";
import StarIcon from "@/assets/icons/star.svg?react";
import StarFillIcon from "@/assets/icons/chat-star-fill.svg?react";
export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: flex-end;
    z-index: 1000;
    backdrop-filter: blur(5px); // blur 효과 추가
    -webkit-backdrop-filter: blur(5px); // Safari 지원
`;

export const ModalContent = styled.div`
    background: white;
    width: 100%;
    border-radius: 20px 20px 0 0;
    padding: 20px;
`;

export const ExitButton = styled.button`
    width: 100%;
    padding: 15px;
    border: none;
    background: none;
    font-size: 16px;
    color: #ff0000;
    cursor: pointer;
`;

export const RatingModal = styled(ModalContent)`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

export const StarContainer = styled.div`
    display: flex;
    gap: 10px;
`;

export const Star = styled(StarIcon)`
    cursor: pointer;
    font-size: 30px;
    color: ${props => (props.filled ? "#FFD700" : "#ddd")};
`;
export const StarFill = styled(StarFillIcon)`
    cursor: pointer;
    font-size: 30px;
    color: #ffbc00;
`;
export const FeedbackOptions = styled.div`
    display: flex;
    gap: 20px;
    font-size: 16px;
    flex-wrap: wrap;
    flex-direction: row;
`;

export const FeedbackOption = styled.button`
    padding: 8px 16px;
    border: 1px solid #ffbc00;
    border-radius: 20px;
    width: 100px;
    height: 100px;
    background: ${props => (props.selected ? "#ffbc00" : "white")};
    color: ${props => (props.selected ? "white" : "black")};
    cursor: pointer;
`;

export const FollowSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;

export const FollowButton = styled.button`
    padding: 8px 24px;
    border: 1px solid #ffbc00;
    border-radius: 20px;
    background: #ffbc00;
    color: #ffffff;
    cursor: pointer;
`;

export const CompleteButton = styled.button`
    width: 100%;
    padding: 15px;
    border: none;
    background: #60584c;
    color: white;
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;
`;
