// src/services/surveyService.js
import axios from "axios";

// 환경변수에서 API URL 불러오기
const BASE = `${import.meta.env.VITE_API_URL}`;
const token = localStorage.getItem("accessToken");

// 설문 질문 불러오기 함수
export async function fetchQuestion(questionId) {
  const response = await axios.get(`${BASE}/survey/question/${questionId}`);
  return response.data;
}

export async function submitAnswer(questionId, optionId) {
  const userAnswerDTO = {
    questionId: questionId,
    optionId: optionId,
  };
  await axios.post(`${BASE}/survey/answer/${questionId}`, userAnswerDTO, {
    headers: {
      Authorization: `Bearer ${token}`, // Add JWT token here
    },
  });
}

//추가 수정 부분!!!
export async function submitSurveyResult() {
  const response = await axios.post(
    `${BASE}/survey-result/investment-type`,
    null, // 요청 바디 필요 시 추가 가능
    {
      headers: {
        Authorization: `Bearer ${token}`, // JWT 토큰 추가
      },
    },
  );
  return response.data;
}

export async function fetchSurveyResult() {
  const response = await axios.get(
    `${BASE}/survey-result/investment-type/details`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data; // 총 점수와 투자 유형 정보 반환
}

// 사용자 닉네임 불러오기 함수 (JWT 토큰 필요)
export const fetchUserNickname = async (token) => {
  try {
    const response = await axios.get(`${BASE}/survey-result/user-nickname`, {
      headers: {
        Authorization: `Bearer ${token}`, // JWT 토큰 추가
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 설문 상태 확인 함수 추가
export const checkSurveyStatus = async () => {
  try {
    const response = await axios.get(`${BASE}/survey/survey-status`, {
      headers: {
        Authorization: `Bearer ${token}`, // JWT 토큰 추가
      },
    });
    return response.data; // 'N' 또는 'Y' 반환
  } catch (error) {
    console.error("Error checking survey status:", error);
    throw error;
  }
};
