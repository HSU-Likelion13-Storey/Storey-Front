import React from "react";
import "./SignupCommonForm.scss";
import SignupHeader from "./SignupHeader.jsx";
import BrandHeading from "./BrandHeading.jsx";

function Button({ children, variant = "primary", className = "", ...rest }) {
  const cls = ["btn", variant, className].filter(Boolean).join(" ");
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

export default function SignupCommonForm({
  values,
  setField,
  handleChange,
  requestCode,
  verifyCode,
  onSubmit,
  submitting,
  submitLabel = "다음으로",
}) {
  return (
    <>
      <SignupHeader rightLabel="회원정보 입력" />
      <BrandHeading title={"회원님의 정보를\n입력해주세요"} />

      <form className="signup-form" onSubmit={(e) => onSubmit?.(e)}>
        {/* 아이디 */}
        <div className="form-field">
          <label className="form-label" htmlFor="username">
            아이디
          </label>
          <input
            id="username"
            className="input"
            name="username"
            placeholder="영문 8자 이내"
            value={values.username}
            onChange={handleChange}
            autoComplete="username"
          />
        </div>

        {/* 비밀번호 */}
        <div className="form-field">
          <label className="form-label" htmlFor="password">
            비밀번호
          </label>
          <input
            id="password"
            className="input"
            type="password"
            name="password"
            placeholder="영문, 숫자를 포함한 8~20자리 이내"
            value={values.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </div>

        {/* 비밀번호 재입력 */}
        <div className="form-field">
          <input
            id="passwordConfirm"
            className="input"
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호 재입력"
            value={values.passwordConfirm}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </div>

        {/* 휴대전화 인증 */}
        <div className="form-field">
          <label className="form-label" htmlFor="phone">
            휴대전화 인증
          </label>
          <div className="row">
            <input
              id="phone"
              className="input"
              name="phone"
              placeholder="전화번호 입력"
              value={values.phone}
              onChange={handleChange}
              inputMode="tel"
              autoComplete="tel"
            />
            <Button type="button" variant="ghost" onClick={requestCode}>
              인증요청
            </Button>
          </div>
        </div>

        {/* 인증 코드 */}
        <div className="row">
          <input
            id="code"
            className="input"
            name="code"
            placeholder="인증 코드 입력"
            value={values.code}
            onChange={handleChange}
            inputMode="numeric"
            autoComplete="one-time-code"
          />
          <Button type="button" variant="ghost" onClick={verifyCode}>
            확인
          </Button>
        </div>

        <Button type="submit" disabled={submitting} className="w-full">
          {submitLabel}
        </Button>
      </form>
    </>
  );
}
