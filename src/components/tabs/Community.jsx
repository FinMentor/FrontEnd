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
    StyledSelect,
} from "./Community.styles";

import bearIcon from "@/assets/icons/bear.svg";
import pencilIcon from "@/assets/icons/pencil.svg";
import FloatingButton from "@/components/community/FloatingButton";
import CommunityMento from "./CommunityMento";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setShowNavigator } from "@/states/navigatorSlice";

function Community() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const posts = [
        { id: 1, title: "바이오 주식 문의", category: "주식", time: "36분 전", likes: 10, comments: 2 },
        { id: 2, title: "바이오 관련 초보자 질문입니다.", category: "주식", time: "42분 전", likes: 5, comments: 3 },
        {
            id: 3,
            title: "오늘 전기차 관련 실망스럽네요ㅠㅠ",
            category: "주식",
            time: "1시간 전",
            likes: 10,
            comments: 12,
        },
        {
            id: 4,
            title: "반도체 수혜사에 올바른 진짜 배팅 방법은?",
            category: "주식",
            time: "2시간 전",
            likes: 15,
            comments: 20,
        },
        { id: 5, title: "이번달 실적발표 기업 정리", category: "주식", time: "어제", likes: 8, comments: 5 },
        { id: 6, title: "금융과 정보 공유합니다", category: "예적금", time: "2024.11.20", likes: 4, comments: 2 },
        { id: 7, title: "이제는 바이오가 대세인가요?", category: "주식", time: "2024.11.19", likes: 12, comments: 6 },
        { id: 8, title: "미국 연준 금리 인상 소식", category: "외환", time: "2024.11.18", likes: 20, comments: 15 },
        { id: 9, title: "채권 투자, 지금이 적기일까요?", category: "대출", time: "2024.11.17", likes: 9, comments: 4 },
        {
            id: 10,
            title: "고수님들, 대출 관련 조언 부탁드립니다!",
            category: "대출",
            time: "2024.11.16",
            likes: 18,
            comments: 10,
        },
        {
            id: 11,
            title: "해외 주식 초보자 가이드 공유합니다",
            category: "주식",
            time: "2024.11.15",
            likes: 25,
            comments: 19,
        },
        { id: 12, title: "예적금 이율 비교 정리", category: "예적금", time: "2024.11.14", likes: 5, comments: 3 },
        {
            id: 13,
            title: "고정금리와 변동금리 중 무엇이 나을까요?",
            category: "대출",
            time: "3시간 전",
            likes: 7,
            comments: 4,
        },
        {
            id: 14,
            title: "최고 예적금 상품 추천 부탁드립니다",
            category: "예적금",
            time: "2시간 전",
            likes: 12,
            comments: 6,
        },
        { id: 15, title: "환율 상승이 투자에 미치는 영향", category: "외환", time: "4시간 전", likes: 9, comments: 3 },
        { id: 16, title: "외환 거래 초보자가 알아야 할 팁", category: "외환", time: "어제", likes: 14, comments: 5 },
        { id: 17, title: "대출 상환 전략 공유합니다", category: "대출", time: "2024.11.13", likes: 8, comments: 2 },
        { id: 18, title: "2024년 주목할 예적금 상품", category: "예적금", time: "2024.11.12", likes: 15, comments: 4 },
        { id: 19, title: "다음달 미국 연준 회의 전망", category: "외환", time: "2024.11.11", likes: 17, comments: 8 },
        {
            id: 20,
            title: "금융권 대출이 이렇게 힘들 줄은 몰랐습니다",
            category: "대출",
            time: "2024.11.10",
            likes: 13,
            comments: 9,
        },
        {
            id: 21,
            title: "소액으로 가능한 예적금 추천 부탁드려요",
            category: "예적금",
            time: "2024.11.09",
            likes: 4,
            comments: 1,
        },
        {
            id: 22,
            title: "환율 변동으로 인한 해외 투자 손실",
            category: "외환",
            time: "2024.11.08",
            likes: 10,
            comments: 7,
        },
        {
            id: 23,
            title: "대출 금리가 이렇게까지 오를 줄이야",
            category: "대출",
            time: "2024.11.07",
            likes: 6,
            comments: 2,
        },
        {
            id: 24,
            title: "예적금과 펀드, 무엇이 더 좋을까요?",
            category: "예적금",
            time: "2024.11.06",
            likes: 8,
            comments: 3,
        },
        { id: 25, title: "환율 하락 시점에서 주의할 점", category: "외환", time: "2024.11.05", likes: 11, comments: 4 },
        {
            id: 26,
            title: "대출 중도 상환 시 수수료 주의하세요",
            category: "대출",
            time: "2024.11.04",
            likes: 9,
            comments: 2,
        },
        { id: 27, title: "최적의 예적금 선택법", category: "예적금", time: "2024.11.03", likes: 7, comments: 5 },
        { id: 28, title: "외환 트레이딩 플랫폼 추천", category: "외환", time: "2024.11.02", likes: 15, comments: 9 },
        {
            id: 29,
            title: "정부 정책이 대출 시장에 미친 영향",
            category: "대출",
            time: "2024.11.01",
            likes: 16,
            comments: 10,
        },
        {
            id: 30,
            title: "예적금 상품 선택 시 확인해야 할 점",
            category: "예적금",
            time: "2024.10.31",
            likes: 6,
            comments: 4,
        },
        {
            id: 31,
            title: "달러 강세에 따른 외환 시장 전략",
            category: "외환",
            time: "2024.11.20",
            likes: 13,
            comments: 6,
        },
        {
            id: 32,
            title: "주식 투자로 보는 기술 기업의 미래",
            category: "주식",
            time: "2024.11.20",
            likes: 18,
            comments: 12,
        },
        {
            id: 33,
            title: "환율 하락 시 이득 보는 상품은?",
            category: "외환",
            time: "2024.11.19",
            likes: 9,
            comments: 3,
        },
        {
            id: 34,
            title: "주식시장 불안 속 투자 포트폴리오",
            category: "주식",
            time: "2024.11.18",
            likes: 21,
            comments: 8,
        },
        {
            id: 35,
            title: "외환시장 초보자도 쉽게 따라할 투자법",
            category: "외환",
            time: "2024.11.17",
            likes: 15,
            comments: 7,
        },
    ];

    const [activeTab, setActiveTab] = useState("전체");
    const [selectedCategory, setSelectedCategory] = useState("전체");

    // 숨길 경로 배열
    const hiddenPaths = ["/community/write", "/community/postMento", "/community/post"];

    // 하단 탭 숨김 처리
    useEffect(() => {
        // 페이지 접근 시 하단 탭 숨김
        dispatch(setShowNavigator(false));
        return () => {
            // 페이지 벗어날 때 다시 표시
            dispatch(setShowNavigator(true));
        };
    }, [dispatch]);

    const getPostType = () => (activeTab === "전체" ? "normal" : "expert");

    const filteredPosts =
        selectedCategory === "전체" ? posts : posts.filter(post => post.category === selectedCategory);

    return (
        <Root>
            {!hiddenPaths.some(path => location.pathname.startsWith(path)) && (
                <>
                    <TabContainer>
                        <Tab active={activeTab === "전체"} onClick={() => setActiveTab("전체")}>
                            전체
                        </Tab>
                        <Tab active={activeTab === "고수노하우"} onClick={() => setActiveTab("고수노하우")}>
                            고수노하우
                        </Tab>
                    </TabContainer>

                    {activeTab === "전체" && (
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
                                {filteredPosts.map(post => (
                                    <PostItem
                                        key={post.id}
                                        onClick={() => navigate(`/community/post/${post.id}`)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <PostTitle>{post.title}</PostTitle>
                                        <PostInfo>
                                            {post.time} · 좋아요 {post.likes} · 댓글 {post.comments}
                                        </PostInfo>
                                    </PostItem>
                                ))}
                            </PostListContainer>
                        </>
                    )}

                    {activeTab === "고수노하우" && <CommunityMento />}

                    <FloatingButton
                        icon={pencilIcon}
                        onClick={() => navigate(`/community/write?postType=${getPostType()}`)}
                    />
                </>
            )}

            <Outlet />
        </Root>
    );
}

export default Community;
