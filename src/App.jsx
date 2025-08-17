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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* 루트 라우트 분기처리 */}
          <Route path="/" element={<RouteSwitch role={"user"} />} />
          {/* 공통 페이지 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signup/b2c" element={<B2CSignupPage />} />
          <Route path="/signup/b2b" element={<B2BSignupPage />} />
          <Route path="/signup/complete" element={<SignupComplete />} />
          {/* 사장님 페이지 */}
          <Route path="/home/b2b" element={<B2BHomePage />} />
          <Route path="/home/b2b/pre" element={<B2BHomePrePage />} />
          <Route path="/home/b2b/event" element={<EventUploadPage />} />
          <Route path="/mypage/b2b" element={<B2BMyPage />} />
          <Route path="/mypage/b2b/subscribe" element={<SubscribePage />} />
          <Route path="/mypage/b2b/subscribe/list" element={<SubscribeList />} />
          <Route path="/mypage/b2b/download" element={<DownloadePage />} />
          {/* user 페이지 */}
          <Route path="/home/user" element={<UserHomePage />} />
          <Route path="/scan" element={<QrScanPage />} />
          <Route path="/detail/:id" element={<CharacterDetailPage />} />
          <Route path="/capture" element={<Capture />} />
          <Route path="/capture/share" element={<Share />} />
          <Route path="/mypage/user" element={<UserMyPage />} />
          <Route path="/mypage/user/collection" element={<CollectionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// 루트 라우트 경로 변경
export const RouteSwitch = ({ role = "" }) => {
  if (role === "b2b") return <Navigate to="/home/b2b" replace />;
  if (role === "user") return <Navigate to="/home/user" replace />;

  // role 값이 없으면 로그인으로 이동
  return <Navigate to="/login" replace />;
};
