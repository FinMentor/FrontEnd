import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setShowNavigator } from "@/states/navigatorSlice";
import profileIcon from "@/assets/icons/profile-icon.svg";
import commentIcon from "@/assets/icons/comment-icon.svg";
import likeIcon from "@/assets/icons/like-icon.svg";
import {
    ReplyContainer,
    ReplyHeaderBar,
    ReplyHeader,
    ReplyContent,
    Divider,
    FixedInputContainer,
    CommentInput,
    SendButton,
    CommentActions,
    ProfileImage,
    ChatButton,
    CloseButton,
} from "./Reply.styles";

function Reply() {
    const { id } = useParams();
    const dispatch = useDispatch();

    // Reply 페이지에서는 Navigator 숨기기
    useEffect(() => {
        dispatch(setShowNavigator(false)); // Navigator 숨김
        window.scrollTo(0, 0);
        return () => {
            dispatch(setShowNavigator(true)); // 컴포넌트 언마운트 시 복구
        };
    }, [dispatch]);

    const comment = {
        id: id,
        author: "snrn",
        authorProfile: "",
        role: "expert",
        content: "안녕하세요! 바이오 주식은 변동성이 크기 때문에 장기 투자를 권장합니다.",
        createdAt: "32분 전",
    };

    const handleReplySubmit = () => {
        console.log("답댓글 제출 완료");
    };

    const handleClose = () => {
        window.history.back(); // 뒤로 가기
    };

    return (
        <ReplyContainer>
            {/* 상단바 */}
            <ReplyHeaderBar>
                <CloseButton onClick={handleClose}>✕</CloseButton>
                <h1>답댓글 쓰기</h1>
            </ReplyHeaderBar>

            {/* 댓글 내용 */}
            <ReplyHeader>
                <ProfileImage src={comment.authorProfile || profileIcon} alt="Commenter" />
                <div>
                    <p>{comment.author}</p>
                    {comment.role === "expert" && <ChatButton>채팅 시작</ChatButton>}
                </div>
            </ReplyHeader>
            <ReplyContent>
                <p>{comment.content}</p>
                <p style={{ color: "#757575", fontSize: "12px" }}>{comment.createdAt}</p>
            </ReplyContent>
            <Divider />
            <CommentActions>
                <button>
                    <img src={commentIcon} alt="댓글 달기" />
                    댓글 달기
                </button>
                <button>
                    <img src={likeIcon} alt="도움이 돼요" />
                    도움이 돼요
                </button>
            </CommentActions>

            {/* 답글 입력 */}
            <FixedInputContainer>
                <CommentInput placeholder={`${comment.author}에게 답글을 남겨보세요.`} />
                <SendButton onClick={handleReplySubmit}>등록</SendButton>
            </FixedInputContainer>
        </ReplyContainer>
    );
}

export default Reply;
