import React from "react";
import "../common/SignupCommonForm.scss";
import SignupHeader from "../common/SignupHeader.jsx";
import BrandHeading from "../common/BrandHeading.jsx";

function Row({ children }) {
  return <div className="row">{children}</div>;
}

function Button({ children, variant = "primary", className = "", ...rest }) {
  const cls = ["btn", variant, className].filter(Boolean).join(" ");
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

export default function BusinessForm({ values, onChange, onSubmit, submitting, clear, headerOnBack }) {
  return (
    <>
      <SignupHeader rightLabel="사업정보 입력" onBack={headerOnBack} />
      <BrandHeading title={"가입하기 위해\n사업정보를 입력해주세요"} />

      <form className="signup-form" onSubmit={(e) => onSubmit?.(e)}>
        {/* 상호 */}
        <div className="form-field">
          <label className="form-label" htmlFor="bizName">
            상호
          </label>
          <input
            id="bizName"
            className="input"
            name="bizName"
            value={values.bizName}
            onChange={onChange}
            autoComplete="organization"
          />
        </div>

        {/* 대표자명 */}
        <div className="form-field">
          <label className="form-label" htmlFor="owner">
            대표자명
          </label>
          <input
            id="owner"
            className="input"
            name="owner"
            value={values.owner}
            onChange={onChange}
            autoComplete="name"
          />
        </div>

        {/* 사업자 번호 */}
        <div className="form-field">
          <label className="form-label" htmlFor="bizNo">
            사업자 번호
          </label>
          <input
            id="bizNo"
            className="input"
            name="bizNo"
            value={values.bizNo}
            onChange={onChange}
            inputMode="numeric"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{5}"
          />
        </div>

        {/* 업태 */}
        <div className="form-field">
          <label className="form-label" htmlFor="bizType">
            업태
          </label>
          <input id="bizType" className="input" name="bizType" value={values.bizType} onChange={onChange} />
        </div>

        {/* 업종 */}
        <div className="form-field">
          <label className="form-label" htmlFor="bizCategory">
            업종
          </label>
          <input id="bizCategory" className="input" name="bizCategory" value={values.bizCategory} onChange={onChange} />
        </div>

        {/* 사업장 주소 - 우편번호 */}
        <div className="form-field">
          <label className="form-label" htmlFor="zip">
            사업장 주소
          </label>
          <Row>
            <input
              id="zip"
              className="input"
              name="zip"
              placeholder="우편번호"
              value={values.zip}
              onChange={onChange}
              inputMode="numeric"
              pattern="[0-9]{5}"
              autoComplete="postal-code"
            />
            <Button type="button" variant="ghost">
              우편번호 찾기
            </Button>
          </Row>
        </div>

        <div className="form-field">
          <input
            id="addr1"
            className="input"
            name="addr1"
            placeholder="주소"
            value={values.addr1}
            onChange={onChange}
            autoComplete="street-address"
            aria-label="주소"
          />
        </div>

        <div className="form-field">
          <input
            id="addr2"
            className="input"
            name="addr2"
            placeholder="상세주소"
            value={values.addr2}
            onChange={onChange}
            autoComplete="address-line2"
            aria-label="상세주소"
          />
        </div>

        <Button type="submit" disabled={submitting} className="w-full">
          가입하기
        </Button>
      </form>
    </>
  );
}
