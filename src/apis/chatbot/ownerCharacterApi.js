// 챗봇 캐릭터 생성 결과 확인 API(POST)
import api from "../Instance";

export const confirmOwnerCharacter = async () => {
  const { data } = await api.post("/owner/character");
  return data;
};
