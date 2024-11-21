import styled from "@emotion/styled";

export const Root = styled.div`
    position: relative;
    height: 100vh;
`;

export const Title = styled.h1``;

export const CategoryContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20px;
`;

export const Category = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 47%;
    margin-bottom: 24px;
    height: 172px;
    width: 172px;
    border-radius: 20px;
    background-color: #d9d9d9;
    font-size: 24px;
    font-family: "Pretendard-SemiBold";
`;

export const MentorCard = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    margin: 12px 0;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 2px solid ${props => (props.isSelected ? "#FFBC00" : "transparent")};
    cursor: pointer;
    transition: border-color 0.2s ease;

    &:hover {
        border-color: #ffbc00;
    }
`;

export const ProfileSection = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const InfoSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const ActionSection = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const MentorProfileImage = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 30px;
    object-fit: cover;
`;

export const MentorCategory = styled.div`
    font-size: 12px;
    color: #666;
    font-family: "Pretendard-Regular";
`;

export const MentorName = styled.div`
    font-size: 16px;
    font-weight: bold;
    font-family: "Pretendard-Bold";
`;

export const MentorAnswerTime = styled.div`
    font-size: 12px;
    color: #888;
    font-family: "Pretendard-Regular";
`;

export const MoreButton = styled.button`
    background: none;
    border: none;
    padding: 8px;
    cursor: pointer;
    color: #666;
    font-size: 24px;
`;

export const FloatingButton = styled.button`
    position: fixed;
    bottom: ${({ visible }) => (visible ? "200px" : "-100px")};
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 40px);
    max-width: 380px;
    height: 50px;
    background-color: #ffbc00;
    color: white;
    border: none;
    border-radius: 20px;
    font-size: 20px;
    font-weight: bold;
    font-family: "Pretendard-Bold";
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: bottom 0.3s ease-in-out;

    &:hover {
        background-color: #e6a800;
    }

    &:active {
        transform: translateX(-50%) translateY(2px);
    }
`;
