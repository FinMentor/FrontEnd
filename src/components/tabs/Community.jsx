import {
    Root,
    NotificationBanner,
    TabContainer,
    Tab,
    FilterContainer,
    PostListContainer,
    PostItem,
    PostTitle,
    PostInfo,
    FloatingActionButton,
    StyledSelect,
} from "./Community.styles";

import bearIcon from "@/assets/icons/bear.svg";
import pencilIcon from "@/assets/icons/pencil.svg";
import CommunityMento from "./CommunityMento";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom"; // Outlet 유지

function Community() {
    const navigate = useNavigate();
    const location = useLocation();
    const posts = [
        { id: 1, title: "바이오 주식 문의", time: "41분 전", likes: 7, comments: 8 },
        { id: 2, title: "바이오 주식 관련 문의드립니다~~", time: "42분 전", likes: 5, comments: 3 },
    ];

    const [activeTab, setActiveTab] = useState("전체");
    const [selectedCategory, setSelectedCategory] = useState("전체");

    // 현재 경로가 상세 페이지(`/community/post/:postId`) 또는 답댓글 페이지(`/community/reply/:replyId`)라면 리스트 숨김
    const isDetailPage =
        location.pathname.includes("/community/post") || location.pathname.includes("/community/reply");

    return (
        <Root>
            {/* 상세 페이지가 아닌 경우에만 기본 탭과 리스트 렌더링 */}
            {!isDetailPage && (
                <>
                    <TabContainer>
                        <Tab active={activeTab === "전체"} onClick={() => setActiveTab("전체")}>
                            전체
                        </Tab>
                        <Tab active={activeTab === "고수노하우"} onClick={() => setActiveTab("고수노하우")}>
                            고수노하우
                        </Tab>
                    </TabContainer>

                    {activeTab === "전체" ? (
                        <>
                            <NotificationBanner>
                                재테크에 관한 궁금점을 물어보고 답해보세요
                                <img
                                    src={bearIcon}
                                    alt="bear"
                                    style={{ width: "40px", height: "40px", marginLeft: "8px" }}
                                />
                            </NotificationBanner>

                            <FilterContainer>
                                <StyledSelect
                                    value={selectedCategory}
                                    onChange={e => setSelectedCategory(e.target.value)}
                                >
                                    <option value="전체">전체</option>
                                    <option value="예적금">예적금</option>
                                    <option value="대출">대출</option>
                                    <option value="외환">외환</option>
                                    <option value="주식">주식</option>
                                </StyledSelect>
                            </FilterContainer>

                            <PostListContainer>
                                {posts.map(post => (
                                    <PostItem
                                        key={post.id}
                                        onClick={() => navigate(`/community/post/${post.id}`)} // 클릭 시 이동
                                        style={{ cursor: "pointer" }}
                                    >
                                        <PostTitle>{post.title}</PostTitle>
                                        <PostInfo>
                                            {post.time} · 좋아요 {post.likes} · 댓글 {post.comments}
                                        </PostInfo>
                                    </PostItem>
                                ))}
                            </PostListContainer>

                            <FloatingActionButton>
                                <img src={pencilIcon} alt="pencil" style={{ width: "32px", height: "32px" }} />
                            </FloatingActionButton>
                        </>
                    ) : (
                        <CommunityMento />
                    )}
                </>
            )}

            {/* Outlet: 상세 페이지나 답댓글 페이지가 렌더링되는 부분 */}
            <Outlet />
        </Root>
    );
}

export default Community;
