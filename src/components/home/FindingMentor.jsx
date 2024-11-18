// eslint-disable-next-line prettier/prettier
import { MentorContainer, MentorCard, ProfileImage, MentorInfo, MentorCategory, MentorName, MentorReturn } from "./FindingMentor.styles";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// 임의의 데이터 예시
const mentors = [
    {
        id: 1,
        profileImage: "https://image.newsis.com/2024/11/06/NISI20241106_0001696513_web.jpg?rnd=20241106171229",
        category: "예금/적금",
        name: "빽이",
        monthlyReturn: "+7.5%",
    },
    {
        id: 2,
        profileImage: "https://image.newsis.com/2024/11/06/NISI20241106_0001696513_web.jpg?rnd=20241106171229",
        category: "주식",
        name: "태양물고기",
        monthlyReturn: "+5.2%",
    },
    {
        id: 3,
        profileImage: "https://example.com/profile3.jpg",
        category: "부동산",
        name: "부동산 전문가",
        monthlyReturn: "+3.8%",
    },
    {
        id: 4,
        profileImage: "https://example.com/profile4.jpg",
        category: "채권",
        name: "채권 분석가",
        monthlyReturn: "+4.6%",
    },
    {
        id: 5,
        profileImage: "https://example.com/profile5.jpg",
        category: "펀드",
        name: "펀드 매니저",
        monthlyReturn: "+6.1%",
    },
];

function FindingMentor() {
    return (
        <MentorContainer>
            <h2>지금, 내가 찾고 있는 고수들</h2>
            <Swiper spaceBetween={16} slidesPerView="auto" freeMode={true}>
                {mentors.map(mentor => (
                    <SwiperSlide key={mentor.id} style={{ width: "250px" }}>
                        <MentorCard>
                            <ProfileImage src={mentor.profileImage} alt={`${mentor.name} 프로필`} />
                            <MentorInfo>
                                <MentorCategory>{mentor.category}</MentorCategory>
                                <MentorName>{mentor.name}</MentorName>
                                <MentorReturn>{mentor.monthlyReturn}</MentorReturn>
                            </MentorInfo>
                        </MentorCard>
                    </SwiperSlide>
                ))}
            </Swiper>
        </MentorContainer>
    );
}

export default FindingMentor;
