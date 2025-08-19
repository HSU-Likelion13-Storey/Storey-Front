import React, { useState } from "react";
import SignupCommonForm from "@/components/auth/signup/common/SignupCommonForm";
import { useNavigate } from "react-router-dom";
import signupApi from "@/apis/auth/signupApi";
import loginApi from "@/apis/auth/loginApi";
import { useAuthStore } from "@/store/useAuthStore";

const B2CSignupPage = () => {
  const nav = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuthStore();

  const submit = async ({ username, password, nickname }) => {
    if (submitting) return;
    setSubmitting(true);

    // 1) 회원가입
    const created = await signupApi({
      loginId: username,
      password,
      nickName: nickname,
      role: "user",
    });

    if (!created) {
      setSubmitting(false);
      console.log("회원가입 실패");
      return;
    }

    // 2) 자동 로그인(토큰 수령)
    const tokens = await loginApi({
      role: "user",
      loginId: username,
      password,
    });

    setSubmitting(false);

    if (!tokens) {
      console.log("자동 로그인 실패");
      return;
    }

    // 토큰 저장 + 전역 상태 갱신
    localStorage.setItem("access_token", tokens.accessToken);
    localStorage.setItem("refresh_token", tokens.refreshToken);
    login({ role: "user" });

    // 3) 완료 페이지로 이동
    nav("/signup/complete", { replace: true });
  };

  return (
    <div>
      <SignupCommonForm onSubmit={submit} submitting={submitting} submitLabel="다음으로" />
    </div>
  );
};

export default B2CSignupPage;
