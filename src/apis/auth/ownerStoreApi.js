import api from "../Instance";

const ownerStoreApi = async (payload) => {
  try {
    const { data: res } = await api.post("owner/store", payload);
    const { httpStatus, isSuccess, code, message } = res || {};

    if (httpStatus === 201 && isSuccess) {
      console.log("가게 정보 등록 성공");
      return { ok: true };
    }

    console.log("가게 정보 등록 실패:", code || httpStatus, message);
    return { ok: false, code: code || httpStatus, message };
  } catch (e) {
    const status = e?.response?.status;
    const body = e?.response?.data;
    return {
      ok: false,
      code: body?.httpStatus ?? status ?? 500,
      message: body?.message || "요청 오류",
    };
  }
};

export default ownerStoreApi;
