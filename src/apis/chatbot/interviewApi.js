// 챗봇 AI 인터뷰 API(POST)
import api from "../Instance";

// 첫 질문 생성
export const createInterview = async ({ storeMood, businessType }) => {
  const { data } = await api.post("/interview/create", { storeMood, businessType });
  return data;
};

// 답변 제출 → 다음 질문
export const submitInterview = async ({ answer }) => {
  const { data } = await api.post("/interview", { answer });
  return data;
};
