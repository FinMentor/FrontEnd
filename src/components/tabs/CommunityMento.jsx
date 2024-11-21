import {
    Root,
    FilterContainer,
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
import FloatingButton from "@/components/community/FloatingButton"; // 플로팅 버튼 컴포넌트 import
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setShowNavigator } from "@/states/navigatorSlice";
import { useNavigate } from "react-router-dom"; // useNavigate import 추가

// 이미지 import
import img1 from "@/assets/CM_img/img1.jpg";
import img2 from "@/assets/CM_img/img2.jpg";
import img3 from "@/assets/CM_img/img3.jpg";
import img4 from "@/assets/CM_img/img4.jpg";
import img5 from "@/assets/CM_img/img5.jpg";
import img6 from "@/assets/CM_img/img6.jpg";
import img7 from "@/assets/CM_img/img7.jpg";
import img8 from "@/assets/CM_img/img8.jpg";
import img9 from "@/assets/CM_img/img9.jpg";
import img10 from "@/assets/CM_img/img10.jpg";

function CommunityMento() {
    const navigate = useNavigate(); // navigate 초기화
    const dispatch = useDispatch();

    useEffect(() => {
        // 페이지 접근 시 하단 탭 숨김
        dispatch(setShowNavigator(false));
        return () => {
            // 페이지 벗어날 때 다시 표시
            dispatch(setShowNavigator(true));
        };
    }, [dispatch]);

    const posts = [
        {
            id: 1,
            title: "초보 투자자를 위한 주식 입문 가이드",
            author: "글쓴이 누굴까",
            image: img1,
            category: "주식",
            isFollower: true,
        },
        {
            id: 2,
            title: "재테크 고수님이 알려주는 꿀팁",
            author: "고수 고고",
            image: img2,
            category: "예적금",
            isFollower: false,
        },
        {
            id: 3,
            title: "효율적인 가계부 작성법",
            author: "알뜰 주부",
            image: img3,
            category: "예적금",
            isFollower: true,
        },
        {
            id: 4,
            title: "외환 투자 기본 가이드",
            author: "외환 초보",
            image: img4,
            category: "외환",
            isFollower: false,
        },
        {
            id: 5,
            title: "ETF 초보자 가이드",
            author: "ETF초보",
            image: img5,
            category: "주식",
            isFollower: true,
        },
        {
            id: 6,
            title: "적금으로도 부자가 될 수 있을까?",
            author: "저축왕",
            image: img6,
            category: "예적금",
            isFollower: true,
        },
        {
            id: 7,
            title: "외환 차트를 읽는 법",
            author: "차트 분석가",
            image: img7,
            category: "외환",
            isFollower: false,
        },
        {
            id: 8,
            title: "주식시장에서 리스크 관리하기",
            author: "리스크헌터",
            image: img8,
            category: "주식",
            isFollower: true,
        },
        {
            id: 9,
            title: "부동산 투자, 시작하는 법",
            author: "부동산 마스터",
            image: img9,
            category: "대출",
            isFollower: false,
        },
        {
            id: 10,
            title: "금 투자, 안전한 투자법",
            author: "황금손",
            image: img10,
            category: "예적금",
            isFollower: true,
        },
    ];

    const [selectedCategory, setSelectedCategory] = useState("전체");
    const [showOnlyFollowers, setShowOnlyFollowers] = useState(false);

    // 필터링된 게시글 리스트
    const filteredPosts = posts.filter(post => {
        const categoryMatch = selectedCategory === "전체" || post.category === selectedCategory;
        const followerMatch = !showOnlyFollowers || post.isFollower;
        return categoryMatch && followerMatch;
    });

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
                    <PostItem
                        key={post.id}
                        onClick={() => navigate(`/community/postMento/${post.id}`)}
                        style={{ cursor: "pointer" }}
                    >
                        <PostImage src={post.image} alt={post.title} />
                        <PostTitle>{post.title}</PostTitle>
                        <PostInfo>글쓴이 {post.author}</PostInfo>
                    </PostItem>
                ))}
            </PostListContainer>

            {/* 글쓰기 버튼 */}
            <FloatingButton icon={pencilIcon} onClick={() => navigate("/community/write?postType=expert")} />
        </Root>
    );
}

export default CommunityMento;
