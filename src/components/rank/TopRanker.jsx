import {
    Root,
    HintBox,
    FirstPlace,
    SecondPlace,
    ThirdPlace,
    ProfileImage,
    Nickname,
    Category,
} from "./TopRanker.styles";
import alertInfo from "@/assets/icons/alert-info.svg";
import PropTypes from "prop-types";
import mainCategory from "@/utils/mainCategory";

TopRanker.propTypes = {
    rankers: PropTypes.arrayOf(
        PropTypes.shape({
            nickname: PropTypes.string.isRequired,
            profileImageUrl: PropTypes.string,
            mainCategoryId: PropTypes.number,
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
            <FirstPlace>
                <ProfileImage src={rankers?.[0]?.profileImageUrl} alt="profile" />
                <Nickname>{rankers?.[0]?.nickname}</Nickname>
                <Category>{mainCategory(rankers?.[0]?.mainCategoryId)}</Category>
            </FirstPlace>
            <SecondPlace>
                <ProfileImage src={rankers?.[1]?.profileImageUrl} alt="profile" />
                <Nickname>{rankers?.[1]?.nickname}</Nickname>
                <Category>{mainCategory(rankers?.[1]?.mainCategoryId)}</Category>
            </SecondPlace>
            <ThirdPlace>
                <ProfileImage src={rankers?.[2]?.profileImageUrl} alt="profile" />
                <Nickname>{rankers?.[2]?.nickname}</Nickname>
                <Category>{mainCategory(rankers?.[2]?.mainCategoryId)}</Category>
            </ThirdPlace>
        </Root>
    );
}

export default TopRanker;
