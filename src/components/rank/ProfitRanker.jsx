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
                <MonthlyProfitTitle>월간 랭킹</MonthlyProfitTitle>
                <ProfitRankerList>
                    {monthlyProfitRankers.map((ranker, index) => (
                        <ProfitRankerCard key={index}>
                            <ProfitRankerCardProfileImage />
                            <ProfitRankerCardName>{ranker.name}</ProfitRankerCardName>
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
                            <ProfitRankerCardName>{ranker.name}</ProfitRankerCardName>
                        </ProfitRankerCard>
                    ))}
                </ProfitRankerList>
            </WeeklyProfitContainer>
        </Root>
    );
}

export default ProfitRanker;
