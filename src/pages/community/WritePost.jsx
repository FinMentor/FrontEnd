import { useState } from "react";
import Modal from "react-modal";
import { useSearchParams } from "react-router-dom";
import {
    Container,
    Header,
    TitleInput,
    ContentInput,
    Footer,
    CharacterCount,
    SubmitButton,
    BackButton,
    IconAndCount,
    ModalStyle,
    ModalHeader,
    ModalItem,
} from "./WritePost.styles";

import cameraIcon from "@/assets/icons/camera.svg";

Modal.setAppElement("#root"); // React Modal 사용 시 필수 설정

function WritePost() {
    const [showModal, setShowModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("주제 선택");

    const categories = ["예적금", "대출", "외환", "주식"];

    const handleCategorySelect = category => {
        setSelectedCategory(category);
        setShowModal(false);
    };

    const [searchParams] = useSearchParams();
    const postType = searchParams.get("postType") || "normal"; // query parameter에서 postType 추출
    const [title, setTitle] = useState(""); // 빈 문자열로 초기화
    const [content, setContent] = useState(""); // 빈 문자열로 초기화

    const handleTitleChange = e => {
        setTitle(e.target.value ?? ""); // `null` 또는 `undefined` 방지
    };

    const handleContentChange = e => {
        setContent(e.target.value ?? ""); // `null` 또는 `undefined` 방지
    };

    return (
        <Container>
            {/* 헤더 */}
            <Header>
                <BackButton onClick={() => window.history.back()}>✕</BackButton>
                <div onClick={() => setShowModal(true)} style={{ cursor: "pointer" }}>
                    {selectedCategory} ▼
                </div>
                <SubmitButton>등록</SubmitButton>
            </Header>

            {/* 제목 입력 */}
            <TitleInput
                type="text"
                placeholder="제목을 입력해주세요."
                value={title} // 항상 정의된 값 사용
                onChange={handleTitleChange} // 변경 핸들러
            />

            {/* 내용 입력 */}
            <ContentInput
                placeholder={
                    postType === "normal"
                        ? `재테크 정보를 공유하거나 자산 관리에 대한 궁금한 점들을 질문 남겨보세요.\n\n주제와 관련 없는 글이나 커뮤니티 이용 정책에 위배되는 게시물은 신고를 받을 경우 숨김 또는 삭제될 수 있습니다.`
                        : `고수님들께 자산 관리와 관련된 노하우를 게시판에 공유해주세요.\n\n주제와 관련 없는 글이나 커뮤니티 이용 정책에 위배되는 게시물은 신고를 받을 경우 숨김 또는 삭제될 수 있습니다.`
                }
                value={content}
                onChange={handleContentChange}
            />

            {/* 하단 바 */}
            <Footer>
                <IconAndCount>
                    <img
                        src={cameraIcon}
                        alt="카메라"
                        onClick={() => console.log("카메라 아이콘 클릭됨")} // 클릭 이벤트
                    />
                    <CharacterCount>{content.length}/10</CharacterCount>
                </IconAndCount>
            </Footer>

            {/* 모달 */}
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                style={{
                    overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
                    content: {
                        top: "auto",
                        left: "auto",
                        right: "auto",
                        bottom: 0 /* 모달 하단 고정 */,
                        margin: 0,
                        transform: "none" /* 기본 위치 고정 */,
                        padding: 0,
                        border: "none",
                        borderRadius: "16px 16px 0 0" /* 상단 모서리만 둥글게 */,
                    },
                }}
            >
                <ModalStyle>
                    <ModalHeader>주제 선택</ModalHeader>
                    {categories.map(category => (
                        <ModalItem key={category} onClick={() => handleCategorySelect(category)}>
                            {category}
                        </ModalItem>
                    ))}
                </ModalStyle>
            </Modal>
        </Container>
    );
}

export default WritePost;
