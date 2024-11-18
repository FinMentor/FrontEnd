import TopRanker from "@/components/rank/TopRanker";
import ProfitRanker from "@/components/rank/ProfitRanker";
import { Root } from "./Rank.styles";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getRankers = async () => {
    const response = await axios.get("http://localhost:8080/api/v1/ranking");
    return response.data;
};

function Rank() {
    const { data: rankers } = useQuery({
        queryKey: ["rankers"],
        queryFn: () => getRankers(),
    });
    console.log(rankers);
    return (
        <Root>
            <TopRanker />
            <ProfitRanker />
        </Root>
    );
}

export default Rank;
