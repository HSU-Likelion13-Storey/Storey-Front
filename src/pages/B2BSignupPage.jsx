import React, { useState } from "react";
import SignupCommonForm from "@/components/auth/signup/common/SignupCommonForm";
import BusinessForm from "@/components/auth/signup/b2b/BusinessForm";
import { useSignupAccountForm } from "@/hooks/useSignupAccountForm";
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
  const account = useSignupAccountForm();
  const [step, setStep] = useState(1);
  const [biz, setBiz] = useState(initBiz);
  const nav = useNavigate();

  const onBizChange = (e) => {
    const { name, value } = e.target;
    setBiz((v) => ({ ...v, [name]: value }));
  };

  const clearBiz = (name) => setBiz((v) => ({ ...v, [name]: "" }));

  const goNext = (e) => {
    e.preventDefault();
    // TODO: 1단계 유효성 검사 후 진행
    setStep(2);
  };

  const submitAll = async (e) => {
    e.preventDefault();
    // TODO: 2단계 유효성 + API 연동
    console.log("B2B 가입", { account: account.values, business: biz });
    nav("/signup/complete");
  };

  return (
    <div>
      {step === 1 && (
        <SignupCommonForm
          values={account.values}
          setField={account.setField}
          handleChange={account.handleChange}
          requestCode={account.requestCode}
          verifyCode={account.verifyCode}
          onSubmit={goNext}
          submitting={account.submitting}
          submitLabel="다음으로"
        />
      )}

      {step === 2 && (
        <BusinessForm
          headerOnBack={() => setStep(1)}
          values={biz}
          onChange={onBizChange}
          onSubmit={submitAll}
          submitting={account.submitting}
          clear={clearBiz}
        />
      )}
    </div>
  );
};

export default B2BSignupPage;
