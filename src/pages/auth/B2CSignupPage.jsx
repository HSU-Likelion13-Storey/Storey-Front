import React, { useState } from "react";
import SignupCommonForm from "@/components/auth/signup/common/SignupCommonForm";
import { useNavigate } from "react-router-dom";
import signupApi from "@/apis/auth/signupApi";

const B2CSignupPage = () => {
  const nav = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const submit = async ({ username, password, nickname }) => {
    try {
      setSubmitting(true);

      const result = await signupApi({
        loginId: username,
        password,
        nickName: nickname,
        role: "user",
      });

      if (!result?.ok) {
        console.log("사용자 회원가입 실패:", result?.message ?? result?.code);
        return;
      }

      console.log("사용자 회원가입 성공");
      nav("/signup/complete", { replace: true });
    } catch (e) {
      console.log("사용자 회원가입 요청 오류:", e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <SignupCommonForm onSubmit={submit} submitting={submitting} submitLabel="다음으로" />
    </div>
  );
};

export default B2CSignupPage;
