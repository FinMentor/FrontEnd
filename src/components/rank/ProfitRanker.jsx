import {
    Root,
    MonthlyProfitContainer,
    MonthlyProfitTitle,
    WeeklyProfitContainer,
    WeeklyProfitTitle,
    ProfitRankerCard,
    ProfitRankerCardProfileImage,
    ProfitRankerCardName,
    ProfitRankerList,
} from "./ProfitRank.styles";
import PropTypes from "prop-types";

ProfitRanker.propTypes = {
    category: PropTypes.array,
    monthlyRankers: PropTypes.array,
    weeklyRankers: PropTypes.array,
};

function ProfitRanker({ category, weeklyRankers, monthlyRankers }) {
    console.log(category);
    const monthlyProfitRankers = monthlyRankers ? monthlyRankers : [];
    const weeklyProfitRankers = weeklyRankers ? weeklyRankers : [];

    return (
        <Root>
            <MonthlyProfitContainer>
                <MonthlyProfitTitle>월간 랭킹</MonthlyProfitTitle>
                <ProfitRankerList>
                    {monthlyProfitRankers.map((ranker, index) => (
                        <ProfitRankerCard key={index}>
                            <ProfitRankerCardProfileImage />
                            <ProfitRankerCardName>{ranker.nickname}</ProfitRankerCardName>
                        </ProfitRankerCard>
                    ))}
                </ProfitRankerList>
            </MonthlyProfitContainer>
            <WeeklyProfitContainer>
                <WeeklyProfitTitle>주간 랭킹</WeeklyProfitTitle>
                <ProfitRankerList>
                    {weeklyProfitRankers.map((ranker, index) => (
                        <ProfitRankerCard key={index}>
                            <ProfitRankerCardProfileImage />
                            <ProfitRankerCardName>{ranker.nickname}</ProfitRankerCardName>
                        </ProfitRankerCard>
                    ))}
                </ProfitRankerList>
            </WeeklyProfitContainer>
        </Root>
    );
}

export default ProfitRanker;
