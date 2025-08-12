import React from "react";
import { useNavigate } from "react-router-dom";
import "./SignupHeader.scss";

export default function SignupHeader({ rightLabel, onBack }) {
  const nav = useNavigate();

  const handleBack = () => {
    // 뒤로가기 버튼 클릭 시
    if (typeof onBack === "function") return onBack();
    if (window.history.length > 1) return nav(-1);
    return nav("/login");
  };

  return (
    <header className="signup-header">
      <button type="button" className="back-btn" aria-label="뒤로" onClick={handleBack}>
        <span className="chev" />
      </button>
      {rightLabel && <span className="right-label">{rightLabel}</span>}
    </header>
  );
}
