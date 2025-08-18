import React, { useState } from "react";
import SignupCommonForm from "@/components/auth/signup/common/SignupCommonForm";
import BusinessForm from "@/components/auth/signup/b2b/BusinessForm";
import { useNavigate } from "react-router-dom";
import signupApi from "@/apis/auth/signupApi";

const B2BSignupPage = () => {
  const [step, setStep] = useState(1);
  const [accountData, setAccountData] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const nav = useNavigate();

  // 1단계: 계정 정보 입력
  const handleAccountSubmit = ({ username, password, nickname }) => {
    setAccountData({ username, password, nickname });
    setStep(2);
  };

  // 2단계: 사업자 정보 입력 후 가입 완료 (API 연동 예정)
  const handleBusinessSubmit = async () => {
    if (submitting || !accountData) return;
    setSubmitting(true);

    const result = await signupApi({
      loginId: accountData.username,
      password: accountData.password,
      nickName: accountData.nickname,
      role: "owner",
    });

    setSubmitting(false);

    if (!result) {
      console.log("사장님 회원가입 실패");
      return;
    }

    console.log("사장님 회원가입 성공:", result);
    // TODO: 사업자 정보 연동 후 완료 페이지 이동
  };

  return (
    <div>
      {step === 1 && <SignupCommonForm onSubmit={handleAccountSubmit} submitting={submitting} submitLabel="다음으로" />}
      {step === 2 && (
        <BusinessForm headerOnBack={() => setStep(1)} onSubmit={handleBusinessSubmit} submitting={submitting} />
      )}
    </div>
  );
};

export default B2BSignupPage;
