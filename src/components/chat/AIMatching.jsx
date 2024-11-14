import { Root, Title, ArrowIconContainer } from "./AIMatching.styles";
import aiMatchingIcon from "@/assets/icons/ai-matching.svg";
import leftArrow from "@/assets/icons/left-arrow.svg";
import { enterMatching } from "@/states/matchingSlice";
import { useDispatch } from "react-redux";

function AIMatching() {
    const dispatch = useDispatch();

    return (
        <Root onClick={() => dispatch(enterMatching())}>
            <img src={aiMatchingIcon} alt="ai-matching" />
            <Title>AI로 고수 매칭 시작하기</Title>
            <ArrowIconContainer>
                <img src={leftArrow} alt="left-arrow" />
            </ArrowIconContainer>
        </Root>
    );
}

export default AIMatching;
