import MainBanner from "@/components/home/MainBanner";
import FindingMentor from "@/components/home/FindingMentor";
import PopularPosts from "@/components/home/PopularPosts";
import { Root } from "./Home.styles";

function Home() {
    return (
        <Root>
            <MainBanner />
            <FindingMentor />
            <PopularPosts />
        </Root>
    );
}

export default Home;
