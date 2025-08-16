import React, { useState } from "react";
import SignupCommonForm from "@/components/auth/signup/common/SignupCommonForm";
import BusinessForm from "@/components/auth/signup/b2b/BusinessForm";
import { useNavigate } from "react-router-dom";

const initBiz = {
  bizName: "",
  owner: "",
  bizNo: "",
  bizType: "",
  bizCategory: "",
  zip: "",
  addr1: "",
  addr2: "",
};

const B2BSignupPage = () => {
  const [step, setStep] = useState(1);
  const [accountData, setAccountData] = useState(null);
  const [biz, setBiz] = useState(initBiz);
  const [submitting, setSubmitting] = useState(false);
  const nav = useNavigate();

  const onBizChange = (e) => {
    const { name, value } = e.target;
    setBiz((v) => ({ ...v, [name]: value }));
  };

  const clearBiz = (name) => setBiz((v) => ({ ...v, [name]: "" }));

  // 1단계: 계정 정보 입력 후 2단계로 이동
  const handleAccountSubmit = async (data) => {
    setAccountData({ username: data.username, password: data.password });
    setStep(2);
  };

  const submitAll = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      // TODO: API 연동
      console.log("B2B 가입", { account: accountData, business: biz });
      nav("/signup/complete");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {step === 1 && <SignupCommonForm onSubmit={handleAccountSubmit} submitting={submitting} submitLabel="다음으로" />}

      {step === 2 && (
        <BusinessForm
          headerOnBack={() => setStep(1)}
          values={biz}
          onChange={onBizChange}
          onSubmit={submitAll}
          submitting={submitting}
          clear={clearBiz}
        />
      )}
    </div>
  );
};

export default B2BSignupPage;
