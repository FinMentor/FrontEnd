import {
    Root,
    MonthlyProfitContainer,
    MonthlyProfitTitle,
    WeeklyProfitContainer,
    WeeklyProfitTitle,
    ProfitRankerCard,
    ProfitRankerCardProfileImage,
    ProfitRankerCardName,
    ProfitRankerCardCategory,
    ProfitRankerList,
    Tab,
} from "./ProfitRank.styles";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import mainCategory from "@/utils/mainCategory";
ProfitRanker.propTypes = {
    category: PropTypes.array,
    monthlyRankers: PropTypes.array,
    weeklyRankers: PropTypes.array,
    setActiveTab: PropTypes.func,
    activeTab: PropTypes.string,
};

function ProfitRanker({ category, weeklyRankers, monthlyRankers, setActiveTab, activeTab }) {
    const monthlyProfitRankers = monthlyRankers ? monthlyRankers : [];
    const weeklyProfitRankers = weeklyRankers ? weeklyRankers : [];
    const swiperStyle = {
        margin: "-20px",
        width: "100%",
    };
    return (
        <Root>
            {category && (
                <Swiper
                    spaceBetween={3}
                    slidesPerView={4.5}
                    onSlideChange={swiper => setActiveTab(swiper.activeIndex)}
                    style={swiperStyle}
                >
                    {category.map((cat, index) => (
                        <SwiperSlide key={index}>
                            <Tab active={index === activeTab} onClick={() => setActiveTab(index)}>
                                {cat.mainCategoryName}
                            </Tab>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
            <MonthlyProfitContainer>
                <MonthlyProfitTitle>월간 랭킹</MonthlyProfitTitle>
                <ProfitRankerList>
                    <Swiper spaceBetween={3} slidesPerView={4.5} style={swiperStyle}>
                        {monthlyProfitRankers.map((ranker, index) => (
                            <SwiperSlide key={index}>
                                <ProfitRankerCard>
                                    <ProfitRankerCardProfileImage src={ranker.profileImageUrl} />
                                    <ProfitRankerCardName>{ranker.nickname}</ProfitRankerCardName>
                                    <ProfitRankerCardCategory>
                                        {mainCategory(ranker.mainCategoryId)}
                                    </ProfitRankerCardCategory>
                                </ProfitRankerCard>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </ProfitRankerList>
            </MonthlyProfitContainer>
            <WeeklyProfitContainer>
                <WeeklyProfitTitle>주간 랭킹</WeeklyProfitTitle>
                <ProfitRankerList>
                    <Swiper spaceBetween={3} slidesPerView={4.5} style={swiperStyle}>
                        {weeklyProfitRankers.map((ranker, index) => (
                            <SwiperSlide key={index}>
                                <ProfitRankerCard>
                                    <ProfitRankerCardProfileImage src={ranker.profileImageUrl} />
                                    <ProfitRankerCardName>{ranker.nickname}</ProfitRankerCardName>
                                    <ProfitRankerCardCategory>
                                        {mainCategory(ranker.mainCategoryId)}
                                    </ProfitRankerCardCategory>
                                </ProfitRankerCard>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </ProfitRankerList>
            </WeeklyProfitContainer>
        </Root>
    );
}

export default ProfitRanker;
