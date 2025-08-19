// 로그인 API (POST) - 사징님/사용자 로그인 API 통합
import api from "../Instance";

const once = async ({ role, loginId, password }) => {
  const path = role === "owner" ? "auth/owner/login" : "auth/user/login";
  try {
    const { data: res } = await api.post(path, { loginId, password });
    const { httpStatus, isSuccess, data } = res || {};
    if (httpStatus === 200 && isSuccess && data?.accessToken) {
      return { ok: true, tokens: { accessToken: data.accessToken, refreshToken: data.refreshToken } };
    }
    return { ok: false, status: httpStatus || 400 };
  } catch (e) {
    return { ok: false, status: e?.response?.status || 500 };
  }
};

const opposite = (role) => (role === "owner" ? "user" : "owner");

const loginApi = async ({ role, loginId, password }) => {
  const first = await once({ role, loginId, password });
  if (first.ok) return { tokens: first.tokens };

  if (first.status === 401) return { error: "invalid" };

  if (first.status === 404) {
    const otherRole = opposite(role);
    const second = await once({ role: otherRole, loginId, password });
    if (second.ok) return { mismatch: otherRole };
    if (second.status === 401) return { error: "invalid" };
    if (second.status === 404) return { error: "notfound" };
    return { error: "server" };
  }

  return { error: "server" };
};

export default loginApi;
