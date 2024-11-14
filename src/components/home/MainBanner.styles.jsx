import styled from "@emotion/styled";

export const BannerContainer = styled.div`
    position: relative;
    width: 100%;
    height: 400px;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const BannerContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #ffffff;
    text-align: center;
`;

export const BannerText = styled.div`
    h1 {
        font-family: "Pretendard ExtraBold";
        font-size: 34px;
        line-height: 44px;
        letter-spacing: 0.5px;
        margin: 0;
        text-align: center;

        span {
            display: block;
        }
    }

    p {
        font-family: "Pretendard Regular";
        font-size: 16px;
        line-height: 19px;
        margin: 20px 0 30px;
    }
`;

export const StartButton = styled.button`
    width: 200px;
    height: 40px;
    background-color: #ffbc00;
    color: #ffffff;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    margin-bottom: 40px;

    font-family: "Pretendard Medium";
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    img {
        width: 19px;
        height: 19px;
    }
`;

export const Logo = styled.img`
    position: absolute;
    bottom: 15px;
    width: 92.17px;
    height: 25px;
`;
