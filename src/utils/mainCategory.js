const categoryMap = {
    1: "예적금",
    2: "대출",
    3: "외환",
    4: "주식",
};

const mainCategory = categoryId => {
    return categoryMap[categoryId] || "알 수 없음";
};

// 사용 예시:
// mainCategory(1) -> "예적금"
// mainCategory(2) -> "대출"
// mainCategory(3) -> "외환"
// mainCategory(4) -> "주식"

export default mainCategory;

// 전체 카테고리 목록이 필요한 경우를 위한 export
export const categories = [
    { id: 1, name: "예적금" },
    { id: 2, name: "대출" },
    { id: 3, name: "외환" },
    { id: 4, name: "주식" },
];
