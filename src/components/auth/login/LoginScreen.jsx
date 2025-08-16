import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginTabs from "./LoginTabs";
import LoginForm from "./LoginForm";
import "./Login.scss";
import logo from "../../../assets/logo-text.svg";
import Modal from "../Modal";
import "../Modal.scss";

const LoginScreen = () => {
  const [role, setRole] = useState("guest"); // 로그인 유형 상태 (손님/스토어 사장님)
  const [modalMsg, setModalMsg] = useState(""); // 모달 메시지 상태

  return (
    <div className="login-wrap">
      <div className="login-card">
        <img src={logo} alt="스토어리" className="login-logo" />

        <LoginTabs role={role} onChange={setRole} />

        <LoginForm role={role} onError={(msg) => setModalMsg(msg)} onSuccess={() => setModalMsg("")} />

        <div className="login-links">
          <Link to="/signup" className="link">
            회원 가입
          </Link>
        </div>
      </div>

      <Modal open={!!modalMsg} onClose={() => setModalMsg("")} autoCloseMs={1600}>
        {modalMsg}
      </Modal>
    </div>
  );
};

export default LoginScreen;
