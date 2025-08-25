// 챗봇 캐릭터 생성 결과 확인 API(POST)
import api from "../Instance";

// 캐릭터 생성 결과 확인
export const confirmOwnerCharacter = async ({ answer, category }) => {
  const { data } = await api.post("/owner/character", { answer, category });
  return data;
};

// 캐릭터 재생성 (다시 만들래요 버튼)
export const regenerateOwnerCharacter = async ({ answer, category }) => {
  const { data } = await api.put("/owner/character", { answer, category });
  return data;
};
