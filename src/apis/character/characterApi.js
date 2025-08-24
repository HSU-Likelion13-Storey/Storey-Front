import api from "../Instance";

// 내 캐릭터 조회 API(GET)
export const getMyCharacter = async () => {
  try {
    const res = await api.get("/owner/character");
    if (res.data?.isSuccess) {
      return res.data.data;
    }
    return null;
  } catch (err) {
    console.error("내 캐릭터 조회 실패:", err);
    return null;
  }
};

// 캐릭터 수정 API(PUT)
export const updateCharacter = async (characterId, payload) => {
  try {
    const res = await api.put("/owner/character/update", payload);
    if (res.data?.isSuccess) {
      return res.data.data;
    }
    return null;
  } catch (err) {
    console.error("캐릭터 수정 실패:", err);
    return null;
  }
};
