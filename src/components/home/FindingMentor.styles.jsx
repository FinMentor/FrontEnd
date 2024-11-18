import styled from "@emotion/styled";

export const MentorContainer = styled.div`
    padding: 24px;
    background-color: #ffffff;

    h2 {
        margin: 0 0 20px 0;
        font-family: "Pretendard Bold";
        font-size: 24px;
    }
`;

export const MentorCard = styled.div`
    background-color: #f7f8f8;
    border-radius: 15px;
    padding: 15px;
    display: flex;
    align-items: center;
    text-align: left;
    width: 100%;
`;

export const ProfileImage = styled.img`
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin-right: 15px;
`;

export const MentorInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
`;

export const MentorCategory = styled.div`
    font-size: 12px;
    color: #949ba0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

export const MentorName = styled.div`
    font-size: 14px;
    font-weight: bold;
    margin-top: 4px;
    display: flex;
    align-items: center;
`;

export const MentorReturn = styled.div`
    font-size: 12px;
    color: #fd3018;
    font-weight: bold;
    margin-top: 4px;
`;
