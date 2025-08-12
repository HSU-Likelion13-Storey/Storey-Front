import React from "react";
import SignupCommonForm from "../components/auth/signup/common/SignupCommonForm";
import { useSignupAccountForm } from "../hooks/useSignupAccountForm";
import { useNavigate } from "react-router-dom";

const B2CSignupPage = () => {
  const form = useSignupAccountForm();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    // TODO: 유효성 + API 연동
    console.log("B2C 가입", form.values);
    nav("/signup/complete");
  };

  return (
    <div>
      <SignupCommonForm
        values={form.values}
        setField={form.setField}
        handleChange={form.handleChange}
        onSubmit={submit}
        submitting={form.submitting}
        submitLabel="가입하기"
      />
    </div>
  );
};

export default B2CSignupPage;
