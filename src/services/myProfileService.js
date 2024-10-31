// 사용자 프로필 데이터 가져오기 (목 데이터 사용)
export async function getUserProfile(userId) {
  // 목 데이터를 비동기 요청처럼 처리합니다.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        userId: userId,
        nickname: "bbeak",
        investmentTypeName: "안정형",
        totalAssets: 10000000,
        profileImageUrl:
          "https://i.pinimg.com/564x/09/66/ec/0966ecace4358b0bfc6108df1d2289af.jpg",
      });
    }, 500); // 0.5초 지연을 시뮬레이션하기 위해 setTimeout 사용
  });
}
