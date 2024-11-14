import { useDispatch } from "react-redux";
import { enterChatRoom } from "@/states/chatSlice";
import { Root, Title, CategoryContainer, Category } from "./FindMentor.styles";

function FindMentor() {
    const dispatch = useDispatch();
    return (
        <Root onClick={() => dispatch(enterChatRoom())}>
            <Title>
                � �о���
                <br /> ����� ã���ó���?
            </Title>
            <CategoryContainer>
                <Category>����/����</Category>
                <Category>����</Category>
                <Category>��ȭ</Category>
                <Category>�ֽ�</Category>
            </CategoryContainer>
        </Root>
    );
}

export default FindMentor;
