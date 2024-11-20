import { Root, HintBox, FirstPlace, SecondPlace, ThirdPlace } from "./TopRanker.styles";
import alertInfo from "@/assets/icons/alert-info.svg";
import PropTypes from "prop-types";

TopRanker.propTypes = {
    rankers: PropTypes.arrayOf(
        PropTypes.shape({
            nickname: PropTypes.string.isRequired,
        }),
    ),
};

function TopRanker({ rankers }) {
    return (
        <Root>
            <HintBox>
                <img src={alertInfo} alt="alert-info" />
                랭킹은 어떻게 결정되나요?
            </HintBox>
            <FirstPlace>{rankers?.[0]?.nickname}</FirstPlace>
            <SecondPlace>{rankers?.[1]?.nickname}</SecondPlace>
            <ThirdPlace>{rankers?.[2]?.nickname}</ThirdPlace>
        </Root>
    );
}

export default TopRanker;
