import { BannerContainer, BannerContent, BannerText, StartButton, Logo } from "./MainBanner.styles";
import BackgroundImage from "@/assets/imgs/home/main-banner.png";
import LogoImage from "@/assets/imgs/home/main-banner-logo.png";
import ChatIcon from "@/assets/icons/main-banner-chat-icon.svg";

function MainBanner() {
    return (
        <BannerContainer style={{ backgroundImage: `url(${BackgroundImage})` }}>
            <BannerContent>
                <BannerText>
                    <h1>
                        자산 관리 고수에게
                        <br />
                        <span>질문하세요</span>
                    </h1>
                    <p>AI를 통해 고수를 추천받을 수 있습니다.</p>
                </BannerText>
                <StartButton>
                    <img src={ChatIcon} alt="Chat Icon" />
                    시작하기
                </StartButton>
            </BannerContent>
            <Logo src={LogoImage} alt="KB 국민은행 로고" />
        </BannerContainer>
    );
}

export default MainBanner;
