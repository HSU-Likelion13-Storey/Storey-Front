import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../common/SignupCommonForm.scss";
import SignupHeader from "../common/SignupHeader.jsx";
import BrandHeading from "../common/BrandHeading.jsx";
import Button from "../common/Button.jsx";
import AddressSearchModal from "./AddressSearchModal.jsx";

function Row({ children }) {
  return <div className="row">{children}</div>;
}

// 사업자번호 형식 (하이픈 필수)
const BIZNO_RE = /^\d{3}-\d{2}-\d{5}$/;

export default function BusinessForm({
  defaultValues,
  onSubmit,
  submitting,
  headerOnBack,
  bizNoServerError, // 서버 에러 메시지 추가
}) {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    setValue,
    setFocus,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      bizName: "",
      owner: "",
      bizNo: "",
      bizType: "",
      bizCategory: "",
      zip: "",
      addr1: "",
      addr2: "",
      ...(defaultValues || {}),
    },
  });

  const [addrModalOpen, setAddrModalOpen] = useState(false);

  const onValid = async (data) => {
    await onSubmit?.(data);
  };

  useEffect(() => {
    if (bizNoServerError) {
      setError("bizNo", { type: "server", message: bizNoServerError });
    }
  }, [bizNoServerError, setError]);

  const bizNoValue = watch("bizNo") ?? "";
  const showBizNoError = bizNoValue.trim().length > 0 && !!errors.bizNo;

  const handleAddrSelect = ({ zonecode, address }) => {
    setValue("zip", zonecode, { shouldValidate: true, shouldTouch: true });
    setValue("addr1", address, { shouldValidate: true, shouldTouch: true });
    clearErrors(["zip", "addr1"]);
    setTimeout(() => setFocus("addr2"), 0);
  };

  return (
    <>
      <SignupHeader rightLabel="사업정보 입력" onBack={headerOnBack} />
      <BrandHeading title={"가입하기 위해\n사업정보를 입력해주세요"} />

      <form className="signup-form" onSubmit={handleSubmit(onValid)}>
        {/* 상호 */}
        <div className="form-field">
          <label className="form-label" htmlFor="bizName">
            상호
          </label>
          <input
            id="bizName"
            className="input"
            autoComplete="organization"
            {...register("bizName", { required: true })}
          />
        </div>

        {/* 대표자명 */}
        <div className="form-field">
          <label className="form-label" htmlFor="owner">
            대표자명
          </label>
          <input id="owner" className="input" autoComplete="name" {...register("owner", { required: true })} />
        </div>

        {/* 사업자 번호 */}
        <div className="form-field">
          <label className="form-label" htmlFor="bizNo">
            사업자 번호
          </label>
          <input
            id="bizNo"
            className={`input ${showBizNoError ? "has-error" : ""}`}
            placeholder="000-00-00000"
            inputMode="numeric"
            aria-invalid={showBizNoError ? "true" : "false"}
            aria-describedby="bizNo-error"
            {...register("bizNo", {
              required: true,
              validate: (v) => BIZNO_RE.test((v ?? "").trim()) || "*사업자 번호가 일치하지 않습니다.",
              onChange: () => {
                if (errors.bizNo?.type === "server") clearErrors("bizNo");
              },
            })}
          />
          {showBizNoError && (
            <p id="bizNo-error" className="field-error">
              {errors.bizNo?.message || "*사업자 번호가 일치하지 않습니다."}
            </p>
          )}
        </div>

        {/* 업태 */}
        <div className="form-field">
          <label className="form-label" htmlFor="bizType">
            업태
          </label>
          <input id="bizType" className="input" {...register("bizType", { required: true })} />
        </div>

        {/* 업종 */}
        <div className="form-field">
          <label className="form-label" htmlFor="bizCategory">
            업종
          </label>
          <input id="bizCategory" className="input" {...register("bizCategory", { required: true })} />
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
              placeholder="우편번호"
              inputMode="numeric"
              autoComplete="postal-code"
              readOnly
              {...register("zip", { required: true })}
            />
            <Button type="button" variant="ghost" onClick={() => setAddrModalOpen(true)}>
              우편번호 찾기
            </Button>
          </Row>
        </div>

        {/* 주소 */}
        <div className="form-field">
          <input
            id="addr1"
            className="input"
            placeholder="주소"
            autoComplete="street-address"
            aria-label="주소"
            readOnly
            {...register("addr1", { required: true })}
          />
        </div>

        {/* 상세주소 */}
        <div className="form-field">
          <input
            id="addr2"
            className="input"
            placeholder="상세주소"
            autoComplete="address-line2"
            aria-label="상세주소"
            {...register("addr2", { required: true })}
          />
        </div>

        <Button
          type="submit"
          disabled={!isValid || isSubmitting || submitting}
          className={`w-full ${isValid ? "btn-enabled" : "btn-disabled"}`}>
          다음으로
        </Button>
      </form>

      <AddressSearchModal open={addrModalOpen} onClose={() => setAddrModalOpen(false)} onSelect={handleAddrSelect} />
    </>
  );
}
