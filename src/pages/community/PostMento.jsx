import { useParams } from "react-router-dom";
import { useState } from "react"; // react에서 useState 가져오기
import img1 from "@/assets/CM_img/img1.jpg";

import {
    PostContainer,
    PostImageWrapper,
    PostImage,
    PostTitle,
    AuthorInfo,
    ProfileImage,
    Content,
    Divider,
    ActionButtons,
    BottomAuthorInfo,
    ChatButton,
} from "./PostMento.styles";

import profileIcon from "@/assets/icons/profile-icon.svg";
import likeIcon from "@/assets/icons/like-icon.svg";
import likeInvertIcon from "@/assets/icons/like-invert-icon.svg"; // invert-icon

function PostMento() {
    const { postId } = useParams();
    const [liked, setLiked] = useState(false); // 좋아요 상태 관리
    const [postLikes, setPostLikes] = useState(12); // 초기 좋아요 수

    const post = {
        id: postId,
        title: "초보 투자자를 위한 주식 입문 가이드",
        author: "ansgPwjd13",
        authorProfile: "",
        createdAt: "36분 전",
        views: 120,

        image: img1, // 게시글 이미지
        content:
            "주식 투자가 처음이신 분들을 위해 기본적인 내용을 정리해보았습니다. 주식 시장의 구조, 기초 용어, 매매 방법, 리스크 관리 등을 안내드립니다. 이 글은 초보 투자자분들이 스스로 투자 결정을 내릴 때 더 많은 자신감을 가지도록 돕기 위한 목적입니다. 주식 시장은 복잡해 보이지만, 이해하기 시작하면 점점 더 흥미로워질 것입니다. 초보자에게 적합한 투자 전략과, 각 산업군에 대한 기본 지식도 포함되어 있으니 끝까지 읽어보시길 바랍니다.",
        introduce: "재테크에 대한 문의가 있으신 분들, 특히 주식 대출에 관심이 있으신 분들은 채팅 주세요", // 소개 추가
    };

    return (
        <PostContainer>
            <PostImageWrapper>
                <PostImage src={post.image} alt={post.title} />
            </PostImageWrapper>
            <Content>
                <PostTitle>{post.title}</PostTitle>
                <AuthorInfo>
                    <ProfileImage src={post.authorProfile || profileIcon} alt={post.author} />
                    <div>
                        <p>{post.author}</p>
                        <p>
                            {post.createdAt} · 조회 {post.views}
                        </p>
                    </div>
                </AuthorInfo>
                <Divider />
                <p>{post.content}</p>
            </Content>

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
            </ActionButtons>
            <BottomAuthorInfo>
                <ProfileImage src={post.authorProfile || profileIcon} alt="Author" />
                <div className="profile-wrapper">
                    <p>{post.author}</p>
                    <p className="introduce">{post.introduce}</p>
                </div>
                <div className="chat-button-wrapper">
                    <ChatButton>채팅 시작</ChatButton>
                </div>
            </BottomAuthorInfo>
        </PostContainer>
    );
}

export default PostMento;
