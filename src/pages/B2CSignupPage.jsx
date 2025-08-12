import React, { useState } from "react";
import SignupCommonForm from "@/components/auth/signup/common/SignupCommonForm";
import { useNavigate } from "react-router-dom";

const B2CSignupPage = () => {
  const nav = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const submit = async (data) => {
    try {
      setSubmitting(true);
      // TODO: API 연동
      console.log("B2C 가입", data);
      nav("/signup/complete");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <SignupCommonForm onSubmit={submit} submitting={submitting} submitLabel="가입하기" />
    </div>
  );
};

export default B2CSignupPage;
