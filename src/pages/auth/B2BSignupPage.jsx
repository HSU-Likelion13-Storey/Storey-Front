import React, { useState } from "react";
import SignupCommonForm from "@/components/auth/signup/common/SignupCommonForm";
import BusinessForm from "@/components/auth/signup/b2b/BusinessForm";
import { useNavigate } from "react-router-dom";

const B2BSignupPage = () => {
  const [step, setStep] = useState(1);
  const [accountData, setAccountData] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const nav = useNavigate();

  // 1단계: 계정 정보 입력 후 2단계로 이동
  const handleAccountSubmit = async (data) => {
    const { username, password, nickname } = data;
    setAccountData({ username, password, nickname });
    setStep(2);
  };

  // 2단계: 사업자 정보 입력 후 가입 완료
  const handleBusinessSubmit = async (bizData) => {
    try {
      setSubmitting(true);
      // TODO: API 연동
      console.log("B2B 가입", { account: accountData, business: bizData });
      nav("/signup/complete");
    } finally {
      setSubmitting(false);
    }
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
