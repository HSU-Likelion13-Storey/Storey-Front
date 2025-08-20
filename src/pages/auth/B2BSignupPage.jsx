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
  const [idServerError, setIdServerError] = useState("");
  const [bizNoServerError, setBizNoServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const nav = useNavigate();
  const { login } = useAuthStore();

  // 1단계: 회원정보 입력 → 여기서 회원가입 + 자동로그인까지 처리
  const handleAccountSubmit = async ({ username, password, nickname }) => {
    if (submitting) return;
    setSubmitting(true);
    setIdServerError("");

    // (1) 회원가입
    const created = await signupApi({
      loginId: username,
      password,
      nickName: nickname,
      role: "owner",
    });

    if (!created) {
      setSubmitting(false);
      setIdServerError("이미 사용 중인 아이디입니다.");
      return;
    }

    // (2) 자동 로그인 (토큰 발급)
    const tokens = await loginApi({
      role: "owner",
      loginId: username,
      password,
    });

    if (!tokens?.tokens) {
      setSubmitting(false);
      console.error("자동 로그인 실패");
      return;
    }

    // (3) 토큰 저장 & 전역 상태 갱신
    localStorage.setItem("access_token", tokens.tokens.accessToken);
    localStorage.setItem("refresh_token", tokens.tokens.refreshToken);
    login({ role: "owner" });

    // (4) 성공하면 다음 단계로 이동
    setAccountData({ username, password, nickname });
    setStep(2);
    setSubmitting(false);
  };

  // 2단계: 사업자 정보 등록
  const handleBusinessSubmit = async (biz) => {
    if (submitting) return;
    setSubmitting(true);
    setBizNoServerError("");

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
      if (saved?.code === 400 && saved?.message) {
        setBizNoServerError(saved.message);
      }
      return;
    }

    nav("/signup/complete", { replace: true });
  };

  return (
    <div>
      {step === 1 && (
        <SignupCommonForm
          onSubmit={handleAccountSubmit}
          submitting={submitting}
          submitLabel="다음으로"
          idServerError={idServerError}
          onChangeId={() => setIdServerError("")}
        />
      )}
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
