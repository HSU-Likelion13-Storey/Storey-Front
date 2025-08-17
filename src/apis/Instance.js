import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 기본 URL 설정
  headers: {
    "Content-Type": "application/json",
  },
});

// 매 요청마다 최신 토큰을 동적으로 설정하고,
// 로그인/회원가입 등 인증 엔드포인트에는 Authorization 헤더를 제거
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");

  const url = config.url || "";
  const isAuthEndpoint =
    url.includes("/login") || url.includes("/signup") || url.includes("/refresh") || url.includes("/proprietor");

  if (!config.headers) config.headers = {};

  if (accessToken && !isAuthEndpoint) config.headers.Authorization = `Bearer ${accessToken}`;
  else delete config.headers.Authorization;

  return config;
});

// 응답 인터셉터. api 요청 실패 시 토큰 갱신을 위한 용도
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refresh_token");

        // 새 액세스 토큰을 요청하는 로직을 실행
        const res = await api.post(`/api/auth/refresh`, { refreshToken });
        // 응답 헤더에서 새로 발급된 액세스 토큰을 가져옴
        const newAccessToken = res.data.accessToken;
        const newRefreshToken = res.data.refreshToken;

        // 새 액세스 토큰을 세션 스토리지에 저장
        localStorage.setItem("access_token", newAccessToken);
        localStorage.setItem("refresh_token", newRefreshToken);

        // 원본 요청의 헤더를 새 토큰으로 업데이트
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // 수정된 원본 요청으로 API 호출을 재시도
        return axios(originalRequest);
      } catch (refreshError) {
        // 리프레쉬 토큰이 만료될 경우, 로그아웃 처리
        // if (refreshError.response?.data.code === "AUTH004")
        alert("로그인 세션이 만료되었습니다.\n다시 로그인 하시길 바랍니다.");
        return Promise.reject(refreshError);
      }
    }
    // 그 외의 오류 응답을 외부로 전파
    return Promise.reject(error);
  },
);

export default api;
