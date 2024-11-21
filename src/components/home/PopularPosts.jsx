import { useState, useEffect } from "react";
import { PostContainer, ViewAllButton, PostContent } from "./PopularPosts.styles";
import { useNavigate } from "react-router-dom";
import LikeIcon from "@/assets/imgs/home/like-invert-icon.svg";
import ArrowIcon from "@/assets/imgs/home/arrow-right.svg";

function PopularPosts() {
    // Mock 데이터를 상태로 관리
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const mockPosts = [
            {
                id: 1,
                category: "예금/적금",
                title: "나에게 맞는 적금 상품 찾는 방법",
                content: "안녕하세요. 오늘은 적금 상품을 선택하는 방법에 대해 알아...",
                likes: 13,
            },
            {
                id: 2,
                category: "대출",
                title: "대출 옵션 이해하기",
                content: "대출은 어렵게 느껴질 수 있지만, 오늘 함께 알아보도록 하겠습니다.",
                likes: 10,
            },
            {
                id: 3,
                category: "외화",
                title: "외화 거래를 위한 팁",
                content: "외화 거래 시 고려해야 할 중요한 점들을 알아봅니다...",
                likes: 8,
            },
        ];
        setPosts(mockPosts);
    }, []);

    return (
        <PostContainer>
            <header>
                <h2>인기 게시글</h2>
                <ViewAllButton onClick={() => navigate("/community")}>
                    전체보기
                    <img src={ArrowIcon} alt="Arrow Icon" />
                </ViewAllButton>
            </header>
            <div className="posts">
                {posts.map(post => (
                    <PostContent key={post.id}>
                        <div className="category">{post.category}</div>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <div className="likes">
                            <img src={LikeIcon} alt="Like Icon" />
                            <span>{post.likes}</span>
                        </div>
                    </PostContent>
                ))}
            </div>
        </PostContainer>
    );
}

export default PopularPosts;
