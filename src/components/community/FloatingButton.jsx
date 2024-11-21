import PropTypes from "prop-types";
import { FloatingButtonWrapper } from "./FloatingButton.styles";

function FloatingButton({ onClick, icon, style = {} }) {
    return (
        <FloatingButtonWrapper onClick={onClick} style={style}>
            {icon && <img src={icon} alt="플로팅 버튼 아이콘" />}
        </FloatingButtonWrapper>
    );
}

FloatingButton.propTypes = {
    onClick: PropTypes.func.isRequired, // 버튼 클릭 이벤트 함수
    icon: PropTypes.string.isRequired, // 버튼 안에 표시될 아이콘
    style: PropTypes.object, // 커스텀 스타일 (선택)
};

export default FloatingButton;
