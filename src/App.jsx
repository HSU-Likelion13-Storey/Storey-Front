import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import B2CSignupPage from "./pages/B2CSignupPage";
import B2BSignupPage from "./pages/B2BSignupPage";
import { MyPage } from "./pages/mypage/MyPage";
import { SubscribePage } from "./pages/mypage/SubscribePage";
import { DownloadePage } from "./pages/mypage/DownloadPage";
import { CollectionPage } from "./pages/mypage/CollectionPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup/b2c" element={<B2CSignupPage />} />
          <Route path="/signup/b2b" element={<B2BSignupPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/subscribe" element={<SubscribePage />} />
          <Route path="/mypage/download" element={<DownloadePage />} />
          <Route path="/mypage/collection" element={<CollectionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
