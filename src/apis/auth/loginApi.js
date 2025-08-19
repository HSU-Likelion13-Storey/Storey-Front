// 로그인 API (POST) - 사징님/사용자 로그인 API 통합
import api from "../Instance";

const loginApi = async ({ role, loginId, password }) => {
  try {
    const path = role === "owner" ? "auth/owner/login" : "auth/user/login";
    const { data: res } = await api.post(path, { loginId, password });
    const { httpStatus, isSuccess, data, message } = res || {};

    if (httpStatus === 200 && isSuccess && data?.accessToken) {
      return { accessToken: data.accessToken, refreshToken: data.refreshToken };
    }
    console.log("로그인 실패:", message);
    return null;
  } catch (e) {
    console.log("로그인 요청 오류:", e);
    return null;
  }
};

export default loginApi;
