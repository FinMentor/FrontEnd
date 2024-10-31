export const getNotifications = () => {
  return [
    {
      id: 1,
      type: "price",
      name: "삼성전자",
      message: "관심 등록한 삼성전자가 10% 상승했습니다.",
      createdAt: new Date(Date.now() - 86400000), // 1일 전
    },
    {
      id: 2,
      type: "recommendation",
      name: "애플",
      message: "애플 주식이 추천 목록에 추가되었습니다.",
      createdAt: new Date(Date.now() - 3600000), // 1시간 전
    },
    {
      id: 3,
      type: "report",
      name: "일일리포트",
      message: "일일 리포트가 도착했습니다.",
      createdAt: new Date(Date.now() - 7200000), // 2시간 전
    },
  ];
};
