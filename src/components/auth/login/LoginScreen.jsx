import React, { useState } from "react";
import LoginTabs from "./LoginTabs";
import LoginForm from "./LoginForm";
import "./Login.scss";
import logo from "../../../assets/logo-text.svg";
import kakaologo from "../../../assets/kakao-logo.svg";

const LoginScreen = () => {
  const [role, setRole] = useState("guest"); // 로그인 유형 상태 (손님/스토어 사장님)

  return (
    <div className="login-wrap">
      <div className="login-card">
        <img src={logo} alt="스토어리" className="login-logo" />

        <LoginTabs role={role} onChange={setRole} />

        <LoginForm role={role} />

        <div className="login-links">
          {/* TODO: 회원가입 페이지 라우팅 연결 */}
          <a href="#" className="link">
            손님 회원 가입
          </a>
          <span className="divider" aria-hidden>
            │
          </span>
          <a href="#" className="link">
            스토어 사장님 가입
          </a>
        </div>

        {/* TODO: 말풍선 위치 디테일 수정 예정 */}
        <div className={`login-helper-chip ${role === "guest" ? "left" : "right"}`}>
          지금 가입하고 빠르게 소식을 접해보세요!
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
