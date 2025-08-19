import React, { useState } from "react";
import SignupCommonForm from "@/components/auth/signup/common/SignupCommonForm";
import BusinessForm from "@/components/auth/signup/b2b/BusinessForm";
import { useNavigate } from "react-router-dom";
import signupApi from "@/apis/auth/signupApi";
import ownerStoreApi from "@/apis/auth/ownerStoreApi";
import loginApi from "@/apis/auth/loginApi";
import { useAuthStore } from "@/store/useAuthStore";

const B2BSignupPage = () => {
  const [step, setStep] = useState(1);
  const [accountData, setAccountData] = useState(null);
  const [bizNoServerError, setBizNoServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const nav = useNavigate();
  const { login } = useAuthStore();

  // 1단계: 계정 정보 입력
  const handleAccountSubmit = ({ username, password, nickname }) => {
    setAccountData({ username, password, nickname });
    setBizNoServerError("");
    setStep(2);
  };

  // 2단계: 사업자 정보 입력 후 가입 완료
  const handleBusinessSubmit = async (biz) => {
    if (submitting || !accountData) return;
    setSubmitting(true);
    setBizNoServerError("");

    // (1) 회원가입
    const created = await signupApi({
      loginId: accountData.username,
      password: accountData.password,
      nickName: accountData.nickname,
      role: "owner",
    });
    if (!created) {
      setSubmitting(false);
      return;
    }

    // (2) 자동 로그인 → 토큰 저장
    const tokens = await loginApi({
      role: "owner",
      loginId: accountData.username,
      password: accountData.password,
    });
    if (!tokens) {
      setSubmitting(false);
      return;
    }
    localStorage.setItem("access_token", tokens.accessToken);
    localStorage.setItem("refresh_token", tokens.refreshToken);
    login({ role: "owner" }); // 전역 상태 갱신(선택)

    // (3) 가게 등록 (Authorization 자동 첨부)
    const saved = await ownerStoreApi({
      storeName: biz.bizName,
      representativeName: biz.owner,
      businessNumber: (biz.bizNo || "").replace(/\D/g, ""), // 하이픈 제거
      businessType: biz.bizType,
      businessCategory: biz.bizCategory,
      addressMain: biz.addr1,
      addressDetail: biz.addr2,
      postalCode: biz.zip,
    });

    setSubmitting(false);

    if (!saved?.ok) {
      if (saved?.code === 400 && saved?.message) setBizNoServerError(saved.message);
      return;
    }

    nav("/signup/complete", { replace: true });
  };

  return (
    <div>
      {step === 1 && <SignupCommonForm onSubmit={handleAccountSubmit} submitting={submitting} submitLabel="다음으로" />}
      {step === 2 && (
        <BusinessForm
          headerOnBack={() => setStep(1)}
          onSubmit={handleBusinessSubmit}
          submitting={submitting}
          bizNoServerError={bizNoServerError}
        />
      )}
    </div>
  );
};

export default B2BSignupPage;
