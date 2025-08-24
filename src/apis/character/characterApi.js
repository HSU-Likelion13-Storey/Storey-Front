import api from "../Instance";

// 캐릭터 조회 API(GET)
export const getCharacter = async (characterId) => {
  try {
    const res = await api.get(`/characters/${characterId}`);
    if (res.data?.isSuccess) {
      return res.data.data;
    }
    return null;
  } catch (err) {
    console.error("캐릭터 조회 실패:", err);
    return null;
  }
};

// 캐릭터 수정 API(PUT)
export const updateCharacter = async (characterId, payload) => {
  try {
    const res = await api.put(`/owner/characters/${characterId}`, payload);
    if (res.data?.isSuccess) {
      return res.data.data;
    }
    return null;
  } catch (err) {
    console.error("캐릭터 수정 실패:", err);
    return null;
  }
};
