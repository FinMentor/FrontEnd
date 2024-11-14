import { useDispatch } from "react-redux";
import { enterChatRoom } from "@/states/chatSlice";
import { Root, Title, CategoryContainer, Category } from "./FindMentor.styles";

function FindMentor() {
    const dispatch = useDispatch();
    return (
        <Root onClick={() => dispatch(enterChatRoom())}>
            <Title>
                어떤 분야의
                <br /> 고수를 찾으시나요?
            </Title>
            <CategoryContainer>
                <Category>예금/적금</Category>
                <Category>대출</Category>
                <Category>외화</Category>
                <Category>주식</Category>
            </CategoryContainer>
        </Root>
    );
}

export default FindMentor;
