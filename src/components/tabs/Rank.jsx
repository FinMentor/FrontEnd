import TopRanker from "@/components/rank/TopRanker";
import ProfitRanker from "@/components/rank/ProfitRanker";
import { Root } from "./Rank.styles";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const getRankers = async condition => {
    const params = {};
    if (condition !== undefined) {
        params.term = condition;
    }
    const response = await axios.get("http://localhost:8080/api/v1/ranking", {
        withCredentials: true,
        params: params,
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
    const [activeTab, setActiveTab] = useState(0);

    const { data: rankers } = useQuery({
        queryKey: ["rankers"],
        queryFn: () => getRankers(),
        select: data => data.mentorOfThreeDTOList,
    });

    const { data: category } = useQuery({
        queryKey: ["category"],
        queryFn: getCategory,
        select: data => [{ mainCategoryId: 0, mainCategoryName: "전체" }, ...data.mainCategoryDTOList],
    });

    const { data: weeklyRankers } = useQuery({
        queryKey: ["weeklyRankers", activeTab],
        queryFn: () => (activeTab === 0 ? getRankers("weekly") : getWeeklyRankers(activeTab, "weekly")),
        select: data => data.mentorOfThreeDTOList || [],
        enabled: !!category,
    });

    const { data: monthlyRankers } = useQuery({
        queryKey: ["monthlyRankers", activeTab],
        queryFn: () => (activeTab === 0 ? getRankers("monthly") : getMonthlyRankers(activeTab, "monthly")),
        select: data => data.mentorOfThreeDTOList || [],
        enabled: !!category,
    });

    return (
        <Root>
            <TopRanker rankers={rankers} />
            <ProfitRanker
                category={category}
                weeklyRankers={weeklyRankers}
                monthlyRankers={monthlyRankers}
                setActiveTab={setActiveTab}
                activeTab={activeTab}
            />
        </Root>
    );
}

export default Rank;
