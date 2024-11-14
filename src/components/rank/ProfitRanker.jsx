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

function ProfitRanker() {
    const monthlyProfitRankers = [
        { name: "빽이", delta: 10, profileImage: "" },
        { name: "빽이", delta: 10, profileImage: "" },
        { name: "빽이", delta: 10, profileImage: "" },
    ];
    const weeklyProfitRankers = [
        { name: "빽이", delta: 10, profileImage: "" },
        { name: "빽이", delta: 10, profileImage: "" },
        { name: "빽이", delta: 10, profileImage: "" },
    ];

    return (
        <Root>
            <MonthlyProfitContainer>
                <MonthlyProfitTitle>월간 수익률이 높은 고수</MonthlyProfitTitle>
                <ProfitRankerList>
                    {monthlyProfitRankers.map(ranker => (
                        <ProfitRankerCard key={ranker.name}>
                            <ProfitRankerCardProfileImage />
                            <ProfitRankerCardName>{ranker.name}</ProfitRankerCardName>
                        </ProfitRankerCard>
                    ))}
                </ProfitRankerList>
            </MonthlyProfitContainer>
            <WeeklyProfitContainer>
                <WeeklyProfitTitle>주간 수익률이 높은 고수</WeeklyProfitTitle>
                <ProfitRankerList>
                    {weeklyProfitRankers.map(ranker => (
                        <ProfitRankerCard key={ranker.name}>
                            <ProfitRankerCardProfileImage />
                            <ProfitRankerCardName>{ranker.name}</ProfitRankerCardName>
                        </ProfitRankerCard>
                    ))}
                </ProfitRankerList>
            </WeeklyProfitContainer>
        </Root>
    );
}

export default ProfitRanker;
