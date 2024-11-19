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
import CommunityMento from "./CommunityMento"; // 고수노하우 컴포넌트 불러오기
import { useState } from "react";

function Community() {
    const posts = [
        { id: 1, title: "바이오 주식 문의", time: "41분 전", likes: 7, comments: 8 },
        { id: 2, title: "바이오 주식 관련 문의드립니다~~", time: "42분 전", likes: 5, comments: 3 },
    ];

    const [activeTab, setActiveTab] = useState("전체");
    const [selectedCategory, setSelectedCategory] = useState("전체");

    return (
        <Root>
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
                        <img src={bearIcon} alt="bear" style={{ width: "40px", height: "40px", marginLeft: "8px" }} />
                    </NotificationBanner>

                    <FilterContainer>
                        <StyledSelect value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                            <option value="전체">전체</option>
                            <option value="예적금">예적금</option>
                            <option value="대출">대출</option>
                            <option value="외환">외환</option>
                            <option value="주식">주식</option>
                        </StyledSelect>
                    </FilterContainer>

                    <PostListContainer>
                        {posts.map(post => (
                            <PostItem key={post.id}>
                                <PostTitle>{post.title}</PostTitle>
                                <PostInfo>
                                    {post.time} · 좋아요 {post.likes} · 댓글 {post.comments}
                                </PostInfo>
                            </PostItem>
                        ))}
                    </PostListContainer>

                    <FloatingActionButton>
                        {" "}
                        <img src={pencilIcon} alt="pencil" style={{ width: "32px", height: "32px" }} />
                    </FloatingActionButton>
                </>
            ) : (
                <CommunityMento />
            )}
        </Root>
    );
}

export default Community;
