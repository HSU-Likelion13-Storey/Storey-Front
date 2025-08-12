import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import B2CSignupPage from "./pages/B2CSignupPage";
import B2BSignupPage from "./pages/B2BSignupPage";
import { MyPage } from "./pages/mypage/MyPage";
import { SubscribePage } from "./pages/mypage/SubscribePage";
import { DownloadePage } from "./pages/mypage/DownloadPage";
import { CollectionPage } from "./pages/mypage/CollectionPage";
import SignupComplete from "./components/auth/signup/common/SignupComplete.jsx";
import { UserHomePage } from "./pages/user/UserHomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup/b2c" element={<B2CSignupPage />} />
          <Route path="/signup/b2b" element={<B2BSignupPage />} />
          <Route path="/signup/complete" element={<SignupComplete />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/subscribe" element={<SubscribePage />} />
          <Route path="/mypage/download" element={<DownloadePage />} />
          <Route path="/mypage/collection" element={<CollectionPage />} />
          {/* user 페이지 */}
          <Route path="/user" element={<UserHomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
