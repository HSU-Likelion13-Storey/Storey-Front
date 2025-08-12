import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import B2CSignupPage from "./pages/B2CSignupPage";
import B2BSignupPage from "./pages/B2BSignupPage";
import SignupComplete from "./components/auth/signup/common/SignupComplete.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup/b2c" element={<B2CSignupPage />} />
          <Route path="/signup/b2b" element={<B2BSignupPage />} />
          <Route path="/signup/complete" element={<SignupComplete />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
