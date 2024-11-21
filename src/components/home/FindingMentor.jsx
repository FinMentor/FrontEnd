import { MentorContainer, MentorCard, ProfileImage, MentorInfo, MentorCategory, MentorName, MentorReturn } from "./FindingMentor.styles";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// 임의의 데이터 예시
const mentors = [
    {
        id: 1,
        profileImage: "https://i.pinimg.com/736x/31/30/71/313071463c26e9f90287437da0fe590d.jpg",
        category: "예금/적금",
        name: "빽이",
        followers: "2,024명",
    },
    {
        id: 2,
        profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4uuDSyU8ztTwQsCvz1d1Z9EtQ7ZFG0FM7-g&s",
        category: "주식",
        name: "태양물고기",
        followers: "1,122명",
    },
    {
        id: 3,
        profileImage: "https://img1.kbcard.com/home_re/mo/img/common/img-char-check-system.png",
        category: "대출",
        name: "스타뱅킹",
        followers: "974명",
    },
];

function FindingMentor() {
    return (
        <MentorContainer>
            <h2>지금, 내가 찾고 있는 고수들</h2>
            <Swiper spaceBetween={45} slidesPerView="auto" freeMode={true} style={{ paddingRight: "30px" }}>
                {mentors.map(mentor => (
                    <SwiperSlide key={mentor.id} style={{ width: "220px" }}>
                        <MentorCard>
                            <ProfileImage src={mentor.profileImage} alt={`${mentor.name} 프로필`} />
                            <MentorInfo>
                                <MentorCategory>{mentor.category}</MentorCategory>
                                <MentorName>{mentor.name}</MentorName>
                                <MentorReturn>
                                    <span style={{ color: "#000000" }}>팔로워 수</span> {mentor.followers}
                                </MentorReturn>
                            </MentorInfo>
                        </MentorCard>
                    </SwiperSlide>
                ))}
            </Swiper>
        </MentorContainer>
    );
}

export default FindingMentor;
