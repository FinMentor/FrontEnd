import TopRanker from "@/components/rank/TopRanker";
import ProfitRanker from "@/components/rank/ProfitRanker";
import { Root } from "./Rank.styles";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getRankers = async () => {
    const response = await axios.get("http://localhost:8080/api/v1/ranking", {
        withCredentials: true,
    });
    return response.data.responseEntity.body;
};

const getWeeklyRankers = async (category, term) => {
    const response = await axios.get("http://localhost:8080/api/v1/ranking/category", {
        withCredentials: true,
        params: {
            mainCategoryId: category,
            term: term,
        },
    });
    return response.data.responseEntity.body;
};

const getMonthlyRankers = async (category, term) => {
    const response = await axios.get("http://localhost:8080/api/v1/ranking/category", {
        withCredentials: true,
        params: {
            mainCategoryId: category,
            term: term,
        },
    });
    return response.data.responseEntity.body;
};

const getCategory = async () => {
    const response = await axios.get("http://localhost:8080/api/v1/category/all", {
        withCredentials: true,
    });
    return response.data.responseEntity.body;
};

function Rank() {
    const { data: rankers } = useQuery({
        queryKey: ["rankers"],
        queryFn: () => getRankers(),
        select: data => data.mentorOfThreeDTOList,
    });
    const { data: category } = useQuery({
        queryKey: ["category"],
        queryFn: getCategory,
        select: data => data.mainCategoryDTOList,
    });

    const { data: weeklyRankers } = useQuery({
        queryKey: ["weeklyRankers"],
        queryFn: () => getWeeklyRankers(1, "weekly"),
        select: data => data.mentorOfThreeDTOList,
    });

    const { data: monthlyRankers } = useQuery({
        queryKey: ["monthlyRankers"],
        queryFn: () => getMonthlyRankers(1, "monthly"),
        select: data => data.mentorOfThreeDTOList,
    });

    return (
        <Root>
            <TopRanker rankers={rankers} />
            <ProfitRanker category={category} weeklyRankers={weeklyRankers} monthlyRankers={monthlyRankers} />
        </Root>
    );
}

export default Rank;
