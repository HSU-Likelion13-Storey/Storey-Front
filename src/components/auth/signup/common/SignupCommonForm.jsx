import React from "react";
import { useForm } from "react-hook-form";
import "./SignupCommonForm.scss";
import SignupHeader from "./SignupHeader.jsx";
import BrandHeading from "./BrandHeading.jsx";
import Button from "./Button.jsx";

export default function SignupCommonForm({ onSubmit, submitting, submitLabel = "다음으로" }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
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
        {/* 아이디 */}
        <div className="form-field">
          <label className="form-label" htmlFor="username">
            아이디
          </label>
          <input
            id="username"
            className={`input ${errors.username ? "has-error" : ""}`}
            placeholder="영문 8자 이내"
            autoComplete="username"
            {...register("username", {
              required: true,
              pattern: {
                value: /^[a-z0-9]{1,8}$/,
                message: "*영소문자/ 숫자로 8자 이내로 작성해주세요.",
              },
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
            {...register("password", {
              required: true,
              minLength: {
                value: 8,
                message: "*영문, 숫자를 포함한 8~20자리 이내로 입력해주세요.",
              },
              maxLength: {
                value: 20,
                message: "*영문, 숫자를 포함한 8~20자리 이내로 입력해주세요.",
              },
              validate: (v) =>
                /[a-zA-Z]/.test(v) && /\d/.test(v) ? true : "*영문, 숫자를 포함한 8~20자리 이내로 입력해주세요.",
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
