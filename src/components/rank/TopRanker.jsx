import { Root, HintBox, FirstPlace, SecondPlace, ThirdPlace } from "./TopRanker.styles";
import alertInfo from "@/assets/icons/alert-info.svg";
function TopRanker() {
    return (
        <Root>
            <HintBox>
                <img src={alertInfo} alt="alert-info" />
                랭킹은 어떻게 결정되나요?
            </HintBox>
            <FirstPlace>1등</FirstPlace>
            <SecondPlace>2등</SecondPlace>
            <ThirdPlace>3등</ThirdPlace>
        </Root>
    );
}

export default TopRanker;
