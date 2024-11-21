const timeMap = {
    everyday: "매일",
    weekend: "주말",
    weekday: "평일",
    morning: "오전",
    lunch: "점심",
    dinner: "저녁",
};

const answerTime = timeString => {
    if (!timeString) return "";

    const [frequency, period] = timeString.toLowerCase().split(" ");

    const koreanFrequency = timeMap[frequency] || "";
    const koreanPeriod = timeMap[period] || "";

    return `${koreanFrequency} ${koreanPeriod}`;
};
export default answerTime;
