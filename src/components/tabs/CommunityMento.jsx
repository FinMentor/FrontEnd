import {
    Root,
    FilterContainer,
    FloatingActionButton,
    StyledSelect,
    PostItem,
    PostTitle,
    PostInfo,
    PostImage,
    PostListContainer,
    NotificationBanner,
    ToggleSwitchContainer,
    ToggleSwitch,
    ToggleLabel,
} from "./CommunityMento.styles";

import llamaIcon from "@/assets/icons/llama.svg";
import pencilIcon from "@/assets/icons/pencil.svg";
import { useState } from "react";

function CommunityMento() {
    // 게시글 데이터
    const posts = [
        {
            id: 1,
            title: "초보 투자자를 위한 주식 입문 가이드",
            author: "글쓴이 누굴까",
            image: "https://via.placeholder.com/150", // 이미지
            isFollower: true, // 팔로워 게시글 여부
        },
        {
            id: 2,
            title: "재테크 고수님이 알려주는 꿀팁",
            author: "고수 고고",
            image: "https://via.placeholder.com/150", // 이미지
            isFollower: false, // 팔로워가 아님
        },
    ];

    // 카테고리 및 스위치 상태 관리
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const [showOnlyFollowers, setShowOnlyFollowers] = useState(false);

    // 필터링된 게시글 리스트
    const filteredPosts = showOnlyFollowers
        ? posts.filter(post => post.isFollower) // 팔로워 게시글만 표시
        : posts; // 모든 게시글 표시

    return (
        <Root>
            {/* 알림 배너 */}
            <NotificationBanner>
                고수님이 알려주는 유용한 재테크 지식을 만나보세요
                <img src={llamaIcon} alt="llama" style={{ width: "40px", height: "40px", marginLeft: "8px" }} />
            </NotificationBanner>

            {/* 필터 및 스위치 */}
            <FilterContainer>
                <StyledSelect value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                    <option value="전체">전체</option>
                    <option value="예적금">예적금</option>
                    <option value="대출">대출</option>
                    <option value="외환">외환</option>
                    <option value="주식">주식</option>
                </StyledSelect>
                {/* 팔로워 게시글만 보기 토글 */}
                <ToggleSwitchContainer>
                    <ToggleLabel>팔로워 게시글만 보기</ToggleLabel>
                    <ToggleSwitch isOn={showOnlyFollowers} onClick={() => setShowOnlyFollowers(!showOnlyFollowers)}>
                        <div className="toggle-knob" />
                    </ToggleSwitch>
                </ToggleSwitchContainer>
            </FilterContainer>

            {/* 게시글 리스트 */}
            <PostListContainer>
                {filteredPosts.map(post => (
                    <PostItem key={post.id}>
                        <PostImage src={post.image} alt={post.title} />
                        <PostTitle>{post.title}</PostTitle>
                        <PostInfo>글쓴이 {post.author}</PostInfo>
                    </PostItem>
                ))}
            </PostListContainer>

            {/* 글쓰기 버튼 */}
            <FloatingActionButton>
                <img src={pencilIcon} alt="pencil" style={{ width: "32px", height: "32px" }} />
            </FloatingActionButton>
        </Root>
    );
}

export default CommunityMento;
