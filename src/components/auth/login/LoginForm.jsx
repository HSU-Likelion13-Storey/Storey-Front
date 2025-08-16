import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { ID_RE, PW_RE, normalizeId } from "../authRules.js";

const CREDENTIALS_ERROR = "아이디 또는 비밀번호가 올바르지 않습니다.";
const GUEST_ACCOUNT_ERROR = "손님으로 가입된 계정입니다.";
const OWNER_ACCOUNT_ERROR = "스토어 사장님으로 가입된 계정입니다.";

export default function LoginForm({ role, onError, onSuccess }) {
  const [showPw, setShowPw] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { isSubmitting },
  } = useForm({
    mode: "onSubmit",
    defaultValues: { id: "", password: "" },
  });

  const onValid = async ({ id, password }) => {
    const idLower = normalizeId(id);

    // 임시: 역할에 따라 계정 유형 확인
    if (role === "owner" && idLower.startsWith("guest")) {
      onError?.(GUEST_ACCOUNT_ERROR);
      reset({ id: "", password: "" });
      setFocus("id");
      return;
    }
    if (role === "guest" && idLower.startsWith("owner")) {
      onError?.(OWNER_ACCOUNT_ERROR);
      reset({ id: "", password: "" });
      setFocus("id");
      return;
    }

    try {
      // TODO: 로그인 API 연동
      console.log(`로그인 시도 (${role})`, { id: idLower, password });
      onSuccess?.();
    } catch (e) {
      onError?.(CREDENTIALS_ERROR);
      reset({ id: "", password: "" });
      setFocus("id");
    }
  };

  // 유효성 검사 실패 시
  const onInvalid = () => {
    onError?.(CREDENTIALS_ERROR);
    reset({ id: "", password: "" });
    setFocus("id");
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onValid, onInvalid)} noValidate>
      {/* 아이디 */}
      <div className="form-row">
        <input
          className="input"
          placeholder="아이디 입력"
          autoComplete="username"
          inputMode="text"
          spellCheck={false}
          maxLength={8}
          {...register("id", {
            required: true,
            setValueAs: normalizeId,
            pattern: { value: ID_RE },
          })}
        />
      </div>

      {/* 비밀번호 */}
      <div className="form-row password-row">
        <input
          className="input"
          type={showPw ? "text" : "password"}
          placeholder="비밀번호 입력 (영문, 숫자 포함 8~20자 이내)"
          autoComplete="current-password"
          maxLength={20}
          {...register("password", {
            required: true,
            pattern: { value: PW_RE },
          })}
        />
        <button
          type="button"
          className={`pw-toggle ${showPw ? "active" : ""}`}
          aria-label="비밀번호 표시/숨기기"
          onClick={() => setShowPw((s) => !s)}>
          <HiMiniEyeSlash size={20} />
        </button>
      </div>

      <button type="submit" className="btn-primary" disabled={isSubmitting}>
        {isSubmitting ? "처리 중..." : "로그인"}
      </button>
    </form>
  );
}
