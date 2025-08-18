// 통합 회원가입 API(POST)
import api from "../Instance";

const signupApi = async ({ loginId, password, nickName, role }) => {
  try {
    const res = await api.post("auth/signup", { loginId, password, nickName, role });
    const { httpStatus, isSuccess, data, message } = res.data || {};

    if ((httpStatus === 201 || httpStatus === 200) && isSuccess) {
      console.log("회원가입 성공");
      return { ok: true, id: data?.id ?? data?.userId ?? null };
    }

    if (httpStatus === 409) {
      console.log("아이디 중복");
      return { ok: false, code: 409, message };
    }

    console.log("회원가입 실패:", message);
    return { ok: false, code: httpStatus, message };
  } catch (e) {
    console.log("회원가입 요청 오류:", e);
    return { ok: false, code: 500, message: "요청 오류" };
  }
};

export default signupApi;
