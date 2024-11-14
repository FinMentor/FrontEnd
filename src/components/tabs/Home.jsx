import MainBanner from "@/components/home/MainBanner";
import FindingMentor from "@/components/home/FindingMentor";
import { Root } from "./Home.styles";

function Home() {
    return (
        <Root>
            <MainBanner />
            <FindingMentor />
            <h2>홈 페이지</h2>
            <p>FinMentor에 오신 것을 환영합니다! 이곳은 금융 멘토링 플랫폼입니다.</p>
        </Root>
    );
}

export default Home;
