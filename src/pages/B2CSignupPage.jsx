import React from "react";
import SignupCommonForm from "../components/auth/signup/common/SignupCommonForm";
import { useSignupAccountForm } from "../hooks/useSignupAccountForm";

const B2CSignupPage = () => {
  const form = useSignupAccountForm();

  const submit = async (e) => {
    e.preventDefault();
    // TODO: 유효성 + API 연동
    console.log("B2C submit", form.values);
    alert("B2C 가입(더미) 완료");
  };

  return (
    <div>
      <SignupCommonForm
        values={form.values}
        setField={form.setField}
        handleChange={form.handleChange}
        requestCode={form.requestCode}
        verifyCode={form.verifyCode}
        onSubmit={submit}
        submitting={form.submitting}
        submitLabel="가입하기"
      />
    </div>
  );
};

export default B2CSignupPage;
