import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 기본 URL 설정
  headers: {
    "Content-Type": "application/json",
  },
});

// TODO 추후 헤더에 따라 변경
// 매 요청마다 최신 토큰을 동적으로 설정하고,
// 로그인/회원가입 등 인증 엔드포인트에는 Authorization 헤더를 제거
api.interceptors.request.use((config) => {
  const accessToken = () => {
    try {
      return localStorage.getItem("access_token");
    } catch {
      return null;
    }
  };

  const url = config.url || "";
  const isAuthEndpoint = url.includes("/login") || url.includes("/signup");

  if (!config.headers) config.headers = {};

  if (accessToken && !isAuthEndpoint) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

export default api;
