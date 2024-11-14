import TopRanker from "@/components/rank/TopRanker";
import ProfitRanker from "@/components/rank/ProfitRanker";
import { Root } from "./Rank.styles";

function Rank() {
    return (
        <Root>
            <TopRanker />
            <ProfitRanker />
        </Root>
    );
}

export default Rank;
