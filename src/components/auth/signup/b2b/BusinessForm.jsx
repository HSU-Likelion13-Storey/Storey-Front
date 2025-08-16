import React, { useMemo } from "react";
import "../common/SignupCommonForm.scss";
import SignupHeader from "../common/SignupHeader.jsx";
import BrandHeading from "../common/BrandHeading.jsx";
import Button from "../common/Button.jsx";

function Row({ children }) {
  return <div className="row">{children}</div>;
}

// 사업자번호 형식 (하이픈 없어도 허용)
const BIZNO_RE = /^\d{3}-?\d{2}-?\d{5}$/;

export default function BusinessForm({ values, onChange, onSubmit, submitting, headerOnBack, onFindZip }) {
  const isAllFilled = useMemo(() => {
    const req = [
      values.bizName,
      values.owner,
      values.bizNo,
      values.bizType,
      values.bizCategory,
      values.zip,
      values.addr1,
      values.addr2,
    ];
    return req.every((v) => String(v ?? "").trim().length > 0);
  }, [values]);

  // 사업자번호 유효성 검사
  const isBizNoValid = useMemo(() => {
    const v = String(values.bizNo ?? "").trim();
    return v.length === 0 ? false : BIZNO_RE.test(v);
  }, [values.bizNo]);

  // 버튼 활성화 (모든 입력 형식이 맞으면)
  const isValid = isAllFilled && isBizNoValid;

  // 사업자번호 에러 표시
  const showBizNoError = String(values.bizNo ?? "").trim().length > 0 && !isBizNoValid;

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
            className={`input ${showBizNoError ? "has-error" : ""}`}
            name="bizNo"
            value={values.bizNo}
            onChange={onChange}
            inputMode="numeric"
            placeholder="000-00-00000"
            aria-invalid={showBizNoError ? "true" : "false"}
            aria-describedby="bizNo-error"
          />
          {showBizNoError && (
            <p id="bizNo-error" className="field-error">
              *사업자 번호가 일치하지 않습니다.
            </p>
          )}
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
              autoComplete="postal-code"
            />
            <Button type="button" variant="ghost" onClick={onFindZip}>
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

        <Button
          type="submit"
          disabled={!isValid || submitting}
          className={`w-full ${isValid ? "btn-enabled" : "btn-disabled"}`}>
          다음으로
        </Button>
      </form>
    </>
  );
}
