import styled from "@emotion/styled";

export const PostContainer = styled.section`
    padding: 10px 24px 88px 24px;

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        h2 {
            margin: 0;
            font-family: "Pretendard-Bold";
            font-size: 24px;
        }
    }

    .posts {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
`;

export const PostContent = styled.div`
    border-bottom: 0.5px solid rgba(148, 155, 160, 0.3);

    .category {
        font-family: "Pretendard Light";
        font-size: 14px;
        color: #949ba0;
        margin-bottom: 10px;
    }

    h3 {
        font-family: "Pretendard Light";
        font-size: 18px;
        margin: 0 0 10px;
    }

    p {
        font-family: "Pretendard Light";
        font-size: 16px;
        color: #000000;
        margin: 0 0 10px;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .likes {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-bottom: 16px;

        img {
            width: 14px;
            height: 14px;
        }
        span {
            font-size: 14px;
            color: #333;
            margin-bottom: 1px;
        }
    }
`;

export const ViewAllButton = styled.button`
    font-family: "Pretendard Light";
    font-size: 14px;
    color: #949ba0;
    background: none;
    border: none;
    display: flex;
    align-items: center;
    gap: 2px;
    cursor: pointer;

    img {
        width: 12px;
        height: 12px;
    }
`;
