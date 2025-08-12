import React, { useState } from "react";
import { HiMiniEyeSlash } from "react-icons/hi2";

const LoginForm = ({ role, onError, onSuccess }) => {
  const [showPw, setShowPw] = useState(false); // 비밀번호 표시 여부
  const [values, setValues] = useState({ id: "", password: "" }); // 로그인 폼 입력 값
  const [pending, setPending] = useState(false);

  const handleChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  // 간단 프론트 유효성
  const validate = () => {
    const id = values.id.trim();
    const pw = values.password;
    if (!id || !pw) return "아이디와 비밀번호를 입력해 주세요.";
    if (id.length < 4) return "아이디는 4자 이상 입력해 주세요.";
    if (pw.length < 8) return "비밀번호는 8자 이상 입력해 주세요.";
    return null;
  };

  const submit = async (e) => {
    e.preventDefault();

    const err = validate();
    if (err) {
      onError?.(err);
      return;
    }

    // TODO: 실제 API 연동
    try {
      setPending(true);
      console.log(`로그인 시도 (${role})`, values);

      onSuccess?.();
    } catch (apiErr) {
      onError?.("아이디 또는 비밀번호가 올바르지 않습니다.");
    } finally {
      setPending(false);
    }
  };

  return (
    <form className="login-form" onSubmit={submit} noValidate>
      <div className="form-row">
        <input
          className="input"
          name="id"
          placeholder="아이디 입력"
          value={values.id}
          onChange={handleChange}
          autoComplete="username"
          inputMode="text"
          spellCheck={false}
        />
      </div>

      <div className="form-row password-row">
        <input
          className="input"
          name="password"
          type={showPw ? "text" : "password"}
          placeholder="비밀번호 입력 (영문, 숫자 포함 8~20자 이내)"
          value={values.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        <button
          type="button"
          className={`pw-toggle ${showPw ? "active" : ""}`}
          aria-label="비밀번호 표시/숨기기"
          onClick={() => setShowPw((s) => !s)}>
          <HiMiniEyeSlash size={20} />
        </button>
      </div>

      <button type="submit" className="btn-primary" disabled={pending}>
        {pending ? "처리 중..." : "로그인"}
      </button>
    </form>
  );
};

export default LoginForm;
