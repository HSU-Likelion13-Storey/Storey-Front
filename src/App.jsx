import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import B2CSignupPage from "./pages/auth/B2CSignupPage";
import B2BSignupPage from "./pages/auth/B2BSignupPage";
import SignupComplete from "./components/auth/signup/common/SignupComplete.jsx";
import { SubscribePage } from "./pages/b2b/SubscribePage";
import { DownloadePage } from "./pages/b2b/DownloadPage";
import B2BHomePage from "./pages/b2b/B2BHomePage";
import B2BHomePrePage from "./pages/b2b/B2BHomePrePage";
import { B2BMyPage } from "./pages/b2b/B2BMyPage";
import { UserHomePage } from "./pages/user/UserHomePage";
import { QrScanPage } from "./pages/user/QrScanPage";
import { CharacterDetailPage } from "./pages/user/CharacterDetailPage";
import { Capture } from "./components/user/share-char/Capture";
import { Share } from "./components/user/share-char/Share";
import { CollectionPage } from "./pages/user/CollectionPage";
import { EventUploadPage } from "./pages/b2b/EventUploadPage";
import { UserMyPage } from "./pages/user/UserMyPage";
import { SubscribeList } from "./components/b2b/mypage/subscribe/SubscribeList";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect, useState } from "react";
import api from "./apis/Instance";
import { UserProtectedRoute } from "./routes/UserProtectedRoute";
import { B2BProtectedRoute } from "./routes/B2BProtectedRoute";

function App() {
  const [isAuthLoading, setAuthLoading] = useState(true); // 토큰 재발급 중일 경우 로딩 처리
  const { logout, role } = useAuthStore();

  useEffect(() => {
    const rawToken = localStorage.getItem("refresh_token");
    const refreshToken = rawToken && rawToken !== "undefined" && rawToken !== "null" ? rawToken : null;

    if (!refreshToken) {
      logout();
      setAuthLoading(false);
      console.log("리프레쉬 토큰 없음");
      return;
    }

    api
      .post("api/auth/refresh", { refreshToken })
      .then((res) => {
        console.log(res);

        const { accessToken, refreshToken } = res.data.data;
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);

        const currentRole = useAuthStore.getState().role;

        if (currentRole !== role) {
          useAuthStore.getState().login({ role }); // 상태 갱신
        }
      })
      .catch(() => logout())
      .finally(() => setAuthLoading(false));
  }, []);

  if (isAuthLoading) return <></>;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* 루트 라우트 분기처리 */}
          <Route path="/" element={<RouteSwitch role={role} />} />
          {/* 공통 페이지 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signup/user" element={<B2CSignupPage />} />
          <Route path="/signup/owner" element={<B2BSignupPage />} />
          <Route path="/signup/complete" element={<SignupComplete />} />
          {/* 사장님 페이지 */}
          <Route element={<B2BProtectedRoute />}>
            <Route path="/home/owner" element={<B2BHomePage />} />
            <Route path="/home/owner/pre" element={<B2BHomePrePage />} />
            <Route path="/home/owner/event" element={<EventUploadPage />} />
            <Route path="/mypage/owner" element={<B2BMyPage />} />
            <Route path="/mypage/owner/subscribe" element={<SubscribePage />} />
            <Route path="/mypage/owner/subscribe/list" element={<SubscribeList />} />
            <Route path="/mypage/owner/download" element={<DownloadePage />} />
          </Route>
          {/* user 페이지 */}
          <Route element={<UserProtectedRoute />}>
            <Route path="/home/user" element={<UserHomePage />} />
            <Route path="/scan" element={<QrScanPage />} />
            <Route path="/detail/:id" element={<CharacterDetailPage />} />
            <Route path="/capture" element={<Capture />} />
            <Route path="/capture/share" element={<Share />} />
            <Route path="/mypage/user" element={<UserMyPage />} />
            <Route path="/mypage/user/collection" element={<CollectionPage />} />
          </Route>
          {/* 잘못된 경로일 경우 홈으로 이동 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// 루트 라우트 경로 변경
const RouteSwitch = ({ role = "" }) => {
  if (role === "owner") return <Navigate to="/home/owner" replace />;
  if (role === "user") return <Navigate to="/home/user" replace />;

  // role 값이 없으면 로그인으로 이동
  return <Navigate to="/login" replace />;
};
