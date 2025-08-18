// 통합 회원가입 API(POST)
import api from "../Instance";

const signupApi = async ({ loginId, password, nickName, role }) => {
  try {
    const res = await api.post("auth/signup", { loginId, password, nickName, role });
    const { httpStatus, isSuccess, data, message } = res.data || {};

    if ((httpStatus === 201 || httpStatus === 200) && isSuccess) {
      console.log("회원가입 성공");
      return data?.id ?? data?.userId ?? true;
    }

    if (httpStatus === 409) {
      console.log("아이디 중복");
      return null;
    }

    console.log("회원가입 실패:", message);
    return null;
  } catch (e) {
    console.log("회원가입 요청 오류:", e);
    return null;
  }
};

export default signupApi;
