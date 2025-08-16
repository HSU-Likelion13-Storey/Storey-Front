import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupHeader from "./SignupHeader.jsx";
import BrandHeading from "./BrandHeading.jsx";
import Button from "./Button.jsx";
import "./SignupSelect.scss";
import "./SignupCommonForm.scss";

export default function SignupSelect() {
  const nav = useNavigate();
  const [type, setType] = useState(null);

  const goNext = () => {
    if (type === "b2c") nav("/signup/b2c");
    if (type === "b2b") nav("/signup/b2b");
  };

  return (
    <>
      <SignupHeader rightLabel="회원가입" onBack={() => nav(-1)} />
      <BrandHeading title={"가입 유형을\n선택해주세요"} />

      <div className="signup-select">
        <button
          type="button"
          className={`select-card ${type === "b2c" ? "active" : ""}`}
          onClick={() => setType("b2c")}
          aria-pressed={type === "b2c"}>
          손님
        </button>

        <button
          type="button"
          className={`select-card ${type === "b2b" ? "active" : ""}`}
          onClick={() => setType("b2b")}
          aria-pressed={type === "b2b"}>
          스토어 사장님
        </button>

        <div className="next-btn">
          <Button
            type="button"
            onClick={goNext}
            disabled={!type}
            className={`w-full ${type ? "btn-enabled" : "btn-disabled"}`}>
            다음으로
          </Button>
        </div>
      </div>
    </>
  );
}
