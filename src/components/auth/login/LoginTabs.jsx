import React from "react";

const LoginTabs = ({ role, onChange }) => {
  // 로그인 유형 선택 탭 컴포넌트
  const isUser = role === "user";
  const isOwner = role === "owner";

  return (
    <div className="login-tabs" role="tablist" aria-label="로그인 유형 선택">
      <button
        role="tab"
        aria-selected={isUser}
        className={`tab ${isUser ? "active" : ""}`}
        onClick={() => onChange("user")}
        type="button">
        손님
      </button>
      <button
        role="tab"
        aria-selected={isOwner}
        className={`tab ${isOwner ? "active" : ""}`}
        onClick={() => onChange("owner")}
        type="button">
        스토어 사장님
      </button>

      <span className={`tab-underline ${isOwner ? "right" : "left"}`} />
    </div>
  );
};

export default LoginTabs;
