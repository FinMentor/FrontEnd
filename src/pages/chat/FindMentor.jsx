import { useState } from "react";
import { Root, Title, CategoryContainer, Category } from "./FindMentor.styles";

function FindMentor() {
    const category = ["예금/적금", "대출", "외화", "주식"];
    const [isFindMentor, setIsFindMentor] = useState(false);

    const findMentor = category => {
        console.log(category);
        setIsFindMentor(true);
    };

    return (
        <Root>
            {!isFindMentor ? (
                <>
                    <Title>
                        어떤 분야의
                        <br /> 고수를 찾으시나요?
                    </Title>
                    <CategoryContainer>
                        {category.map((item, index) => (
                            <Category key={index} onClick={() => findMentor(item)}>
                                {item}
                            </Category>
                        ))}
                    </CategoryContainer>
                </>
            ) : (
                <Title>
                    선택하신 분야의
                    <br /> 고수를 찾고 있습니다...
                </Title>
            )}
        </Root>
    );
}

export default FindMentor;
