import { useState, Suspense } from "react";
import {
    Root,
    Title,
    CategoryContainer,
    Category,
    MentorCard,
    ProfileSection,
    InfoSection,
    ActionSection,
    MentorProfileImage,
    MentorCategory,
    MentorName,
    MentorAnswerTime,
    FloatingButton,
} from "./FindMentor.styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import chatStartIcon from "../../assets/icons/chat-start.svg";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import answerTime from "@/utils/answerTime";

MentorList.propTypes = {
    selectedCategory: PropTypes.number.isRequired,
    onMentorSelect: PropTypes.func.isRequired,
    selectedMentorId: PropTypes.number,
};

const fetchMentor = async category => {
    const response = await axios.get(`http://localhost:8080/api/v1/mentor/recommend?mainCategoryId=${category}`, {
        withCredentials: true,
    });
    return response.data.responseEntity.body.mentorDTOList;
};

function MentorList({ selectedCategory, onMentorSelect, selectedMentorId }) {
    const { data: topMentor } = useQuery({
        queryKey: ["mentors", selectedCategory],
        queryFn: () => fetchMentor(selectedCategory),
        select: data => data.slice(0, 3),
        suspense: true,
        retry: false,
    });

    const navigate = useNavigate();

    const handleStartChat = async () => {
        if (selectedMentorId !== null) {
            try {
                const selectedMentor = topMentor[selectedMentorId];
                const chatRoomData = {
                    subject: `${selectedMentor.mainCategoryName} 상담`,
                    memberId: selectedMentor.memberId,
                };

                const response = await axios.post("http://localhost:8080/api/v1/chatroom/create", chatRoomData, {
                    withCredentials: true,
                });

                // 채팅방 생성 성공 시 해당 채팅방으로 이동
                if (response.data.responseEntity.body) {
                    const chatroomId = response.data.responseEntity.body.chatroomId;
                    navigate("/chat/room", {
                        state: { chatroomId },
                    });
                }
            } catch (error) {
                console.error("채팅방 생성 실패:", error);
                alert("채팅방 생성에 실패했습니다. 다시 시도해주세요.");
            }
        }
    };
    const defaultProfileImage = "/images/default-profile.png";
    return (
        <>
            <Title>
                현재 대화 가능한
                <br /> 고수님을 찾았습니다.
            </Title>
            {topMentor?.map((item, index) => (
                <MentorCard
                    key={index}
                    selected={selectedMentorId === index}
                    onClick={e => {
                        e.stopPropagation(); // 이벤트 버블링 방지
                        onMentorSelect(index);
                    }}
                >
                    <ProfileSection>
                        <MentorProfileImage
                            src={
                                item.receiverProfileUrl
                                    ? `http://localhost:8080${item.receiverProfileUrl}`
                                    : `http://localhost:8080${defaultProfileImage}`
                            }
                            onError={e => {
                                e.target.onerror = null; // 무한 루프 방지
                                e.target.src = defaultProfileImage;
                            }}
                        />
                    </ProfileSection>
                    <InfoSection>
                        <MentorCategory>{item.mainCategoryName}</MentorCategory>
                        <MentorName>{item.nickname}</MentorName>
                        <MentorAnswerTime>상담 가능 시간 {answerTime(item.answerTime)}</MentorAnswerTime>
                    </InfoSection>
                    <ActionSection>더보기 {">"} </ActionSection>
                </MentorCard>
            ))}
            {selectedMentorId != undefined && (
                <FloatingButton onClick={handleStartChat} visible={selectedMentorId != undefined}>
                    <img src={chatStartIcon} alt="chat start" />
                    시작하기
                </FloatingButton>
            )}
        </>
    );
}

function FindMentor() {
    const category = [
        {
            name: "예금/적금",
            id: 1,
        },
        {
            name: "대출",
            id: 2,
        },
        {
            name: "외화",
            id: 3,
        },
        {
            name: "주식",
            id: 4,
        },
    ];
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedMentorId, setSelectedMentorId] = useState(null);

    const handleMentorSelect = mentorId => {
        setSelectedMentorId(mentorId);
    };

    const handleCategoryClick = itemId => {
        setSelectedCategory(itemId);
    };

    const handleRootClick = () => {
        setSelectedMentorId(null);
    };
    return (
        <Root onClick={handleRootClick}>
            {!selectedCategory ? (
                <>
                    <Title>
                        어떤 분야의
                        <br /> 고수를 찾으시나요?
                    </Title>
                    <CategoryContainer>
                        {category.map((item, index) => (
                            <Category key={index} onClick={() => handleCategoryClick(item.id)}>
                                {item.name}
                            </Category>
                        ))}
                    </CategoryContainer>
                </>
            ) : (
                <Suspense
                    fallback={
                        <Title>
                            선택하신 분야의
                            <br /> 고수를 찾고 있습니다...
                        </Title>
                    }
                >
                    <MentorList
                        selectedCategory={selectedCategory}
                        onMentorSelect={handleMentorSelect}
                        selectedMentorId={selectedMentorId}
                    />
                </Suspense>
            )}
        </Root>
    );
}

export default FindMentor;
