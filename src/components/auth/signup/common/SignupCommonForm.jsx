import React from "react";
import { useForm } from "react-hook-form";
import "./SignupCommonForm.scss";
import SignupHeader from "./SignupHeader.jsx";
import BrandHeading from "./BrandHeading.jsx";
import Button from "./Button.jsx";
import { ID_RE, PW_RE, ID_MSG, PW_MSG, normalizeId } from "../../authRules.js";

export default function SignupCommonForm({ onSubmit, submitting, submitLabel = "다음으로" }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      nickname: "",
      username: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onValid = async (data) => {
    await onSubmit?.(data);
  };

  return (
    <>
      <SignupHeader rightLabel="회원정보 입력" />
      <BrandHeading title={"회원님의 정보를\n입력해주세요"} />

      <form className="signup-form" onSubmit={handleSubmit(onValid)}>
        {/* 닉네임 */}
        <div className="form-field">
          <label className="form-label" htmlFor="nickname">
            닉네임
          </label>
          <input
            id="nickname"
            className={`input ${errors.nickname ? "has-error" : ""}`}
            placeholder="10자 이내"
            autoComplete="nickname"
            maxLength={10}
            {...register("nickname", {
              required: true,
              maxLength: { value: 10, message: "*10자 이내로 작성해주세요." },
            })}
          />
          {errors.nickname && <p className="field-error">{errors.nickname.message || "*10자 이내로 작성해주세요."}</p>}
        </div>

        {/* 아이디 */}
        <div className="form-field">
          <label className="form-label" htmlFor="username">
            아이디
          </label>
          <input
            id="username"
            className={`input ${errors.username ? "has-error" : ""}`}
            placeholder="영문 소문자/숫자 8자 이내"
            autoComplete="username"
            maxLength={8}
            {...register("username", {
              required: true,
              setValueAs: normalizeId,
              pattern: { value: ID_RE, message: ID_MSG },
            })}
          />
          {errors.username && <p className="field-error">{errors.username.message}</p>}
        </div>

        {/* 비밀번호 */}
        <div className="form-field">
          <label className="form-label" htmlFor="password">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            className={`input ${errors.password ? "has-error" : ""}`}
            placeholder="영문, 숫자를 포함한 8~20자리 이내"
            autoComplete="new-password"
            maxLength={20}
            {...register("password", {
              required: true,
              pattern: { value: PW_RE, message: PW_MSG },
            })}
          />
          {errors.password && <p className="field-error">{errors.password.message}</p>}
        </div>

        {/* 비밀번호 재입력 */}
        <div className="form-field">
          <input
            id="passwordConfirm"
            type="password"
            className={`input ${errors.passwordConfirm ? "has-error" : ""}`}
            placeholder="비밀번호 재입력"
            autoComplete="new-password"
            maxLength={20}
            {...register("passwordConfirm", {
              required: true,
              validate: (v) => v === watch("password") || "*비밀번호가 일치하지 않습니다.",
            })}
          />
          {errors.passwordConfirm && <p className="field-error">{errors.passwordConfirm.message}</p>}
        </div>

        <Button
          type="submit"
          disabled={!isValid || isSubmitting || submitting}
          className={`w-full ${isValid ? "btn-enabled" : "btn-disabled"}`}>
          {submitLabel}
        </Button>
      </form>
    </>
  );
}
