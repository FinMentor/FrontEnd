import { useState } from "react";
import {
    ModalOverlay,
    ModalContent,
    ExitButton,
    RatingModal,
    StarContainer,
    Star,
    FeedbackOptions,
    FeedbackOption,
    FollowSection,
    FollowButton,
    CompleteButton,
    StarFill,
} from "./ChatBottomModal.styles";
import ChatModalExitIcon from "@/assets/icons/chat-modal-exit.svg?react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { exitChatRoom } from "@/states/chatSlice";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function ChatBottomModal({ isOpen, onClose }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentRoomId } = useSelector(state => state.chat);
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [selectedFeedback, setSelectedFeedback] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);

    const feedbackOptions = ["유익한 정보였어요", "친절하게 알려주셨어요", "답변이 빨랐어요"];

    const handleExitClick = () => {
        setShowRatingModal(true);
    };

    const handleFeedbackClick = option => {
        if (selectedFeedback.includes(option)) {
            setSelectedFeedback(selectedFeedback.filter(item => item !== option));
        } else {
            setSelectedFeedback([...selectedFeedback, option]);
        }
    };

    const handleComplete = async () => {
        console.log(currentRoomId);
        try {
            await axios.delete(`http://localhost:8080/api/v1/chatroom/exit`, {
                params: { chatroomId: currentRoomId },
                withCredentials: true,
            });

            dispatch(exitChatRoom());
            setShowRatingModal(false);
        } catch (error) {
            console.error("채팅방 나가기 실패:", error);
            alert("채팅방 나가기에 실패했습니다. 다시 시도해주세요.");
        }
        onClose();
        navigate("/chat");
    };

    if (!isOpen) return null;

    return (
        <ModalOverlay
            onClick={() => {
                setShowRatingModal(false);
                onClose();
            }}
        >
            {!showRatingModal ? (
                <ModalContent onClick={e => e.stopPropagation()}>
                    <ExitButton onClick={handleExitClick}>채팅방 나가기</ExitButton>
                </ModalContent>
            ) : (
                <RatingModal onClick={e => e.stopPropagation()}>
                    <ChatModalExitIcon
                        onClick={() => {
                            setShowRatingModal(false);
                            onClose();
                        }}
                        style={{ alignSelf: "flex-start", cursor: "pointer" }}
                    />
                    <h2>고수님과의 채팅은 어땠나요?</h2>
                    <StarContainer>
                        {[...Array(5)].map((_, index) => {
                            const ratingValue = index + 1;
                            return ratingValue <= (hover || rating) ? (
                                <StarFill
                                    key={index}
                                    onClick={() => setRating(ratingValue)}
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(rating)}
                                />
                            ) : (
                                <Star
                                    key={index}
                                    onClick={() => setRating(ratingValue)}
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(rating)}
                                />
                            );
                        })}
                    </StarContainer>
                    <FeedbackOptions>
                        {feedbackOptions.map((option, index) => (
                            <FeedbackOption
                                key={index}
                                selected={selectedFeedback.includes(option)}
                                onClick={() => handleFeedbackClick(option)}
                            >
                                {option}
                            </FeedbackOption>
                        ))}
                    </FeedbackOptions>
                    <FollowSection>
                        <FollowButton onClick={() => setIsFollowing(!isFollowing)}>
                            {isFollowing ? "팔로잉" : "팔로우 하기"}
                        </FollowButton>
                    </FollowSection>
                    <p style={{ fontSize: "14px", color: "#888888" }}>평가 후 채팅방은 자동 삭제됩니다.</p>
                    <CompleteButton onClick={handleComplete}>평가 작성 완료</CompleteButton>
                </RatingModal>
            )}
        </ModalOverlay>
    );
}

export default ChatBottomModal;
