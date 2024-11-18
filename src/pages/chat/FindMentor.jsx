import { useState } from "react";
import { Root, Title, CategoryContainer, Category } from "./FindMentor.styles";
import axios from "axios";

const fetchMentor = async category => {
    const response = await axios.get(`http://localhost:8080/api/v1/mentor/recommend?mainCategoryId=${category}`, {
        withCredentials: true,
    });
    return response.data;
};

function FindMentor() {
    const category = ["예금/적금", "대출", "외화", "주식"];
    const [isPendingMentor, setIsPendingMentor] = useState(false);
    const [isFindMentor, setIsFindMentor] = useState(false);
    const [mentor, setMentor] = useState(null);
    const findMentor = category => {
        console.log(category);
        setIsPendingMentor(true);
        fetchMentor(1).then(data => {
            console.log(data);
            setIsFindMentor(true);
            const mentor = data.responseEntity.body.mentorDTOList;
            console.log(mentor);
            setMentor(mentor);
        });
        console.log(mentor);
    };

    return (
        <Root>
            {!isPendingMentor ? (
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
            ) : !isFindMentor ? (
                <Title>
                    선택하신 분야의
                    <br /> 고수를 찾고 있습니다...
                </Title>
            ) : (
                <>
                    <Title>
                        현재 대화 가능한
                        <br /> 고수님을 찾았습니다.
                    </Title>
                    {mentor.map((item, index) => (
                        <div key={index}>{item.nickname}</div>
                    ))}
                </>
            )}
        </Root>
    );
}

export default FindMentor;
