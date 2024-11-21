import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setShowNavigator } from "@/states/navigatorSlice";
import profileIcon from "@/assets/icons/profile-icon.svg"; // 기본 프로필 아이콘
import likeIcon from "@/assets/icons/like-icon.svg"; // 좋아요 아이콘
import likeInvertIcon from "@/assets/icons/like-invert-icon.svg";
import commentIcon from "@/assets/icons/comment-icon.svg"; // 댓글 아이콘

import PropTypes from "prop-types"; // PropTypes import
import {
    PostContainer,
    PostTitle,
    AuthorInfo,
    ProfileImage,
    Content,
    Divider,
    ActionButtons,
    CommentSection,
    Comment,
    CommentHeader,
    CommentActions,
    CommentInput,
    SendButton,
    FixedCommentContainer,
    ChatButton,
} from "./Post.styles";

function Post({ showNavigator }) {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 좋아요 상태 및 개수
    const [liked, setLiked] = useState(false); // 좋아요 여부
    const [postLikes, setPostLikes] = useState(10); // 초기 좋아요 개수

    // 댓글 도움 상태
    const [helpfulComments, setHelpfulComments] = useState([]);

    // 댓글 목록 상태
    const [comments, setComments] = useState([
        {
            id: 1,
            author: "snrn",
            authorProfile: "", // 댓글 작성자 프로필 이미지
            role: "expert",
            content: "안녕하세요! 바이오 주식은 변동성이 크기 때문에 장기 투자를 권장합니다.",
            createdAt: "32분 전",
        },
        {
            id: 2,
            author: "normalUser",
            authorProfile: "", // 프로필 이미지 없음
            role: "normal",
            content: "저도 궁금합니다!",
            createdAt: "30분 전",
        },
    ]);

    // 댓글 입력 상태
    const [newCommentContent, setNewCommentContent] = useState("");

    // 댓글 섹션의 마지막 댓글을 참조
    const lastCommentRef = useRef(null);

    // 댓글 도움 상태 토글
    const toggleHelp = commentId => {
        setHelpfulComments(
            prev =>
                prev.includes(commentId)
                    ? prev.filter(id => id !== commentId) // ID 제거
                    : [...prev, commentId], // ID 추가
        );
    };

    // 댓글 등록 핸들러
    const handleSendComment = () => {
        if (!newCommentContent.trim()) return; // 빈 입력 필드 처리

        const newComment = {
            id: comments.length + 1,
            author: "currentUser",
            authorProfile: "", // 현재 사용자 프로필 이미지
            role: "normal",
            content: newCommentContent, // 입력한 댓글 내용
            createdAt: "방금 전",
        };

        setComments(prev => [...prev, newComment]); // 기존 댓글에 추가
        setNewCommentContent(""); // 입력 필드 초기화

        // 댓글 추가 후 스크롤 이동
        setTimeout(() => {
            lastCommentRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100); // 약간의 딜레이로 부드러운 스크롤 처리
    };

    useEffect(() => {
        if (!showNavigator) {
            dispatch(setShowNavigator(false));
        }
        return () => {
            dispatch(setShowNavigator(true));
        };
    }, [dispatch, showNavigator]);

    const post = {
        id: postId,
        title: "바이오 주식 문의",
        author: "ansgPwjd13",
        authorProfile: "", // 프로필 이미지 없음
        createdAt: "36분 전",
        views: 20,
        content:
            "안녕하세요! 최근 바이오 관련 주식에 관심이 생겼는데, 초보자 입장에서 어떤 종목을 어떻게 접근해야 할지 조언 부탁드립니다.\n\n바이오 주식의 전망이나 추천할 만한 종목이 있으면 알려주세요!",
    };

    return (
        <PostContainer>
            {/* 본문 글쓴이 정보 */}
            <PostTitle>{post.title}</PostTitle>
            <AuthorInfo>
                <ProfileImage src={post.authorProfile || profileIcon} alt="Author" />
                <div>
                    <p>{post.author}</p>
                    <p>
                        {post.createdAt} · 조회 {post.views}
                    </p>
                </div>
            </AuthorInfo>
            <Divider />
            <Content>{post.content}</Content>

            {/* 좋아요 및 댓글 수 */}
            <ActionButtons>
                <button
                    onClick={() => {
                        setPostLikes(prev => (liked ? prev - 1 : prev + 1)); // 좋아요 개수 증가/감소
                        setLiked(!liked); // 좋아요 상태 토글
                    }}
                    style={{
                        color: liked ? "#fbc02d" : "#757575", // 좋아요 상태에 따른 글자 색상
                    }}
                >
                    <img src={liked ? likeInvertIcon : likeIcon} alt="좋아요" />
                    좋아요 {postLikes}
                </button>
                <button>
                    <img src={commentIcon} alt="댓글" />
                    댓글 {comments.length}
                </button>
            </ActionButtons>

            {/* 댓글 섹션 */}
            <CommentSection>
                {comments.map((comment, index) => (
                    <Comment
                        key={comment.id}
                        ref={index === comments.length - 1 ? lastCommentRef : null} // 마지막 댓글에만 참조 추가
                    >
                        <CommentHeader>
                            <ProfileImage src={comment.authorProfile || profileIcon} alt="Commenter" />
                            <div>
                                <p>{comment.author}</p>
                                {comment.role === "expert" && <ChatButton>채팅하기</ChatButton>}
                            </div>
                        </CommentHeader>
                        <p>{comment.content}</p>
                        <p style={{ color: "#757575", fontSize: "12px" }}>{comment.createdAt}</p>
                        <CommentActions>
                            <button onClick={() => navigate(`/community/reply/${comment.id}`)}>
                                <img src={commentIcon} alt="댓글 달기" />
                                댓글 달기
                            </button>
                            <button
                                onClick={() => toggleHelp(comment.id)} // 댓글별 도움 상태를 변경
                                style={{
                                    border: helpfulComments.includes(comment.id)
                                        ? "1px solid #fbc02d"
                                        : "1px solid #ddd", // 테두리 색상 변경
                                    color: helpfulComments.includes(comment.id) ? "#fbc02d" : "#757575", // 글자 색상 변경
                                }}
                            >
                                <img
                                    src={helpfulComments.includes(comment.id) ? likeInvertIcon : likeIcon} // 아이콘 변경
                                    alt="도움이 돼요"
                                />
                                도움이 돼요
                            </button>
                        </CommentActions>
                    </Comment>
                ))}
            </CommentSection>

            {/* 화면 하단 고정 댓글 입력창 */}
            <FixedCommentContainer>
                <CommentInput
                    placeholder="댓글을 남겨보세요."
                    value={newCommentContent}
                    onChange={e => setNewCommentContent(e.target.value)}
                />
                <SendButton onClick={handleSendComment}>등록</SendButton>
            </FixedCommentContainer>
        </PostContainer>
    );
}

// PropTypes 정의
Post.propTypes = {
    showNavigator: PropTypes.bool.isRequired,
};

export default Post;
