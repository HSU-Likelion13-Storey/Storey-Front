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

  // 1단계: 계정 정보 입력 후 2단계로 이동
  const handleAccountSubmit = ({ username, password, nickname }) => {
    setAccountData({ username, password, nickname });
    setStep(2);
  };

  // 2단계: 사업자 정보 입력 후 가입 완료 (API 연동 예정)
  const handleBusinessSubmit = async () => {
    try {
      setSubmitting(true);

      const result = await signupApi({
        loginId: accountData.username,
        password: accountData.password,
        nickName: accountData.nickname,
        role: "owner",
      });

      if (!result.ok) {
        console.log("사장님 회원가입 실패:", result.message ?? result.code);
        return;
      }

      console.log("사장님 회원가입 완료. 다음 단계에서 가게 등록 API 연결 예정");
      // TODO: owner/store API 연동
      //  nav("/signup/complete");
    } catch (e) {
      console.log("사장님 회원가입 처리 오류:", e);
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
