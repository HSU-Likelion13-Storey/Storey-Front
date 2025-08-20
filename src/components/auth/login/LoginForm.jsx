import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { ID_RE, PW_RE, normalizeId } from "../authRules.js";
import { useAuthStore } from "@/store/useAuthStore.js";
import { useNavigate } from "react-router-dom";
import loginApi from "@/apis/auth/loginApi";

const CREDENTIALS_ERROR = "아이디 또는 비밀번호가 올바르지 않습니다.";
const GUEST_ACCOUNT_ERROR = "손님으로 가입된 계정입니다.";
const OWNER_ACCOUNT_ERROR = "스토어 사장님으로 가입된 계정입니다.";

export default function LoginForm({ role, onError, onSuccess }) {
  const [showPw, setShowPw] = useState(false);
  const { login } = useAuthStore();
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
  const nav = useNavigate();

  const fail = (msg) => {
    onError?.(msg);
    reset({ id: "", password: "" });
    setFocus("id");
  };

  const onValid = async ({ id, password }) => {
    const loginId = normalizeId(id);

    const result = await loginApi({ role, loginId, password });

    // 역할 불일치
    if (result?.mismatch) {
      const msg = result.mismatch === "owner" ? OWNER_ACCOUNT_ERROR : GUEST_ACCOUNT_ERROR;
      return fail(msg);
    }

    // 성공
    if (result?.tokens) {
      localStorage.setItem("access_token", result.tokens.accessToken);
      localStorage.setItem("refresh_token", result.tokens.refreshToken);
      login({ role });
      onSuccess?.();
      return nav(`/home/${role}`);
    }

    // 그 외 실패
    return fail(CREDENTIALS_ERROR);
  };

  const onInvalid = () => fail(CREDENTIALS_ERROR);

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
        로그인
      </button>
    </form>
  );
}
