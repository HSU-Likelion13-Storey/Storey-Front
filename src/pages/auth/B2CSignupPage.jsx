import React, { useState } from "react";
import SignupCommonForm from "@/components/auth/signup/common/SignupCommonForm";
import { useNavigate } from "react-router-dom";
import signupApi from "@/apis/auth/signupApi";
import loginApi from "@/apis/auth/loginApi";
import { useAuthStore } from "@/store/useAuthStore";

const B2CSignupPage = () => {
  const nav = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [idServerError, setIdServerError] = useState("");
  const { login } = useAuthStore();

  const submit = async ({ username, password, nickname }) => {
    if (submitting) return;
    setSubmitting(true);
    setIdServerError("");

    // (1) 회원가입
    const created = await signupApi({
      loginId: username,
      password,
      nickName: nickname,
      role: "user",
    });

    if (!created) {
      setIdServerError("이미 사용 중인 아이디입니다.");
      setSubmitting(false);
      return;
    }

    // (2) 자동 로그인
    const tokens = await loginApi({ role: "user", loginId: username, password });
    setSubmitting(false);

    if (!tokens?.tokens) {
      console.error("자동 로그인 실패");
      return;
    }

    // (3) 토큰 저장 + 전역 상태 갱신
    localStorage.setItem("access_token", tokens.tokens.accessToken);
    localStorage.setItem("refresh_token", tokens.tokens.refreshToken);
    login({ role: "user" });

    // (4) 완료 페이지로 이동
    nav("/signup/complete", { replace: true });
  };

  return (
    <div>
      <SignupCommonForm
        onSubmit={submit}
        submitting={submitting}
        submitLabel="다음으로"
        idServerError={idServerError}
        onChangeId={() => setIdServerError("")}
      />
    </div>
  );
};

export default B2CSignupPage;
